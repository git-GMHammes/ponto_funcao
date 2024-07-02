# Caminho: C:\laragon\www\apf\app\__init__.py

from flask import Flask

def create_app():
    app = Flask(__name__)

    from app.views import bp
    app.register_blueprint(bp)

    return app
