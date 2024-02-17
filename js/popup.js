function abrirPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
}


window.onload = function() {
    abrirPopup();
};