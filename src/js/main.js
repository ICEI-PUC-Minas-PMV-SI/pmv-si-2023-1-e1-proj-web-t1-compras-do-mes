// URL DA API DE DADOS
URL = 'http://localhost:3000/produtos'

function getCategoriesToChart(products) {
    const categorias = {};

    // Calculando o valor total por categoria
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
      // Verifica se o dark mode está ativo
      const darkMode = document.body.classList.contains('dark-mode');

      // Define as cores baseadas no modo
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
              1: { color: '#dc3912' }, // Configure as cores conforme necessário
              // Adicione mais cores de fatias se tiver muitas categorias
          }
      };
  
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
  }

  return callback;
}

//=================================================================================================
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
//=================================================================================================

//Valor Total Lista

  fetch('http://localhost:3000/produtos')
  .then(response => response.json())
  .then(data => {
    let valorTotal = 0;

    data.forEach(produto => {
      const valor = parseFloat(produto.vlr);
      const quantidade = parseInt(produto.qtd);
      valorTotal += valor * quantidade;
      
    });

  totalVLR = `${valorTotal}`;

  document.getElementById('valor-total').innerHTML = totalVLR;
  });

// usuário logado
    let nomeUsuario = localStorage.getItem('usuario_logado');
    
    var tagA = document.getElementById("nome");
    tagA.innerHTML = `${nomeUsuario}`; 
    
// Valor total Categoroias

fetch('http://localhost:3000/produtos')
  .then(response => response.json())
  .then(data => {
    const categorias = {};

    // Calculando o valor total por categoria
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

    // Exibindo os totais por categoria
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
//=================================================================================================

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

//=================================================================================================

// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM PRODUTO

const produtoForm = document.getElementById('produto-form');

produtoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento padrão da página

    // RECUPERA O ID DO PRODUTO
    let id = parseInt($('#edit-prod-id').text());

    // RECUPERA OS DADOS DO PRODUTO
    const produto = JSON.stringify({
        id: document.getElementById('produto-id').value,
        categoria: document.getElementById('produto-categoria').value,
        nome: document.getElementById('produto-nome').value,
        vlr: document.getElementById('produto-vlr').value,
        qtd: document.getElementById('produto-qtd').value
    });

    if (id >= 0) {
        fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: produto
        })
        .then(res => res.json())
        .then(() => {
            updateDate(); // Atualiza os dados na página
            location.reload(); // Recarrega a página se for realmente necessário
        });
    }
    else { 
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: produto
        })
        .then(res => res.json())
        .then(() => {
            updateDate(); // Atualiza os dados na página
            location.reload(); // Recarrega a página se for realmente necessário
        });
    }      
});
//=================================================================================================

function updateDate() {
  const currentDate = new Date().toISOString().slice(0, 10).toLocaleString(
    'pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day:'2-digit'
    }
  )

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

/* salvar data*/
document.addEventListener('DOMContentLoaded', function () {
  // Função para buscar a data do servidor
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

  // Adicionar evento de envio do formulário
  document.getElementById('form-data').addEventListener('submit', function (event) {
    event.preventDefault();
    var inputData = document.getElementById('data').value;
    saveData(inputData);
  });

getData()

});


// Definir orçamento

function gravarJSON() {
  const inputOrcamento = document.getElementById('orcamento-definido');
  const novoOrcamento = inputOrcamento.value;

  const dadosAtualizados = {
    orcamento: novoOrcamento
  };

  fetch('http://localhost:3000/orcamentos/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosAtualizados)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Orçamento atualizado:', data);
    const elementoOrcamento = document.getElementById('orcamento-valor');
    elementoOrcamento.textContent = data.orcamento;
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });

  inputOrcamento.value = '';
}

window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/orcamentos/1')
    .then(response => response.json())
    .then(data => {
      const elementoOrcamento = document.getElementById('orcamento-valor');
      elementoOrcamento.textContent = data.orcamento;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
});

//Valor Excedido

window.onload = function vlrExcedido() {
  fetch('http://localhost:3000/produtos')
    .then(response => response.json())
    .then(data => {
      let vlrTotal = 0;

      data.forEach(produto => {
        const valor = parseFloat(produto.vlr);
        const quantidade = parseInt(produto.qtd);
        vlrTotal += valor * quantidade;
      });

      fetch('http://localhost:3000/orcamentos/1')
        .then(response => response.json())
        .then(data => {
          const vlrOrcamento = parseInt(data.orcamento);
          const valorExcedido = vlrOrcamento - vlrTotal;

          if (valorExcedido < 0) {
            document.getElementById('valor-excedido').textContent = valorExcedido.toFixed(2);
            alert('Cuidado! Você gastou mais do que havia planejado!');
          } else {
            document.getElementById('valor-excedido').textContent = 0;
          }
        })
        .catch(error => {
          console.error('Erro na requisição do orçamento:', error);
        });
    })
    .catch(error => {
      console.error('Erro na requisição dos produtos:', error);
    });
}

// Função para salvar o texto no JSON Server
function salvarMetas(event) {
  if (event.keyCode === 13) {
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
}

//  salvar o texto quando pressionar Enter
document.getElementById('exampleFormControlTextarea1').addEventListener('keyup', salvarMetas);

// Função para exibir as metas ao carregar a página
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
