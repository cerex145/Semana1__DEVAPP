🚀 # Mi proyecto Django

Una aplicación web moderna de Django con una estructura limpia y organizada.

## 📋 Resumen

Este proyecto sigue una estructura personalizada:
- 'src/': Directorio de código principal
  - 'config/': Configuración del proyecto
  - 'core/': Aplicación principal
- 'venv/': Entorno virtual (no rastreado en git)

   ## ✨ Características 

- 📱 Estructura limpia y organizada de Django 5
- 🛠️ Separación de la configuración y el código de la aplicación
- 📦 Listo para usar con frameworks frontend
- 🔒 Interfaz de administración para la gestión de contenidos

## 🔧 Installation

1. Clone this repository
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   cd src
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python3 manage.py migrate
   ```
5. Create a superuser:
   ```bash
   python3 manage.py createsuperuser
   ```

## 🚀 Running the Project

```bash
cd src
python3 manage.py runserver
```

Access the site at http://127.0.0.1:8000/ and admin at http://127.0.0.1:8000/admin/

## 🛠️ Development

- Add models to `core/models.py`
- Create views in `core/views.py`
- Add URL patterns in `core/urls.py`
- Create templates in `core/templates/`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Gianmarco P

Built with ❤️ using Django 5
