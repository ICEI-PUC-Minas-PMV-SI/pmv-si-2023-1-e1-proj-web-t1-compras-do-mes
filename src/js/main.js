// USUÁRIO LOGADO
let nomeUsuario = localStorage.getItem('usuario_logado');
var tagA = document.getElementById("nome");
tagA.innerHTML = `${nomeUsuario}`;

//GOOGLE CHART GRÁFICO
function getCategoriesToChart(products) {
    const categorias = {};
    
    products.forEach(produto => {
      const categoria = produto.categoria;
      const valor = parseFloat(produto.vlr);
      const quantidade = parseInt(produto.qtd);
      const subtotal = valor * quantidade;

      if (categorias[categoria]) {
        categorias[categoria] += subtotal;
      } else {
        categorias[categoria] = subtotal;
      }
    });

    return Object.entries(categorias);
}

function drawChart(categories) {
  function callback() {
      const darkMode = document.body.classList.contains('dark-mode');
      const textColor = darkMode ? 'white' : 'black';
      const titleColor = darkMode ? 'white' : 'black';

      var data = google.visualization.arrayToDataTable([
          ['Categoria', 'Gastos'],
          ...categories    
      ]);
      var options = {
          legend: { textStyle: { color: textColor } },
          pieSliceText: 'label',
          title: 'Gastos Mensais',
          titleTextStyle: { color: titleColor },
          pieStartAngle: 100,
          backgroundColor: { fill: 'transparent' },
          slices: { 
              0: { color: '#3366cc' }, 
              1: { color: '#dc3912' },
          }
      };
  
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
  }

  return callback;
}

// GET - Recupera todos os produtos e adiciona na tabela
const produtoList = document.getElementById('produto-list');

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

let lista_produtos = '';

for (let i = 0; i < produtos.length; i++) {
    let vlt_total = produtos[i].qtd * produtos[i].vlr;
    lista_produtos += `
    <tr>
        <th>${produtos[i].id}</th>
        <td>${produtos[i].categoria}</td>
        <td>${produtos[i].nome}</td>
        <td>R$${(parseFloat(produtos[i].vlr)).toFixed(2)}</td>
        <td>${produtos[i].qtd}</td>
        <td>R$${parseFloat(vlt_total).toFixed(2)}</td>
        <td>
            <a onclick="getProduto('${produtos[i].id}');" 
            class="btn btn-warning btn-sm" 
            data-toggle="modal" data-target="#produto-modal">
            <i class="fa fa-edit"></i>  Editar
            </a>

            <a onclick="$('#id-prod').text('${produtos[i].id}');" class="btn btn-danger btn-sm" 
            data-toggle="modal" data-target="#modal-delete">
            <i class="fa fa-trash"></i> Remover
            </a>
        </td>
    </tr>
    `;
}

produtoList.innerHTML = lista_produtos;

// FUNCTION GRÁFICOS
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart(getCategoriesToChart(produtos)));

// BUSCA VALORES TOTAIS
let valorTotalReceita = 0;
let valorTotalGasto = 0;

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

function calcularValorExcedido() {
  const valorExcedido = valorTotalReceita - valorTotalGasto;

  if (valorExcedido < 0) {
    document.getElementById('valor-excedido').textContent = formatarMoeda(valorExcedido);
    alert('Cuidado! Você gastou mais do que havia planejado!');
  } else {
    document.getElementById('valor-excedido').textContent = formatarMoeda(0);
  }
}

function carregarValores() {
  const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
  receitas.forEach(receita => {
    const valor = parseFloat(receita.vlr);
    valorTotalReceita += valor;
  });
  document.getElementById('valor-total-receita').innerHTML = formatarMoeda(valorTotalReceita);

  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.forEach(produto => {
    const valor = parseFloat(produto.vlr);
    const quantidade = parseInt(produto.qtd);
    valorTotalGasto += valor * quantidade;
  });
  document.getElementById('valor-total').innerHTML = formatarMoeda(valorTotalGasto);

  calcularValorExcedido();
}

window.addEventListener('DOMContentLoaded', carregarValores);

// DELETE - PROCEDIMENTO PARA EXCLUIR UM PRODUTO
const produtoDelete = document.getElementById('btn-delete');

produtoDelete.addEventListener('click', (e) => {
    let id = $('#id-prod').text();

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos = produtos.filter(produto => produto.id !== id);

    localStorage.setItem('produtos', JSON.stringify(produtos));

    updateDate();

    location.reload();
});

// PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM PRODUTO NA API
function getProduto(id) {
  if (id == 0) {
      $('#edit-prod-id').text("");
      $("#produto-id").prop("disabled", false);
      $('#produto-id').val("");
      $('#produto-categoria').val("");
      $('#produto-nome').val("");
      $('#produto-vlr').val("");
      $('#produto-qtd').val("");
  } else {
      $('#edit-prod-id').text(id);

      let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

      let produto = produtos.find(produto => produto.id === id.toString());

      if (produto) {
          $("#produto-id").prop("disabled", true);
          $('#produto-id').val(produto.id);
          $('#produto-categoria').val(produto.categoria);
          $('#produto-nome').val(produto.nome);
          $('#produto-vlr').val(produto.vlr);
          $('#produto-qtd').val(produto.qtd);
      } else {
          alert("Produto não encontrado.");
      }
  }
}

// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM PRODUTO
const produtoForm = document.getElementById('produto-form');

produtoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = $('#edit-prod-id').text();
    
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    
    const produto = {
        id: id || (produtos.length > 0 ? (parseInt(produtos[produtos.length - 1].id) + 1).toString() : '1'),
        categoria: document.getElementById('produto-categoria').value,
        nome: document.getElementById('produto-nome').value,
        vlr: document.getElementById('produto-vlr').value,
        qtd: document.getElementById('produto-qtd').value
    };

    if (id) {
        produtos = produtos.map(p => p.id === id ? produto : p);
    } else {
        produtos.push(produto);
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));

    updateDate();

    location.reload();
});

// ATUALIZAR DATA
function updateDate() {
  const currentDate = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).split('/').reverse().join('-');

  localStorage.setItem('dataAtualizada', currentDate);
}

document.addEventListener('DOMContentLoaded', function () {
  function getData() {
    let data = localStorage.getItem('dataAtualizada');
    if (data) {
      document.getElementById('data').value = data;
    }
  }

  document.getElementById('form-data').addEventListener('submit', function (event) {
    event.preventDefault();
    var inputData = document.getElementById('data').value;
    localStorage.setItem('dataAtualizada', inputData);
  });

  getData();
});


// SALVAR METAS
function salvarMetas() {
  const textarea = document.getElementById('exampleFormControlTextarea1');
  const novoTexto = textarea.value;

  localStorage.setItem('metas', novoTexto);
}

document.getElementById('salvarmeta').addEventListener('click', salvarMetas);

window.addEventListener('DOMContentLoaded', () => {
  const metas = localStorage.getItem('metas');
  if (metas) {
    const textarea = document.getElementById('exampleFormControlTextarea1');
    textarea.value = metas;
  }
});

//Dark Mode
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart(getCategoriesToChart(produtos)));
}

