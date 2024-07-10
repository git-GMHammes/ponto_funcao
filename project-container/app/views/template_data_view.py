# app/views/template_data_view.py

from flask import Blueprint, jsonify, current_app
from flask import request
from app.models import (
    TemplateManutencaoSistemaModel,
    TemplateMigracaoDadosModel,
    TemplateSistemaPadraoModel,
    TemplateSiteHeadlessCRMModel
)

mod = Blueprint('template_data', __name__)

# Definindo o dicionário de mapeamento de modelos
model_mapping = {
    'manutencao_sistema': TemplateManutencaoSistemaModel,
    'migracao_dados': TemplateMigracaoDadosModel,
    'sistema_padrao': TemplateSistemaPadraoModel,
    'site_headless_crm': TemplateSiteHeadlessCRMModel
}

# Função para configurar os cabeçalhos CORS
@mod.after_request
def after_request(response):
    # Permitir qualquer origem
    response.headers['Access-Control-Allow-Origin'] = '*'
    # Permitir os métodos necessários
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    # Configurar os cabeçalhos permitidos
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@mod.route('/template/<template_name>')
def get_template_data(template_name):
    model_class = model_mapping.get(template_name)
    if not model_class:
        return jsonify({'error': 'Template not found'}), 404

    model = model_class()
    return jsonify(model.data)
