function buscaUsuario(nome, senha) {
  const jt = localStorage.getItem(nome);

  if (jt != null) {
    let pessoa = JSON.parse(jt);
    if (senha === pessoa.senha) {
      alert("Seja bem vindo(a)!");
      localStorage.setItem("usuario_logado", pessoa.nome);
      window.location.assign("escolhadelistas.html"); // Redireciona para a página de destino
    } else {
      alert("Seus dados estão incorretos, tente novamente");
    }
  } else {
    alert("Insira seus dados para continuar!");
  }
}

// Adicione esta função para lidar com o evento de envio do formulário
function handleFormSubmit(event) {
  event.preventDefault(); // Impede o envio do formulário
  const nome = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  buscaUsuario(nome, senha);
}

// Adicione um ouvinte de evento ao formulário para capturar o evento de envio
document.getElementById("login-form").addEventListener("submit", handleFormSubmit);