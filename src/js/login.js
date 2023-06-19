
function buscaUsuario(nome, senha){
    const jt = localStorage.getItem(nome);
    
  //se jt não é igual a null(não estiver vazio), buscar os dados presentes no local storage. Se não, mostrar mensagem de "Seus dados estão incorretos, tente novamente"
    if(jt!=null){ 
        let pessoa = JSON.parse(jt); 
        if (document.getElementById("usuario").value === pessoa.nome && senha === pessoa.senha) {
            alert("Seja bem vindo(a)!");
            localStorage.setItem("usuario_logado",pessoa.nome)
            location.href = "/src/calendario-de-listas.html";
            
        }
        else{
           window.alert("Seus dados estão incorretos, tente novamente");
        }
      }else if (jt === null) {alert("Insira seus dados para continuar!")}
    }

    // Caso o jt esteja vazio mostrar mensagem abaixo
    

     
