# app/views/form_ponto_funcao_view.py
from flask import render_template, request, redirect, url_for
from flask.views import MethodView

class FormPontoFuncaoView(MethodView):
    def get(self):
        return render_template('form_ponto_funcao.html')

    def post(self):
        # Aqui você pode tratar os dados enviados pelo formulário
        data = request.form
        print(data)  # Exemplo de processamento dos dados
        return redirect(url_for('formpontofuncao'))