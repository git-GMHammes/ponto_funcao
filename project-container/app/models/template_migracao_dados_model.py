# app\models\template_migracao_dados_model.py
import json
import os
from flask import current_app

class TemplateMigracaoDadosModel:
    def __init__(self):
        self.data = self.load_data()

    def load_data(self):
        # Caminho relativo ao diretório base da aplicação
        base_path = current_app.root_path
        file_path = os.path.join(base_path, 'json', 'template_migracao_dados.json')
        
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data

