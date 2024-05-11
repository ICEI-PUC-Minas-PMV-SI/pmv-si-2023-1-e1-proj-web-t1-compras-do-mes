// URL DA API DE DADOS
URL = 'http://localhost:3000/receitas'

function getCategoriesToChart(products) {
    const categorias = {};

    products.forEach(receita => {
      const categoria = produto.categoria;
      const valor = parseFloat(produto.vlr);


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
fetch(URL)
    .then(res => res.json())
    .then(receitas => {
        let lista_receitas = '';
        for (let i = 0; i < receitas.length; i++) {
            vlt_total = receitas[i].qtd * receitas[i].vlr;
            lista_receitas += `
            <tr>
                <th>${receitas[i].id}</th>
                <td>${receitas[i].nome}</td>
                <td>R$${(parseFloat(receitas[i].vlr)).toFixed(2)}</td>
                <td>
                    <a onclick="getReceita(${receitas[i].id});" 
                    class="btn btn-warning btn-sm" 
                    data-toggle="modal" data-target="#receita-modal">
                    <i class="fa fa-edit"></i>  Editar
                    </a>

                    <a onclick="$('#id-receita').text(${receitas[i].id});" class="btn btn-danger btn-sm" 
                    data-toggle="modal" data-target="#modal-delete">
                    <i class="fa fa-trash"></i> Remover
                    </a>
                </td>
            </tr>
            `;
            receitaList.innerHTML = lista_receitas;
        }

        // FUNCTION GRÁFICOS
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart(getCategoriesToChart(receitas)));
    });

//Valor Total Receita
let valorTotalReceita = 0;
let valorTotalGasto = 0;

// Função para formatar número como moeda
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

// Função para calcular o valor Saldo
function calcularValorReceita() {
  const valorSaldo = valorTotalReceita - valorTotalGasto;

  if (valorSaldo > 0) {
    document.getElementById('valor-saldo').textContent = formatarMoeda(valorSaldo);
  } else {
    document.getElementById('valor-saldo').textContent = formatarMoeda(0);
  }
}

// Fetch das receitas
const fetchReceitas = fetch('http://localhost:3000/receitas')
  .then(response => response.json())
  .then(data => {
    data.forEach(receita => {
      const valor = parseFloat(receita.vlr);
      valorTotalReceita += valor;
    });
    document.getElementById('valor-total-receita').innerHTML = formatarMoeda(valorTotalReceita);
  });

// Fetch dos produtos
const fetchProdutos = fetch('http://localhost:3000/produtos')
  .then(response => response.json())
  .then(data => {
    data.forEach(produto => {
      const valor = parseFloat(produto.vlr);
      const quantidade = parseInt(produto.qtd);
      valorTotalGasto += valor * quantidade;
    });
    document.getElementById('valor-total-gasto').innerHTML = formatarMoeda(valorTotalGasto);
  });

// Executar os cálculos após ambas as fetch serem completadas
Promise.all([fetchReceitas, fetchProdutos]).then(() => {
  calcularValorReceita();
});

// DELETE - PROCEDIMENTO PARA EXCLUIR UM PRODUTO
const receitaDelete = document.getElementById('btn-delete');

receitaDelete.addEventListener('click', (e) => {

    let id = $('#id-receita').text();

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload());
    updateDate();
    

})

// PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM PRODUTO NA API
function getReceita(id){

    if(id == 0){
        $('#edit-rec-id').text("");
        $( "#receita-id" ).prop( "disabled", false );
        $('#receita-id').val("");
        $('#receita-nome').val("");
        $('#receita-vlr').val("");
    }else{
        $('#edit-rec-id').text(id);
        fetch(`${URL}/${id}`).then(res => res.json())    
        .then(data => {
            $( "#receita-id" ).prop( "disabled", true );
            $('#receita-id').val(data.id);
            $('#receita-nome').val(data.nome);
            $('#receita-vlr').val(data.vlr);
        });
    }    
}

// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM PRODUTO
const receitaForm = document.getElementById('receita-form');

receitaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = parseInt($('#edit-rec-id').text());    
    const receita = JSON.stringify({
        id: document.getElementById('receita-id').value,
        nome: document.getElementById('receita-nome').value,
        vlr: document.getElementById('receita-vlr').value,
    })
    if (id >= 0) {
        fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: receita
        })
        .then(res => res.json())
        .then(() => {
            updateDate();
        });
    }
    else { 
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: receita
        })
        .then(res => res.json())
        .then(() => {
            updateDate();
        });  
    }      
});

// Atualizar Data
function updateDate() {
  const currentDate = new Date().toISOString().slice(0, 10).toLocaleString(
    'pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day:'2-digit'
    }
  );

  fetch('http://localhost:3000/datesReceita/1', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: currentDate })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao atualizar a data no servidor');
      }
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}

// salvar data
document.addEventListener('DOMContentLoaded', function () {
  function getData() {
    fetch('http://localhost:3000/datesReceita/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar a data do servidor');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('data').value = data.data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

  document.getElementById('form-data').addEventListener('submit', function (event) {
    event.preventDefault();
    var inputData = document.getElementById('data').value;
    saveData(inputData);
  });
getData()
});

// Função para salvar o texto no JSON Server
function salvarMetas() {
  const textarea = document.getElementById('exampleFormControlTextarea1');
  const novoTexto = textarea.value;

  const dadosAtualizados = {
    metas: novoTexto
  };

  fetch('http://localhost:3000/metas/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosAtualizados)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Metas atualizadas:', data);
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}

document.getElementById('salvarmeta').addEventListener('click', salvarMetas);

window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/metas/1')
    .then(response => response.json())
    .then(data => {
      const textarea = document.getElementById('exampleFormControlTextarea1');
      textarea.value = data.metas;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
});

//Dark Mode
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart(getCategoriesToChart(produtos)));
}

// usuário logado
let nomeUsuario = localStorage.getItem('usuario_logado');
    
var tagA = document.getElementById("nome");
tagA.innerHTML = `${nomeUsuario}`; 
