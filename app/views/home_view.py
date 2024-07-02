# app/views/home_view.py
import locale
from datetime import datetime
from flask import Blueprint, render_template, request, jsonify
from app.utils.get_url import get_url_components  # Ajuste o caminho conforme a estrutura de diretórios


from app.models import (
    TemplateManutencaoSistemaModel,
    TemplateMigracaoDadosModel,
    TemplateSistemaPadraoModel,
    TemplateSiteHeadlessCRMModel
)

# Criando o blueprint para home_view
bp = Blueprint('home', __name__)


model_mapping = {
    'manutencao_sistema': TemplateManutencaoSistemaModel,
    'migracao_dados': TemplateMigracaoDadosModel,
    'sistema_padrao': TemplateSistemaPadraoModel,
    'site_headless_crm': TemplateSiteHeadlessCRMModel
}



class HomeView:
    @staticmethod
    @bp.route('/')
    def home():
        # Obter a data e hora atual
        now = datetime.now()
        formatted_date = now.strftime("%d de %B de %Y, %H:%M")  # Formato "02 de Junho de 2024, 18:16"

        # Configuração de locale para formatação de data em português
        try:
            locale.setlocale(locale.LC_TIME, 'pt_BR.UTF-8')
        except locale.Error:
            try:
                locale.setlocale(locale.LC_TIME, 'pt_BR')
            except locale.Error:
                print("Locale para data em português não suportado.")

        # Obtém outros dados necessários para o template
        url_info = get_url_components()
        base_api_url = f"{url_info['base_url']}api/template/"
        template_urls = {name: f"{base_api_url}{name}" for name in model_mapping.keys()}
        

        return render_template('index.html', template_urls=template_urls, formatted_date=formatted_date)

    @staticmethod
    @bp.route('/data', methods=['POST'])
    def get_data():
        data = request.get_json()
        return jsonify(data)
