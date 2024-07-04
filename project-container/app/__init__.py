# app\__init__.py
import locale
from flask import Flask

from .views.form_ponto_funcao_view import FormPontoFuncaoView
from .views.template_data_view import mod as template_data_module
from .views.home_view import bp as home_bp


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
    setup_locale()
    # Registrando o blueprint do template_data_view
    app.register_blueprint(template_data_module, url_prefix='/api')
    # Registrando o blueprint da home_view
    app.register_blueprint(home_bp)
    # Registrar view de FormPontoFuncao
    app.add_url_rule('/form-ponto-funcao', view_func=FormPontoFuncaoView.as_view('formpontofuncao'))

    return app
