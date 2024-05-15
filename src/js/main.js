// URL DA API DE DADOS
URL = 'http://localhost:3000/produtos'

// usuário logado
let nomeUsuario = localStorage.getItem('usuario_logado');
var tagA = document.getElementById("nome");
tagA.innerHTML = `${nomeUsuario}`;

//Function Google Chart
function getCategoriesToChart(products) {
    const categorias = {};
    
// buscando valor por categoria
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
fetch(URL)
    .then(res => res.json())
    .then(produtos => {
        let lista_produtos = '';
        for (let i = 0; i < produtos.length; i++) {
            vlt_total = produtos[i].qtd * produtos[i].vlr;
            lista_produtos += `
            <tr>
                <th>${produtos[i].id}</th>
                <td>${produtos[i].categoria}</td>
                <td>${produtos[i].nome}</td>
                <td>R$${(parseFloat(produtos[i].vlr)).toFixed(2)}</td>
                <td>${produtos[i].qtd}</td>
                <td>R$${parseFloat(vlt_total).toFixed(2)}</td>
                <td>
                    <a onclick="getProduto(${produtos[i].id});" 
                    class="btn btn-warning btn-sm" 
                    data-toggle="modal" data-target="#produto-modal">
                    <i class="fa fa-edit"></i>  Editar
                    </a>

                    <a onclick="$('#id-prod').text(${produtos[i].id});" class="btn btn-danger btn-sm" 
                    data-toggle="modal" data-target="#modal-delete">
                    <i class="fa fa-trash"></i> Remover
                    </a>
                </td>
            </tr>
            `;
            produtoList.innerHTML = lista_produtos;
        }

        // FUNCTION GRÁFICOS
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart(getCategoriesToChart(produtos)));
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

// Função para calcular o valor excedido
function calcularValorExcedido() {
  const valorExcedido = valorTotalReceita - valorTotalGasto;

  if (valorExcedido < 0) {
    document.getElementById('valor-excedido').textContent = formatarMoeda(valorExcedido);
    alert('Cuidado! Você gastou mais do que havia planejado!');
  } else {
    document.getElementById('valor-excedido').textContent = formatarMoeda(0);
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
    document.getElementById('valor-total').innerHTML = formatarMoeda(valorTotalGasto);
  });

// Executar os cálculos após ambas as fetch serem completadas
Promise.all([fetchReceitas, fetchProdutos]).then(() => {
  calcularValorExcedido();
});

// Valor total Categoroias
fetch('http://localhost:3000/produtos')
  .then(response => response.json())
  .then(data => {
    const categorias = {};
    data.forEach(produto => {
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

    for (const categoria in categorias) {
      console.log(`Categoria: ${categoria} - Total: ${categorias[categoria]}`);
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });


// DELETE - PROCEDIMENTO PARA EXCLUIR UM PRODUTO
const produtoDelete = document.getElementById('btn-delete');

produtoDelete.addEventListener('click', (e) => {

    let id = $('#id-prod').text();

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload());
    updateDate();
    

})

// PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM PRODUTO NA API
function getProduto(id){

    if(id == 0){
        $('#edit-prod-id').text("");
        $( "#produto-id" ).prop( "disabled", false );
        $('#produto-id').val("");
        $('#produto-categoria').val("");
        $('#produto-nome').val("");
        $('#produto-vlr').val("");
        $('#produto-qtd').val("");
    }else{
        $('#edit-prod-id').text(id);
        fetch(`${URL}/${id}`).then(res => res.json())    
        .then(data => {
            $( "#produto-id" ).prop( "disabled", true );
            $('#produto-id').val(data.id);
            $('#produto-categoria').val(data.categoria);
            $('#produto-nome').val(data.nome);
            $('#produto-vlr').val(data.vlr);
            $('#produto-qtd').val(data.qtd);
        });
    }    
}

// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM PRODUTO
const produtoForm = document.getElementById('produto-form');

produtoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = $('#edit-prod-id').text();
    
    if (id) {
        const produto = JSON.stringify({
            id: id,
            categoria: document.getElementById('produto-categoria').value,
            nome: document.getElementById('produto-nome').value,
            vlr: document.getElementById('produto-vlr').value,
            qtd: document.getElementById('produto-qtd').value
        });
        
        fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: produto
        })
        .then(res => res.json())
        .then(() => {
            updateDate();
            location.reload();
        });
    }
    else { 
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const lastId = data.length > 0 ? parseInt(data[data.length - 1].id) : 0;
            const newId = (lastId + 1).toString();
            
            const produto = JSON.stringify({
                id: newId,
                categoria: document.getElementById('produto-categoria').value,
                nome: document.getElementById('produto-nome').value,
                vlr: document.getElementById('produto-vlr').value,
                qtd: document.getElementById('produto-qtd').value
            });
            
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: produto
            })
            .then(res => res.json())
            .then(() => {
                updateDate();
                location.reload();
            });
        });
    }      
});

// Atualizar Data
function updateDate() {
  const currentDate = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).split('/').reverse().join('-');

  fetch('http://localhost:3000/dates/1', {
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

// Salvar Data
document.addEventListener('DOMContentLoaded', function () {
  function getData() {
    fetch('http://localhost:3000/dates/1')
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

  getData();
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
}

