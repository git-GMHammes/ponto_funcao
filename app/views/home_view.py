# Caminho: C:\laragon\www\apf\app\views\home_view.py

from flask import render_template, request, jsonify
from app.views import bp

class HomeView:
    @staticmethod
    @bp.route('/hello')
    def home():
        return render_template('index.html')

    @staticmethod
    @bp.route('/data', methods=['POST'])
    def get_data():
        data = request.get_json()
        return jsonify(data)
