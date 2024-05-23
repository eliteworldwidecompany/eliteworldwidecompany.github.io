    function search(section) {
    let searchTerm;
    if (section === 1) {
        searchTerm = document.getElementById("searchTerm1").value;
        clearProducts("output1");
        clearProducts("output2");
        fetchProducts(searchTerm, "output1");
    } else if (section === 2) {
        searchTerm = document.getElementById("searchTerm2").value;
        clearProducts("output1");
        clearProducts("output2");
        fetchProducts(searchTerm, "output2");
    }
}

function clearProducts(outputId) {
    const outputDiv = document.getElementById(outputId);
    outputDiv.innerHTML = '';
}

function fetchProducts(searchTerm, outputId) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}&seller_id=306601213&limit=3`;
    const baseUrl = "https://eliteworldwidecompany.mercadoshops.com.br/";
    const outputDiv = document.getElementById(outputId);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error requesting JSON');
            }
            return response.json();
        })
        .then(data => {
            const results = data.results;
            if (results.length === 0) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.textContent = 'Produto não encontrado';
                outputDiv.appendChild(noResultsDiv);
            } else {
                results.forEach(result => {
                    const resultDiv = document.createElement('div');
                    let permalink = result.permalink;
                    let link = permalink.replace("https://produto.mercadolivre.com.br/", baseUrl);
                    let stock = result.available_quantity;
                    const firstKey = Object.keys(result.variations_data)[0];
                    const thumbnail = result.variations_data[firstKey].thumbnail;
                    if(stock <= 1){
                        const prodDiv = "<img src='"+thumbnail+"' width='60%'><h3>"+result.title+"</h3><p><b>&#x26A0; Produto Indisponível</b></p>";
                        resultDiv.classList.add('unavailable');
                        resultDiv.innerHTML = prodDiv;
                        outputDiv.appendChild(resultDiv);
                    }else{
                        const prodDiv = "<img src='"+thumbnail+"' width='60%'><h3>"+result.title+"</h3><p> R$ "+result.price+"</p><button onclick=\"window.location.href='"+link+"'\">Ver produto</button>";
                        resultDiv.classList.add('item');
                        resultDiv.innerHTML = prodDiv;
                        outputDiv.appendChild(resultDiv);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error making request:', error);
        });
}
window.addEventListener('load', () => {
    search(1); 
    search(2); 
});

function updateSearchField(value) {
    document.getElementById("searchTerm1").value = value;
    search(1);
}

