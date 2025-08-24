// ===== CSRF =====
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const csrftoken = getCookie('csrftoken');

// ===== Helpers =====
const clientList = document.getElementById('client-list');
const serverList = document.getElementById('server-list');
const count = document.getElementById('count');

function renderItems(items) {
    clientList.innerHTML = '';
    items.forEach(it => {
        const li = document.createElement('li');
        li.dataset.name = (it.name || '').toLowerCase();
        li.innerHTML = `
        <span>${it.name} — ${new Date(it.created_at).toLocaleString()}</span>
        <button class="btn delete-btn" data-id="${it.id}">Eliminar</button>
        `;
        clientList.appendChild(li);
    });
    count.textContent = items.length;
}

async function fetchItems() {
    const r = await fetch('/api/items/');
    const data = await r.json();
    clientList.style.display = 'block';
    serverList.style.display = 'none';
    renderItems(data.items || []);
}

async function createItem(payload) {
    const r = await fetch('/api/items/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrftoken},
        body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error('No se pudo crear el item');
    await fetchItems();
}

async function deleteItem(id) {
    const r = await fetch(`/api/items/${id}/`, {
        method: 'DELETE',
        headers: {'X-CSRFToken': csrftoken}
    });
    if (!r.ok) throw new Error('No se pudo eliminar');
    await fetchItems();
}

// ===== Events =====
document.getElementById('refresh')?.addEventListener('click', fetchItems);

document.getElementById('add-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
        name: form.name.value.trim(),
        description: form.description.value.trim()
    };
    if (!payload.name) return;
    try {
        await createItem(payload);
        form.reset();
    } catch (err) {
        alert(err.message);
    }
});

// Búsqueda (aplica a la lista visible)
document.getElementById('search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const list = clientList.style.display !== 'none' ? clientList : serverList;
    [...list.querySelectorAll('li')].forEach(li => {
        const name = li.dataset.name || '';
        li.style.display = name.includes(q) ? '' : 'none';
    });
});

// Delegación para eliminar
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    if (confirm('¿Eliminar este item?')) {
        deleteItem(id).catch(err => alert(err.message));
    }
});
