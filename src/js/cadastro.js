function cadastrar() {
    // Verifica se os campos estão preenchidos
    if (
      document.getElementById("usuario").value.trim() === "" ||
      document.getElementById("senha").value.trim() === "" ||
      document.getElementById("confsenha").value.trim() === ""
    ) {
      alert("Por favor, preencha todos os campos.");
      return; // Interrompe a execução da função se os campos não estiverem preenchidos
    }
  
    if (document.getElementById("senha").value === document.getElementById("confsenha").value) {
      let novousuario = new Object();
      novousuario.nome = document.getElementById("usuario").value;
      novousuario.senha = document.getElementById("senha").value;
      novousuario.confsenha = document.getElementById("confsenha").value;
      let jt = JSON.stringify(novousuario);
      localStorage.setItem(novousuario.nome, jt);
      alert("Cadastro realizado! Realize seu login!");
      location.href = "index.html";
    } else {
      alert('"Senha" e "Confirme a senha" devem conter o mesmo dado.');
    }
  }
  
  // Adicione esta função para lidar com o evento de envio do formulário
  function handleFormSubmit(event) {
    event.preventDefault(); // Impede o envio do formulário
    cadastrar();
  }
  
  // Adicione um ouvinte de evento ao formulário para capturar o evento de envio
  document.getElementById("cadastro-form").addEventListener("submit", handleFormSubmit);