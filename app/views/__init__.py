# Caminho: C:\laragon\www\apf\app\views\__init__.py

from flask import Blueprint

bp = Blueprint('main', __name__)

from app.views import home_view
