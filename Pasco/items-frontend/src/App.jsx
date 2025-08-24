import { useEffect, useState } from 'react';

const API = 'http://127.0.0.1:8000';

export default function App() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', description: '' });
    const [q, setQ] = useState('');

    async function load() {
        const r = await fetch(`${API}/api/items/`, { credentials: 'include' });
        const data = await r.json();
        setItems(data.items || []);
    }

    async function addItem(e) {
        e.preventDefault();
        const r = await fetch(`${API}/api/items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
        });
        if (r.ok) {
        setForm({ name: '', description: '' });
        load();
        } else {
        alert('Error al crear');
        }
    }

    async function del(id) {
        const r = await fetch(`${API}/api/items/${id}/`, {
        method: 'DELETE',
        credentials: 'include',
        });
        if (r.ok) load();
    }

    useEffect(() => { load(); }, []);

    const filtered = items.filter(it => it.name.toLowerCase().includes(q.toLowerCase()));

    return (
        <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'system-ui, Arial' }}>
        <h2>Items <small>({filtered.length})</small></h2>
        <input placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)} />
        <form onSubmit={addItem} style={{ display: 'grid', gap: 8, margin: '12px 0' }}>
            <input placeholder="Nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <textarea placeholder="Descripción" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <button>Agregar</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
            {filtered.map(it => (
            <li key={it.id} style={{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid #eee', padding:'8px 0' }}>
                <span>{it.name} — {new Date(it.created_at).toLocaleString()}</span>
                <button onClick={() => del(it.id)}>Eliminar</button>
            </li>
            ))}
        </ul>
        </div>
    );
}
