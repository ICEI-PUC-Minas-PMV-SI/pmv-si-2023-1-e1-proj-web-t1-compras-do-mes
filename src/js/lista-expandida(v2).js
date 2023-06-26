//É criado um array com o '[ ]'. Dentro do array, são inseridos todos os itens para criar uma lista.
let listaCompras = JSON.parse(localStorage.getItem('listaCompras')) || [{
  nome: "Banana",
  valor: "15",
  qtd: "2",

}];

ativarLista();

function ativarLista(){
  let listaComprasHTML = '';

  //"for" é o comando de 'loop' utilizado para que o sistema passe por todos os itens que estão dentro do array.
  for (let i = 0; i < listaCompras.length; i++) {
    const dadosListaObjeto = listaCompras[i];
    const nome = dadosListaObjeto.nome;
    const valor = dadosListaObjeto.valor;
    const qtd = dadosListaObjeto.qtd;

    //o código abaixo cria um html com um parágrafo, e um botão dentro do parágrafo.
    //o botão serve para que ele seja apagado da lista após inserido.
    
    const html = `<ul class="content">
    <li class="food-item">
      <div class="title">
        <h2>${nome}</h2>
      </div>
      <div class="values"> 
        <div class="value">
          <h2>Valor:</h2>
          <h2>$${valor}</h2>
        </div>
        <div class="value">
          <h2>QTD:</h2>
          <h2>${qtd}</h2>
        </div>
        <div class="value">
          <h2>Total:</h2>
          <h2>$${valor * qtd}</h2>
        </div>
        <button onclick="abrirModalEdicao(item);">Editar</button>
        <button onclick="listaCompras.splice(${i}, 1);ativarLista();">Apagar</button>
      </div>
    </li>
  </ul>`;

  listaComprasHTML += html;
  }
  document.querySelector('.js-itens-lista').innerHTML = listaComprasHTML;

  localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
}                 

function addCompras() {

  const inputElement = document.querySelector('.js-nome-input');
  const nome = inputElement.value;

  const valorElement = document.querySelector('.js-valor-input');
  const valor = valorElement.value;

  const qtdElement = document.querySelector('.js-qtd-input');
  const qtd = qtdElement.value;

  listaCompras.push({nome: nome, valor: valor, qtd: qtd});


  //o código abaixo faz com que toda vez que é inserido um dado, os campos voltem a não ter nada inserido neles
  inputElement.value = '';
  valorElement.value = '';
  qtdElement.value = '';

  ativarLista();

  }

