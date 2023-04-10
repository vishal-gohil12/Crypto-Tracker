const endpoint = 'https://api.coingecko.com/api/v3';

// Fetch top 50 cryptocurrencies
fetch(`${endpoint}/coins/markets?vs_currency=usd&per_page=50`)
  .then(response => response.json())
  .then(data => {
    const cryptoList = document.getElementById('crypto-list');

    data.forEach(crypto => {
      const cryptoName = crypto.name;
      const cryptoSymbol = crypto.symbol.toUpperCase();
      const cryptoId = crypto.id;
      const cryptoImage = crypto.image;

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div>
          <img src="${cryptoImage}" alt="${cryptoName}" width="32" height="32">
          <span>${cryptoName} (${cryptoSymbol}) - <span id="${cryptoId}-price"></span></span>
          <p>Rank: ${crypto.market_cap_rank}</p>
          <p>Price: $${crypto.current_price}</p>
          <p>Volume: $${crypto.total_volume.toLocaleString()}</p>
        </div>
        <canvas id="${cryptoId}-chart" width="400" height="200"></canvas>
      `;
      
      cryptoList.appendChild(listItem);

      // Fetch historical price data for each coin
      fetch(`${endpoint}/coins/${cryptoId}/market_chart?vs_currency=usd&days=7&interval=daily`)
        .then(response => response.json())
        .then(data => {
          const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
          const prices = data.prices.map(price => price[1]);

          // Chart.js
          const ctx = document.getElementById(`${cryptoId}-chart`).getContext('2d');
          const chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Price (USD)',
                  data: prices,
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                }
              ]
            },
            options: {}
          });
        })
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error));




// Get the login page button
var loginPageBtn = document.getElementById("loginPageBtn");

// When the user clicks on the button, go to the login page
loginPageBtn.onclick = function() {
  window.location.href = "login.html";
}
