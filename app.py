from flask import Flask, render_template, request, jsonify
from models.usuario_model import init_db, registrar_profissional

app = Flask(__name__)

# Executa a inicialização do banco ao iniciar o servidor
init_db()

@app.route('/')
def index():
    """Retorna o template unificado (base.html)."""
    return render_template('base.html')

@app.route('/api/registrar', methods=['POST'])
def registrar():
    """Endpoint que processa e valida a requisição do front-end."""
    dados = request.get_json()
    
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')
    
    if not nome or email or senha:
        return jsonify({"status": "erro", "mensagem": "Preencha todos os campos obrigatórios."}), 400

    sucesso, mensagem = registrar_profissional(nome, email, senha)
    
    if sucesso:
        return jsonify({"status": "sucesso", "mensagem": mensagem}), 201
    else:
        return jsonify({"status": "erro", "mensagem": mensagem}), 400

if __name__ == '__main__':
    app.run(debug=True)