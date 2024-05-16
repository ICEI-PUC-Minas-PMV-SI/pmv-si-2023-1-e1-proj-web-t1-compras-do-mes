//GOOGLE CHART GRÁFICO
function getReceitaToChart(revenue) {
    const receitasGraf = {};

    revenue.forEach(receita => {
      const receitaGraf = receita.nome;
      const valor = parseFloat(receita.vlr);

      if (receitasGraf[receitaGraf]) {
        receitasGraf[receitaGraf] += valor;
      } else {
        receitasGraf[receitaGraf] = valor;
      }
    });

    return Object.entries(receitasGraf);
}

function drawChart(revenue) {
  function callback() {
      const darkMode = document.body.classList.contains('dark-mode');
      const textColor = darkMode ? 'white' : 'black';
      const titleColor = darkMode ? 'white' : 'black';
      var data = google.visualization.arrayToDataTable([
          ['Receita', 'Gastos'],
          ...revenue    
      ]);
      var options = {
          legend: { textStyle: { color: textColor } },
          pieSliceText: 'label',
          title: 'Receita',
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
const receitaList = document.getElementById('receita-list');

let receitas = JSON.parse(localStorage.getItem('receitas')) || [];

let lista_receitas = '';

for (let i = 0; i < receitas.length; i++) {
    lista_receitas += `
    <tr>
        <th>${receitas[i].id}</th>
        <td>${receitas[i].nome}</td>
        <td>R$${(parseFloat(receitas[i].vlr)).toFixed(2)}</td>
        <td>
            <a onclick="getReceita('${receitas[i].id}');" 
            class="btn btn-warning btn-sm" 
            data-toggle="modal" data-target="#receita-modal">
            <i class="fa fa-edit"></i>  Editar
            </a>

            <a onclick="$('#id-receita').text('${receitas[i].id}');" class="btn btn-danger btn-sm" 
            data-toggle="modal" data-target="#modal-delete">
            <i class="fa fa-trash"></i> Remover
            </a>
        </td>
    </tr>
    `;
}

receitaList.innerHTML = lista_receitas;

// FUNCTION GRÁFICOS
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart(getReceitaToChart(receitas)));

// VALORES TOTAIS
let valorTotalReceita = 0;
let valorTotalGasto = 0;

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

function calcularValorReceita() {
  const valorSaldo = valorTotalReceita - valorTotalGasto;

  if (valorSaldo > 0) {
    document.getElementById('valor-saldo').textContent = formatarMoeda(valorSaldo);
  } else {
    document.getElementById('valor-saldo').textContent = formatarMoeda(0);
  }
}

function carregarDados() {
  let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
  receitas.forEach(receita => {
    const valor = parseFloat(receita.vlr);
    valorTotalReceita += valor;
  });
  document.getElementById('valor-total-receita').innerHTML = formatarMoeda(valorTotalReceita);

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.forEach(produto => {
    const valor = parseFloat(produto.vlr);
    const quantidade = parseInt(produto.qtd);
    valorTotalGasto += valor * quantidade;
  });
  document.getElementById('valor-total-gasto').innerHTML = formatarMoeda(valorTotalGasto);

  calcularValorReceita();
}

carregarDados();

// DELETE - PROCEDIMENTO PARA EXCLUIR UM PRODUTO
const receitaDelete = document.getElementById('btn-delete');

receitaDelete.addEventListener('click', (e) => {
    e.preventDefault();
    let id = document.getElementById('id-receita').textContent.trim();

    let receitas = JSON.parse(localStorage.getItem('receitas')) || [];

    receitas = receitas.filter(receita => receita.id !== id);

    localStorage.setItem('receitas', JSON.stringify(receitas));

    updateDate();

    location.reload();
});

// PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM PRODUTO NA API
function getReceita(id) {
  if (id == 0) {
      $('#edit-rec-id').text("");
      $("#receita-id").prop("disabled", false);
      $('#receita-id').val("");
      $('#receita-nome').val("");
      $('#receita-vlr').val("");
  } else {
      $('#edit-rec-id').text(id);

      let receitas = JSON.parse(localStorage.getItem('receitas')) || [];

      let receita = receitas.find(receita => receita.id === id.toString());

      if (receita) {
          $("#receita-id").prop("disabled", true);
          $('#receita-id').val(receita.id);
          $('#receita-nome').val(receita.nome);
          $('#receita-vlr').val(receita.vlr);
      } else {
          alert("Receita não encontrada.");
      }
  }
}


// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM PRODUTO
const receitaForm = document.getElementById('receita-form');

receitaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let id = document.getElementById('edit-rec-id').textContent.trim();
  
  let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
  
  const receita = {
      id: id || (receitas.length > 0 ? (parseInt(receitas[receitas.length - 1].id) + 1).toString() : '1'),
      nome: document.getElementById('receita-nome').value,
      vlr: document.getElementById('receita-vlr').value,
  };
  
  if (id && receitas.some(p => p.id === id)) {
      receitas = receitas.map(p => p.id === id ? {...p, ...receita} : p);
  } else {
      receitas.push(receita);
  }
  
  localStorage.setItem('receitas', JSON.stringify(receitas));
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
}

// usuário logado
let nomeUsuario = localStorage.getItem('usuario_logado');
var tagA = document.getElementById("nome");
tagA.innerHTML = `${nomeUsuario}`; 
