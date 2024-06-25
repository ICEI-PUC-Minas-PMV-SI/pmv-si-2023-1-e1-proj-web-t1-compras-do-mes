
 function logout() {
    window.alert("Você foi desconectado com sucesso! ");
    localStorage.removeItem('usuario_logado');
    location.href = "index.html";
    
    
 }