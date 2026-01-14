pct = document.getElementById('pct');
facture = document.getElementById('facture');
submitBtn = document.querySelector('.submit-btn');
paragraph = document.querySelector('.tips-shower');

submitBtn.addEventListener('click', () => {

    if (pct.value && facture.value) {
        const tips = parseFloat(pct.value) * parseFloat(facture.value);
        paragraph.style.color = 'green';
        paragraph.textContent = `Votre pourboire est de ${tips} $.`;
    } else {
        paragraph.style.color = 'red';
        paragraph.textContent = `Veuillez saisir ci-dessus le pourcentage de pouboire et votre facture.`;
    }
})