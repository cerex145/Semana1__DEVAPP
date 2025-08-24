# 🚀 My Django Project

A modern Django web application with a clean, organized structure.

## 📋 Overview

This project follows a custom structure:
- `src/`: Main code directory
  - `config/`: Project configuration
  - `core/`: Main application
- `venv/`: Virtual environment (not tracked in git)

## ✨ Features

- 📱 Clean and organized Django 5 structure
- 🛠️ Separation of settings and application code
- 📦 Ready to use with frontend frameworks
- 🔒 Admin interface for content management

## 🔧 Installation

1. Clone this repository
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate

Install dependencies:
cd src
pip install -r requirements.txt


Apply migrations:
python3 manage.py migrate


Create a superuser:
python3 manage.py createsuperuser
