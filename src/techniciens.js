// Gestion des techniciens : ajout, sauvegarde et affichage
(function () {
    const CLE = 'techniciens';
    const form = document.getElementById('form-technicien');
    const liste = document.getElementById('liste-techniciens');

    function charger() {
        return JSON.parse(localStorage.getItem(CLE) || '[]');
    }

    function sauvegarder(techniciens) {
        localStorage.setItem(CLE, JSON.stringify(techniciens));
    }

    function afficher() {
        liste.innerHTML = '';
        charger().forEach(function (technicien) {
            const li = document.createElement('li');
            li.textContent = technicien.nom + ' - ' + technicien.specialite;
            liste.appendChild(li);
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const nom = document.getElementById('technicien-nom').value.trim();
        const specialite = document.getElementById('technicien-specialite').value.trim() || 'Polyvalent';

        if (!nom) {
            alert('Le nom du technicien est obligatoire.');
            return;
        }

        const techniciens = charger();
        techniciens.push({ nom: nom, specialite: specialite });
        sauvegarder(techniciens);
        form.reset();
        afficher();
    });

    afficher();
})();
