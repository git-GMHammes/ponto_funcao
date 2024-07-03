# app\__init__.py
import locale
from flask import Flask
from .views.template_data_view import mod as template_data_module
from .views.home_view import bp as home_bp  # Importando o blueprint da home_view


# Configurando locale para Português Brasil
def setup_locale():
    try:
        locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
    except locale.Error:
        try:
            locale.setlocale(locale.LC_ALL, 'pt_BR')
        except locale.Error:
            print("Locale não suportado, continuando sem configuração local.")


def create_app():
    app = Flask(__name__)
    setup_locale()  # Configura o locale dentro de uma função segura
    
    app.register_blueprint(template_data_module, url_prefix='/api')
    app.register_blueprint(home_bp)  # Registrando o blueprint da HomeView

    return app
