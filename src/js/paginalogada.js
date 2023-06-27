window.onload = function usuarioLogado() {
    let nomeUsuario = localStorage.getItem('usuario_logado');
    if(nomeUsuario==null || nomeUsuario=="" || nomeUsuario=="null"){
       location.href = "/src/lista-de-gastos.html";
 
    }
    var tagA = document.getElementById("nome");
    tagA.innerHTML = `${}`; 
    
 }
 
 function logout() {
    window.alert("Você foi desconectado com sucesso! ");
    localStorage.removeItem('usuario_logado');
    location.href = "/src/tela-de-login.html";
    
    
 }