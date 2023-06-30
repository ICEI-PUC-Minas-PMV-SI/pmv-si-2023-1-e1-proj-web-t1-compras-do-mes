// URL DA API DE DADOS
URL = 'http://localhost:3000/produtos'
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
    });
//=================================================================================================

//Valor Total Lista

function vlrTotal(){
    fetch(URL)
  .then(response => response.json())
  .then(data => {
    let valorTotal = 0;

    data.forEach(produto => {
      const valor = parseFloat(produto.vlr);
      const quantidade = parseInt(produto.qtd);
      valorTotal += valor * quantidade;
    });

    document.getElementById('valor-total').innerHTML = `R$${valorTotal} `;
 

    totalVLR = `<p>$${valorTotal}</p>`;
  })
  document.getElementById('valor-total').innerHTML = totalVLR;
}

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

// FUNCTION GRÁFICOS

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

  function drawChart() {    
    var data = google.visualization.arrayToDataTable([
      ['gasto mensal', 'Speakers (in millions)'],
      ['Habitação',  4.85],
      ['Alimentação',  1.4],
      ['Lazer', 0.4],
      ['Saúde', 0.3],
      ['Transporte', 0.3],
      ['Diversos', 0.2]
    
    ]);

  var options = {
    legend: '0',
    pieSliceText: '0',
    title: 'Gastos mensais (padrão brasileiro)',
    pieStartAngle: 100,
  };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

//=================================================================================================

// DELETE - PROCEDIMENTO PARA EXCLUIR UM PRODUTO
const produtoDelete = document.getElementById('btn-delete');

produtoDelete.addEventListener('click', (e) => {

    let id = $('#id-prod').text();

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload());

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

    // RECUPERA O ID DO PRODUTO
    let id = parseInt($('#edit-prod-id').text());    

    // RECUPERA OS DADOS DO PRODUTO
    const produto = JSON.stringify({
        id: document.getElementById('produto-id').value,
        categoria: document.getElementById('produto-categoria').value,
        nome: document.getElementById('produto-nome').value,
        vlr: document.getElementById('produto-vlr').value,
        qtd: document.getElementById('produto-qtd').value
    })

    if (id >= 0) {
        fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: produto
        })
        .then(res => res.json())
        .then(() => location.reload());  
    }
    else{ 
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: produto
        })
        .then(res => res.json())
        .then(() => location.reload());  
    }      
})
//=================================================================================================

/*
// Função para calcular a soma dos números no JSON 
function calcularSoma(json) { let soma = 0; // Verifica se o JSON possui a chave "numeros" e se é uma lista 
if (json.hasOwnProperty("numeros") && Array.isArray(json.numeros)) { // Percorre a lista de números e realiza a soma 
    json.numeros.forEach(numero => { soma += numero; }); } return soma; } // Chamada da função para calcular a soma dos números no JSON 
    const somaTotal = calcularSoma(json); console.log("A soma total é:", somaTotal);
*/
function vlrTotal(){
}

/* salvar data*/
$(document).ready(function() {
    $('#form-data').submit(function(event) {
      event.preventDefault();
      
      var inputData = $('#data').val();
      var jsonData = {
        data: inputData
      };
      
      $.ajax({
        url: 'http://localhost:3000/salvar-data',
        type: 'POST',
        data: jsonData,
        success: function(response) {
          console.log(response);
          alert('Data salva com sucesso!');
        },
        error: function(error) {
          console.log(error);
          alert('Erro ao salvar a data!');
        }
      });
    });
  });

// Gráfico