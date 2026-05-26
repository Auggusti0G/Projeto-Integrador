// 1. Função de Navegação entre telas
function goTo(screenId) {
    console.log("Mudando para a tela:", screenId);
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    } else {
        console.error("Erro: A tela com o ID '" + screenId + "' não foi encontrada no HTML.");
    }
}

// 2. Lógica de Troca de Tema (Claro/Escuro)
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    if (!themeBtn) return;
    
    const icon = themeBtn.querySelector('i');

    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        themeBtn.style.color = '#f59e0b'; // Cor do sol
    } else {
        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        themeBtn.style.color = '#3b82f6'; // Cor da lua
    }
}

// 3. Função de Envio de Cadastro para o Banco de Dados
function processarCadastro() {
    console.log("Botão de finalizar cadastro clicado!");

    const inputNome = document.getElementById('nome_completo');
    const inputEmail = document.getElementById('email_prof');
    const inputSenha = document.getElementById('senha_prof');

    // Validação de segurança para garantir que os inputs existem no HTML
    if (!inputNome || !inputEmail || !inputSenha) {
        console.error("Erro crítico: Um ou mais inputs não foram encontrados no seu HTML. Verifique os IDs.");
        alert("Erro no formulário. Verifique o console do desenvolvedor (F12).");
        return;
    }

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    console.log("Dados capturados:", { nome, email, senha });

    if (nome === "" || email === "" || senha === "") {
        alert("Por favor, preencha todos os campos do formulário.");
        return;
    }

    // Envia os dados limpos para o Python (Controller)
    fetch('/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, email: email, senha: senha })
    })
    .then(response => {
        console.log("Resposta bruta do servidor:", response);
        return response.json();
    })
    .then(data => {
        console.log("Dados convertidos do servidor:", data);
        if (data.status === 'sucesso') {
            alert(data.mensagem);
            goTo('screen-dashboard');
        } else {
            alert("Erro do Servidor: " + data.mensagem);
        }
    })
    .catch(error => {
        console.error("Falha na requisição Fetch:", error);
        alert("Ocorreu um erro interno ao tentar se conectar com o servidor.");
    });
}