function alterarConta(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Verifica se os campos estão preenchidos
  if (
    document.getElementById("usuario").value.trim() === "" ||
    document.getElementById("senha").value.trim() === "" ||
    document.getElementById("novaSenha").value.trim() === "" ||
    document.getElementById("confirmasenha").value.trim() === ""
  ) {
    alert("Por favor, preencha todos os campos.");
    return; // Interrompe a execução da função se os campos não estiverem preenchidos
  }

  let usuario = document.getElementById("usuario").value;
  let usuarioExistente = localStorage.getItem(usuario);

  if (usuarioExistente) {
    let usuarioObj = JSON.parse(usuarioExistente);
    let senhaAtual = document.getElementById("senha").value;

    if (senhaAtual === usuarioObj.senha) {
      let novaSenha = document.getElementById("novaSenha").value;
      let confirmaSenha = document.getElementById("confirmasenha").value;

      if (novaSenha === confirmaSenha) {
        usuarioObj.senha = novaSenha;
        let jt = JSON.stringify(usuarioObj);
        localStorage.setItem(usuario, jt);
        alert("Senha alterada com sucesso!");
        location.href = "index.html";
      } else {
        alert('"Nova Senha" e "Confirme Nova Senha" devem conter o mesmo dado.');
      }
    } else {
      alert("Senha atual incorreta.");
    }
  } else {
    alert("Usuário não encontrado.");
  }
}

// Adicione um ouvinte de evento ao formulário para capturar o evento de envio
document.getElementById("alterar-form").addEventListener("submit", alterarConta);