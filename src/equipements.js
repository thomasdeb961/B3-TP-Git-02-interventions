// Gestion des équipements : ajout, sauvegarde et affichage
(function () {
    const CLE = 'equipements';
    const form = document.getElementById('form-equipement');
    const liste = document.getElementById('liste-equipements');

    function charger() {
        return JSON.parse(localStorage.getItem(CLE) || '[]');
    }

    function sauvegarder(equipements) {
        localStorage.setItem(CLE, JSON.stringify(equipements));
    }

    function afficher() {
        liste.innerHTML = '';
        charger().forEach(function (equipement) {
            const li = document.createElement('li');
            li.textContent = equipement.nom + ' (' + equipement.reference + ') - ' + equipement.type;
            liste.appendChild(li);
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const nom = document.getElementById('equipement-nom').value.trim();
        const reference = document.getElementById('equipement-reference').value.trim();
        const type = document.getElementById('equipement-type').value.trim() || 'Non précisé';

        if (!nom || !reference) {
            alert('Le nom et la référence sont obligatoires.');
            return;
        }

        const equipements = charger();
        equipements.push({ nom: nom, reference: reference, type: type });
        sauvegarder(equipements);
        form.reset();
        afficher();
    });

    afficher();
})();
