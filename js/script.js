
document.addEventListener('DOMContentLoaded', function() {
    getBitcoinPrice();
});

// Função para formatar o valor como moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Função para obter o preço do Bitcoin
function getBitcoinPrice() {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl';

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.bitcoin.brl)
        .catch(error => {
            console.error('Erro ao obter o preço do Bitcoin:', error);
            return null;
        });
}

// Evento de envio do formulário
document.getElementById('bitcoinForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const coinValue = parseFloat(document.getElementById('coin').value);

    if (isNaN(coinValue) || coinValue <= 0) {
        alert('Por favor, insira um valor válido em Real.');
        return;
    }

    const bitcoinPrice = await getBitcoinPrice();

    if (bitcoinPrice === null) {
        document.getElementById('bitcoinResult').textContent = 'Erro ao obter o preço do Bitcoin. Tente novamente mais tarde.';
        return;
    }

    const bitcoinValue = coinValue / bitcoinPrice;

    function calcularPrecoDeVenda(precoDeMercado, taxaDeTransacao, riscoDeMercado, formaDePagamento, concorrencia, custosOperacionais) {
    
    // Fatores que podem influenciar o preço de venda
    var precoFinal = precoDeMercado - (precoDeMercado*taxaDeTransacao)-(precoDeMercado*riscoDeMercado)-(precoDeMercado*formaDePagamento)-(precoDeMercado*concorrencia)-(precoDeMercado*custosOperacionais);
    return precoFinal;
    }
    
    var precoDeMercado = bitcoinValue; // Preço atual do Bitcoin
    var taxaDeTransacao = 0.02; // 2% de taxa de transação
    var riscoDeMercado = 0.01; // 1% de risco de mercado
    var formaDePagamento = 0.005; // 0.5% de custo associado à forma de pagamento
    var concorrencia = -0.005; // 0.5% de desconto devido à concorrência
    var custosOperacionais = 0.01; // 1% de custos operacionais

    var precoDeVenda = calcularPrecoDeVenda(precoDeMercado, taxaDeTransacao, riscoDeMercado, formaDePagamento, concorrencia, custosOperacionais);
    
    console.log("Preço de mercado Bitcoin: "+precoDeMercado.toFixed(8)+"\nPreço de compra do Bitcoin: " + precoDeVenda.toFixed(8)+"\nDiferença de: "+(precoDeMercado.toFixed(8)-precoDeVenda.toFixed(8)));

    document.getElementById('bitcoinResult').innerHTML = `O valor de compra é ${precoDeVenda.toFixed(8)} BTC.`;
    
    document.getElementById('contact-wp').innerHTML=`<a href="https://wa.me/5551997806982?text=Olá,%20Estou%20interessado%20em%20comprar%20uma%20quantia%20de%20R$%20${coinValue}%20em%20bitcoin.%20Podemos%20discutir%20os%20detalhes?" target="_blank" class="contact-button">Enviar proposta via WhatsApp</a><br>`;
    document.getElementById('contact-telegram').innerHTML=`<a href="https://t.me/eliteworldwidecompany?text=Olá,%20Estou%20interessado%20em%20comprar%20uma%20quantia%20de%20R$%20${coinValue}%20em%20bitcoin.%20Podemos%20discutir%20os%20detalhes?" target="_blank" class="contact-button" style="background-color: #0088CC">Enviar proposta via Telegram</a>`;
});
