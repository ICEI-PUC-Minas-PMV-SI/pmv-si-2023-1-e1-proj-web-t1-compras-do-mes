window.onload = function usuarioLogado() {
    let nomeUsuario = localStorage.getItem('usuario_logado');
    if(nomeUsuario==null || nomeUsuario=="" || nomeUsuario=="null"){
       location.href = "/src/calendario-de-listas.html";
 
    }
    var tagA = document.getElementById("nome");
    tagA.innerHTML = `${nomeUsuario}`; 
    
 }
 
 function logout() {
    window.alert("Você foi desconectado com sucesso! ");
    localStorage.removeItem('usuario_logado');
    location.href = "/src/tela-de-login.html";
    
    
 }