# app/utils/get_url.py
from flask import request

def get_url_components():
    return {
        'scheme': request.scheme,
        'server': request.host.split(':')[0],
        'port': request.host.split(':')[1] if ':' in request.host else '80',
        'path': request.path,
        'query_string': request.query_string.decode('utf-8'),
        'full_url': request.url,
        'base_url': request.base_url,
        'url_root': request.url_root
    }
