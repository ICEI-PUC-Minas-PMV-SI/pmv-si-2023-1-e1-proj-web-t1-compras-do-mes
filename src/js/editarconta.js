function alterarConta() {
    const usuario = document.getElementById("usuario").value;
    const senhaAtual = document.getElementById("senha").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmaSenha = document.getElementById("confirmasenha").value;
  
    // Verifica se o usuário existe no localStorage
    const usuarioExistente = localStorage.getItem(usuario);
  
    if (usuarioExistente) {
      const usuarioObj = JSON.parse(usuarioExistente);
  
      // Verifica se a senha atual está correta
      if (usuarioObj.senha === senhaAtual) {
        // Verifica se a nova senha e a confirmação de senha são iguais
        if (novaSenha === confirmaSenha) {
          // Atualiza a senha do usuário
          usuarioObj.senha = novaSenha;
          usuarioObj.confsenha = confirmaSenha;
  
          // Salva as alterações no localStorage
          localStorage.setItem(usuario, JSON.stringify(usuarioObj));
  
          alert("Conta alterada com sucesso!");
          location.href = "index.html";
        } else {
          alert('"Nova Senha" e "Confirme a nova senha" devem conter o mesmo dado.');
        }
      } else {
        alert("Senha atual incorreta.");
      }
    } else {
      alert("Usuário não encontrado.");
    }
  }