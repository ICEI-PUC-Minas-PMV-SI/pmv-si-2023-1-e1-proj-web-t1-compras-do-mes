function buscaUsuario(event) {
  event.preventDefault(); // Impede o envio do formulário

  const nome = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Verifica se os campos estão preenchidos
  if (nome.trim() === "" || senha.trim() === "") {
    alert("Por favor, preencha todos os campos.");
    return; // Interrompe a execução da função se os campos não estiverem preenchidos
  }

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
    alert("Usuário não encontrado. Por favor, verifique suas credenciais.");
  }
}

// Adicione um ouvinte de evento ao formulário para capturar o evento de envio
document.getElementById("login-form").addEventListener("submit", buscaUsuario);