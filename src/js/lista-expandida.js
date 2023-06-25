
    // Função para salvar os dados no localStorage
    function saveExpenseData(event) {
      event.preventDefault();

      var expenseData = {
        category1: {
          name: document.getElementById('category1').value,
          spent: document.getElementById('spent1').value,
          target: document.getElementById('target1').value
        },
        category2: {
          name: document.getElementById('category2').value,
          spent: document.getElementById('spent2').value,
          target: document.getElementById('target2').value
        },
        category3: {
          name: document.getElementById('category3').value,
          spent: document.getElementById('spent3').value,
          target: document.getElementById('target3').value
        }
      };

      localStorage.setItem('expenseData', JSON.stringify(expenseData));
      alert('Dados de gastos salvos com sucesso!');
    }

    // Verificar se existem dados de gastos salvos e preencher o formulário
    function populateExpenseForm() 