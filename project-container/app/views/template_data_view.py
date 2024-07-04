# app/views/template_data_view.py
from flask import Blueprint, jsonify
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


@mod.route('/template/<template_name>')
def get_template_data(template_name):
    model_class = model_mapping.get(template_name)
    if not model_class:
        return jsonify({'error': 'Template not found'}), 404

    model = model_class()
    return jsonify(model.data)
