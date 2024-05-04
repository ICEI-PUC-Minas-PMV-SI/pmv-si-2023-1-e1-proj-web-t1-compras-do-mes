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
        var data = google.visualization.arrayToDataTable([
            ['gasto mensal', 'Speakers (in millions)'],
            ...categories    
        ]);
    
        
        var options = {
            legend: '0',
            pieSliceText: '0',
            title: 'Gastos mensais',
            pieStartAngle: 100,
            backgroundColor: { fill:'transparent' }
            
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

  // Função para salvar a data no servidor
  function saveData(data) {
    fetch('http://localhost:3000/dates/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao salvar a data no servidor');
        }
        return response.json();
      })
      .then(() => {
        alert('Data salva com sucesso!');
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar a data!');
      });
  }

  // Buscar a data quando a página carregar
  getData();

  // Adicionar evento de envio do formulário
  document.getElementById('form-data').addEventListener('submit', function (event) {
    event.preventDefault();
    var inputData = document.getElementById('data').value;
    saveData(inputData);
  });
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
}

// Calculadora

var display = document.getElementById("display");

var listenerBtn = [];

//Operator buttons
listenerBtn.push(document.getElementById("sum"));
listenerBtn.push(document.getElementById("subtraction"));
listenerBtn.push(document.getElementById("division"));
listenerBtn.push(document.getElementById("multiplication"));

//Number buttons
listenerBtn.push(document.getElementById("num0"));
listenerBtn.push(document.getElementById("num1"));
listenerBtn.push(document.getElementById("num2"));
listenerBtn.push(document.getElementById("num3"));
listenerBtn.push(document.getElementById("num4"));
listenerBtn.push(document.getElementById("num5"));
listenerBtn.push(document.getElementById("num6"));
listenerBtn.push(document.getElementById("num7"));
listenerBtn.push(document.getElementById("num8"));
listenerBtn.push(document.getElementById("num9"));

//Additional buttons
var btnResult = document.getElementById("result");
var btnCleanDisplay = document.getElementById("cleanDisplay");
var btnDeleteDigit = document.getElementById("deleteDigit");
listenerBtn.push(document.getElementById("point"));

var pointCounter = 0;
var pointLimit = 1;

for (var i = 0; i < listenerBtn.length; i++) {
  listenerBtn[i].addEventListener("click", writeOnDisplay); 
}

btnResult.onclick = function () {
  calculateResult();
};

btnDeleteDigit.onclick = function () {
  deleteLastDigit();
};

btnCleanDisplay.onclick = function () {
  display.value = "";
  pointCounter = 0;
};

function calculateResult() {
  if (verifyOperator(display.value.substring(display.value.length - 1, display.value.length))) {
    deleteLastDigit(); //If the last digit on display is an operator, it's ignored
  }

  var calculatedValue = calculateArray(display.value); 

  if (calculatedValue || calculatedValue == "0") {
    display.value = calculatedValue;
  }
}

function deleteLastDigit() {
  if (display.value.length > 0) {
    if (display.value[display.value.length - 1] === ".") {//If the deleted character is a decimal point, it can be replaced by a new one
      pointCounter = 0;
    }
    display.value = display.value.substring(0, display.value.length - 1);
  }
}

function writeOnDisplay() {
  lastDigit = this.value;

  if (verifyOperator(lastDigit)){
    pointCounter = 0;
    if (verifyOperator(display.value.substring(display.value.length - 1, display.value.length))) { //replaces the previous operator by the new operator inputed
      deleteLastDigit();
    }
  } 
    
  if (verifyDecimalPoint(lastDigit) === true){
    pointCounter++;
    if (pointCounter > pointLimit){
      return;
    }    
  } 
  display.value += lastDigit;  
}

function verifyDecimalPoint(valorDigitado) {
  if (valorDigitado === ".") {
    return true;
  } else {
    return false;
  }
}

function verifyOperator(operatorValue) {
  switch (operatorValue) {
    case "*":
      return true;
    case "/":
      return true;
    case "+":
      return true;
    case "-":
      return true;
    default:
      return false;
  }
}

function calculateArray(exp) {
  exp = exp.toString().split("+");
  for (a = 0; a < exp.length; a++) {
    exp[a] = exp[a].split("-");
    for (b = 0; b < exp[a].length; b++) {
      exp[a][b] = exp[a][b].split("*");
      for (c = 0; c < exp[a][b].length; c++) {
        exp[a][b][c] = exp[a][b][c].split("/");
        exp[a][b][c] = divideArray(exp[a][b][c]);
      }
      exp[a][b] = multiplyArray(exp[a][b]);
    }
    exp[a] = subtractArray(exp[a]);
  }
  exp = sumArray(exp);

  return exp;
}

function multiplyArray(parameter) {
  var resultMult = 1;
  for (var x = 0; x < parameter.length; x++) {
    resultMult *= parameter[x];
  }
  return resultMult;
}

function divideArray(parameter) {
  var resultDiv = parameter[0];
  for (var x = 1; x < parameter.length; x++) {
    resultDiv /= parameter[x];
  }
  return resultDiv;
}

function subtractArray(parameter) {
  var resultSub = parameter[0];
  for (var x = 1; x < parameter.length; x++) {
    resultSub -= parameter[x];
  }
  return resultSub;
}

function sumArray(parameter) {
  var resultSum = 0;
  for (var x = 0; x < parameter.length; x++) {
    resultSum += parameter[x];
  }
  return resultSum;
}

// Modal Calculadora

var modal = document.getElementById("modalCalc");
var btn = document.getElementById("abrirModalCalc");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// DOLAR

function obterCotacaoDolar() {
  const urlDolar = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';
  
  fetch(urlDolar)
    .then(response => response.json())
    .then(data => {
      // Extraia a cotação do dólar dos dados retornados pela API
      const cotacaoDolar = data.USDBRL.bid;
      let numeroDecimal = parseFloat(cotacaoDolar)
      // Atualize o elemento HTML com a cotação do dólar
      document.getElementById('cotacao-dolar').textContent = `R$ ${numeroDecimal.toFixed(2)}`;
    })
    .catch(error => {
      console.log('Erro ao obter a cotação do dólar:', error);
    });
}

// Chama a função ao carregar a página
obterCotacaoDolar();

// Atualiza a cotação a cada 5 minutos (300000 milissegundos)
setInterval(obterCotacaoDolar, 300000);

// Chama a função ao carregar a página
obterCotacaoDolar();

// Atualiza a cotação a cada 5 minutos (300000 milissegundos)
setInterval(obterCotacaoDolar, 300000);