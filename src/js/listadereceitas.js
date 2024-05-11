// URL DA API DE DADOS
URL = 'http://localhost:3000/receitas'

function getCategoriesToChart(products) {
    const categorias = {};

    // Calculando o valor total por categoria
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
          title: 'Receita',
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
//=================================================================================================

//Valor Total Lista


  fetch(URL)
  .then(response => response.json())
  .then(data => {
    let valorTotal = 0;

    data.forEach(receita => {
      const valor = parseFloat(receita.vlr);
      valorTotal += valor;
      
    });

  totalVLR = `${valorTotal}`;


  
  document.getElementById('valor-total').innerHTML = totalVLR;
  });

// usuário logado
    let nomeUsuario = localStorage.getItem('usuario_logado');
    
    var tagA = document.getElementById("nome");
    tagA.innerHTML = `${nomeUsuario}`; 
    

//=================================================================================================
function updateDate() {
  const currentDate = new Date().toLocaleString(
    'pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day:'2-digit'
    }
  ).toISOString().slice(0, 10);

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
//=================================================================================================

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

//=================================================================================================

// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM PRODUTO

const receitaForm = document.getElementById('receita-form');

receitaForm.addEventListener('submit', (e) => {

    // RECUPERA O ID DO PRODUTO
    let id = parseInt($('#edit-rec-id').text());    

    // RECUPERA OS DADOS DO PRODUTO
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
        .then(() => location.reload());
        updateDate();  
    }
    else{ 
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: receita
        })
        .then(res => res.json())
        .then(() => location.reload());
        updateDate();  
    }      
})
//=================================================================================================

/* salvar data*/
document.addEventListener('DOMContentLoaded', function () {
  // Função para buscar a data do servidor
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

  // Adicionar evento de envio do formulário
  document.getElementById('form-data').addEventListener('submit', function (event) {
    event.preventDefault();
    var inputData = document.getElementById('data').value;
    saveData(inputData);
  });

getData()

});

//Valor Excedido

window.onload = function vlrExcedido() {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      let vlrTotal = 0;

      data.forEach(receita => {
        const valor = parseFloat(receita.vlr);
        const quantidade = parseInt(receita.qtd);
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
