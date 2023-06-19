
function buscaUsuario(nome, senha){
    const jt = localStorage.getItem(nome);
    
  //se jt não é igual a null, buscar os dados
    if(jt!=null){ 
        let pessoa = JSON.parse(jt); 
        if (document.getElementById("usuario").value === pessoa.nome && senha === pessoa.senha) {
            alert("Seja bem vindo(a)!");
            localStorage.setItem("usuario_logado",pessoa.nome)
            location.href = "/src/tela-inicial-usuario.html";
            
        }
        else{
           window.alert("Seus dados estão incorretos, tente novamente");
        }
    }
    if(jt=null){
      alert("Insira seus dados para continuar!")
    } 
}