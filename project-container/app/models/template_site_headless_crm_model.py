# app\models\template_site_headless_crm_model.py
import json
import os
from flask import current_app

class TemplateSiteHeadlessCRMModel:
    def __init__(self):
        self.data = self.load_data()

    def load_data(self):
        # Caminho relativo ao diretório base da aplicação
        base_path = current_app.root_path
        file_path = os.path.join(base_path, 'json', 'template_site_headless_crm_v02.json')
        
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data

