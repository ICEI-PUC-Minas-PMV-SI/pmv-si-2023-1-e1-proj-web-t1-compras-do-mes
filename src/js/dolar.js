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