const nomeInput = document.querySelector('#nome');
const emailInput = document.querySelector('#email');
const feedbackGeral = document.querySelector('#feedback-geral');
const form = document.querySelector('form');

function validarNome() {
  const nome = nomeInput.value.trim();
  if (nome === '') {
    feedbackGeral.textContent = 'O nome não pode estar vazio.';
    return false;
  }
  if (nome.length < 3) {
    feedbackGeral.textContent = 'O nome é muito curto (mínimo 3 caracteres).';
    return false;
  }
  return true;
}

function validarEmail() {
  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '' || !regex.test(email)) {
    emailInput.style.border = '2px solid #dc3545';
    feedbackGeral.textContent = 'Por favor, insira um e-mail válido.';
    return false;
  }
  emailInput.style.border = '';
  return true;
}

emailInput.addEventListener('blur', validarEmail);

async function validarEEnviar(event) {
  event.preventDefault();
  const nomeValido = validarNome();
  const emailValido = validarEmail();
  if (!nomeValido || !emailValido) return;

  try {
    const resposta = await fetch('processa_contato.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nomeInput.value, email: emailInput.value })
    });

    if (!resposta.ok) {
      throw new Error(`Erro de Servidor: Status ${resposta.status}`);
    }

    const resultado = await resposta.json();
    console.log(`Dados Enviados com Sucesso: Nome ${resultado.nome} e Email ${resultado.email}`);

    feedbackGeral.textContent = 'Formulário enviado com sucesso!';
    form.reset();

  } catch (erro) {
    feedbackGeral.textContent = 'Ocorreu um erro ao enviar os dados.';
    console.error(erro);
  }
}

form.addEventListener('submit', validarEEnviar);
