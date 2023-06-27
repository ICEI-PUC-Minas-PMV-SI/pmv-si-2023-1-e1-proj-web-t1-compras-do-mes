
 function logout() {
    window.alert("Você foi desconectado com sucesso! ");
    localStorage.removeItem('usuario_logado');
    location.href = "/src/tela-de-login.html";
    
    
 }