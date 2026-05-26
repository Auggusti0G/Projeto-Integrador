import sqlite3

DATABASE = 'dados.db'

def init_db():
    """Garante a criação da tabela de profissionais caso não exista."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profissionais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def registrar_profissional(nome, email, senha):
    """Salva um novo profissional no banco de dados local."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO profissionais (nome, email, senha)
            VALUES (?, ?, ?)
        ''', (nome, email, senha))
        conn.commit()
        return True, "Cadastro realizado com sucesso!"
    except sqlite3.IntegrityError:
        return False, "Este e-mail profissional já está em uso."
    finally:
        conn.close()