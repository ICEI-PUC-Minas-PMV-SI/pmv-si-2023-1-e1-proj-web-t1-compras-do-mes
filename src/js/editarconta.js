function alterarConta() {
    // Obtém o nome de usuário do campo de entrada
    let usuario = document.getElementById("usuario").value;
  
    // Verifica se o usuário existe no localStorage
    let usuarioExistente = localStorage.getItem(usuario);
  
    if (usuarioExistente) {
      // Converte a string JSON de volta para um objeto
      let usuarioObj = JSON.parse(usuarioExistente);
  
      // Obtém a senha atual digitada pelo usuário
      let senhaAtual = document.getElementById("senha").value;
  
      // Verifica se a senha atual está correta
      if (senhaAtual === usuarioObj.senha) {
        // Obtém a nova senha e a confirmação da nova senha
        let novaSenha = document.getElementById("novaSenha").value;
        let confirmaSenha = document.getElementById("confirmasenha").value;
  
        // Verifica se a nova senha e a confirmação são iguais
        if (novaSenha === confirmaSenha) {
          // Atualiza a senha do usuário no objeto
          usuarioObj.senha = novaSenha;
  
          // Converte o objeto de volta para uma string JSON
          let jt = JSON.stringify(usuarioObj);
  
          // Armazena o objeto atualizado no localStorage
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