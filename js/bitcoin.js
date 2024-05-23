function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function getBitcoinPrice() {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const bitcoinPrice = data.bitcoin.brl;
            const formattedPrice = formatCurrency(bitcoinPrice);
            document.querySelector('.bitcoin-price').textContent = `1 BTC = ${formattedPrice}`;
        })
        .catch(error => {
            console.error('Erro ao obter o preço do Bitcoin:', error);
            document.querySelector('.bitcoin-price').textContent = 'Erro ao obter o preço do Bitcoin';
        });
}

window.addEventListener('load', getBitcoinPrice);

setInterval(getBitcoinPrice, 300000);