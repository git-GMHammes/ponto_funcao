# Usar uma imagem oficial do Python como imagem pai
FROM python:3.10-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo de dependências e instalar as dependências
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o restante do código-fonte do aplicativo para o diretório de trabalho
COPY app/ .

# Definir variável de ambiente
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expõe a porta 5000
EXPOSE 5000

# Comando para iniciar o aplicativo usando o Flask
CMD ["flask", "run"]
