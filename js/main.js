let current_page = 1
document.addEventListener('DOMContentLoaded', () => {
    // Pour les anneaux du livre
    const rings = document.getElementById('rings');
    if (rings) {
        for (let i = 0; i < 18; i++) {
            const ring = document.createElement('div');
            ring.className = 'ring';
            rings.appendChild(ring);
        }
    }

    // Pour afficher toutes les informations du json
    if (typeof sports !== 'undefined') {
        let sport = sports[current_page]
        if(sport) {
            const sport_name = document.getElementById('sport');
            const sport_name_container = document.getElementById('container');
            if (sport_name && sport_name_container) {
                sport_name.innerHTML = sport.name;
                sport_name.style.backgroundImage = `url(${sport.image})`;
                sport_name_container.style.backgroundImage = `url(${sport.image})`;
            }

            const illustration = document.getElementById('illustration');
            if (illustration) {
                illustration.src = sport.image;
                illustration.alt = sport.alt;
            }

            const description = document.getElementById('description');
            if(description) {
                description.innerHTML = sport.description;
            }

            const gameBtn = document.getElementById('game');

            gameBtn.addEventListener('click', () => {
                const scriptPath = sport.miniJeu;

                const script = document.createElement('script');
                script.src = scriptPath;
                document.body.appendChild(script);
            });

            const resume = document.getElementById('resume');
            if (resume) {
                resume.innerHTML = sport.infos.resume;
            }

            const tips = document.getElementById('tips');
            if (tips) {
                tips.innerHTML = sport.infos.conseilsDebutant
            }

            const club = document.getElementById('club');
            if (club) {
                club.innerHTML=sport.infos.lienClub
            }

            const material = document.getElementById('material');
            if(material) {
                material.innerHTML = sport.infos.materiel
            }

            const cost = document.getElementById('cost');
            if (cost) {
                cost.innerHTML = sport.infos.cout
            }

            const benefits = document.getElementById('benefits');
            if (benefits) {
                benefits.innerHTML = sport.infos.bienfaits
            }

            const season = document.getElementById('season');
            if (season) {
                season.innerHTML = sport.infos.saisonIdeale
            }

            const badge = document.getElementById('badge');
            if(badge) {
                badge.src = sport.badge
            }
        }

    } else {
        console.error("Sports.js is not available");
    }
});


let isOpen = false;

function openBook() {
    if (isOpen)return;
    isOpen = true;
    document.getElementById('cover-title').classList.add('hidden');
    document.getElementById('img-front-page').classList.add('hidden');
}
