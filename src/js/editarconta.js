function alterarConta() {
    var nomeUsuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;
    var novaSenha = document.getElementById("novaSenha").value;
    var confirmasenha = document.getElementById("confirmasenha").value;

    // Valide se todos os campos foram preenchidos
    if (nomeUsuario === "" || senha === "" || novaSenha === "" || confirmasenha === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Valide se a nova senha e a confirmação da nova senha são iguais
    if (novaSenha !== confirmasenha) {
        alert("A nova senha e a confirmação da nova senha não coincidem.");
        return;
    }

    
    alert("Conta alterada com sucesso!");
}

