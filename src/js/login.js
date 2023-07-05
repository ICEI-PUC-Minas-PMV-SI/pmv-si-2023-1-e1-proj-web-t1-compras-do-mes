
function buscaUsuario(nome, senha){
    const jt = localStorage.getItem(nome);
    
//se jt não é igual a null(não estiver vazio), buscar os dados presentes no local storage. Se não, mostrar mensagem de "Seus dados estão incorretos, tente novamente"
    if(jt!=null){ 
        let pessoa = JSON.parse(jt); 
        if (senha === pessoa.senha) {
            alert("Seja bem vindo(a)!");
            localStorage.setItem("usuario_logado",pessoa.nome)
            location.href = "lista-de-gastos.html";
        }
        else{
          alert("Seus dados estão incorretos, tente novamente");
        }
// Caso o jt esteja vazio mostrar mensagem abaixo
      }else {alert("Insira seus dados para continuar!")}
    }

