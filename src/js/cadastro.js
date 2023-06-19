
function cadastrar(){
    if (document.getElementById("senha").value === document.getElementById("confsenha").value) 
    {
    let novousuario = new Object(); 
    novousuario.nome=document.getElementById("usuario").value; 
    novousuario.senha=document.getElementById("senha").value; 
    novousuario.confsenha=document.getElementById("confsenha").value; 
    window.alert("Cadastro realizado! Realize seu login!");
    let jt = JSON.stringify(novousuario); 
    localStorage.setItem(novousuario.nome, jt);
    location.href = "/src/tela-de-login.html";}
    
    else {alert('"Senha" e "Confirme a senha" devem ser o mesmo dado.')}
    
   }