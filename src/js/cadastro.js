
function cadastrar(){
    let novousuario = new Object(); 
    novousuario.nome=document.getElementById("usuario").value; 
    novousuario.senha=document.getElementById("senha").value; 
    novousuario.confsenha=document.getElementById("confsenha").value; 
    
    window.alert("Cadastro realizado! Realize seu login!");
    let jt = JSON.stringify(novousuario); 
    localStorage.setItem(novousuario.nome, jt);
    location.href = "/src/tela-de-login.html";
    
   }