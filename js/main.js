let current_page = 0;
let current_sport = 0;
let is_connected = true;
let is_animating = false;
let number_of_sports = sports.length;

function updateSportDisplay(){
    if (typeof sports !== 'undefined') {
        let sport = sports[current_sport]
        if(sport) {
            // Tout les éléments nécessaires
            const sport_name = document.getElementById('sport');
            const sport_name_container = document.getElementById('container');
            const illustration = document.getElementById('illustration');
            const description = document.getElementById('description');
            const gameBtn = document.getElementById('game');
            const resume = document.getElementById('resume');
            const tips = document.getElementById('tips');
            const club = document.getElementById('club');
            const material = document.getElementById('material');
            const cost = document.getElementById('cost');
            const benefits = document.getElementById('benefits');
            const season = document.getElementById('season');
            const badge = document.getElementById('badge');

            if (sport_name && sport_name_container) {
                sport_name.innerHTML = sport.name;
                sport_name.style.backgroundImage = `url(${sport.image})`;
                sport_name_container.style.backgroundImage = `url(${sport.image})`;
            }

            sport_name_container.addEventListener('mouseover', () => {
                sport_name.style.color = '#dabe12';
                sport_name.style.fontSize = '500%';
                sport_name.style.filter='invert(0)';
            })

            sport_name_container.addEventListener('mouseout', () => {
                sport_name.style.color = 'transparent';
                sport_name.style.fontSize = '450%';
                sport_name.style.filter='invert(1)'
            })

            if (illustration) {
                illustration.src = sport.image;
                illustration.alt = sport.alt;
            }

            if(description) {
                description.innerHTML = sport.description;
            }

            gameBtn.addEventListener('click', () => {
                const scriptPath = sport.miniJeu;

                const script = document.createElement('script');
                script.src = scriptPath;
                document.body.appendChild(script);
            });

            if (resume) {
                resume.innerHTML = sport.infos.resume;
            }


            if (tips) {
                tips.innerHTML = sport.infos.conseilsDebutant
            }

            if (club) {
                club.innerHTML = "Si tu veux plus <b>d'informations</b> pour pratiquer rends-toi sur ce(s) lien(s) : ";
                if(sport.infos.lienClub.length > 1){
                    const newUl = document.createElement('ul');
                    club.appendChild(newUl);

                    for(let link in sport.infos.lienClub) {
                        const newLi = document.createElement('li');
                        const newA = document.createElement('a');
                        newA.textContent = sport.infos.lienClub[link];
                        newA.href = sport.infos.lienClub[link];
                        newA.target = "_blank";
                        newLi.appendChild(newA);
                        newUl.appendChild(newLi);
                    }
                }else{
                    const newA = document.createElement('a');
                    newA.innerHTML = sport.infos.lienClub[0];
                    newA.href = sport.infos.lienClub[0];
                    club.appendChild(newA);
                }
            }

            if(material) {
                material.innerHTML = sport.infos.materiel
            }

            if (cost) {
                cost.innerHTML = sport.infos.cout
            }

            if (benefits) {
                benefits.innerHTML = sport.infos.bienfaits
            }

            if (season) {
                season.innerHTML = sport.infos.saisonIdeale
            }

            if(badge) {
                // If réussite du mini jeu
                // badge.src = sport.badge
                // badge.title = `Woaw quel beau badge !\nRegarde les informations liées au ${sport.name}.`
                // Else
                badge.src = sport.emplacement
                badge.title = "Gagne ce badge en jouant au mini-jeu !"
            }
        }
    } else {
        console.error("Sports.js is not available");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const rings = document.getElementById('rings');
    if (rings) {
        for (let i = 0; i < 18; i++) {
            const ring = document.createElement('div');
            ring.className = 'ring';
            rings.appendChild(ring);
        }
    }
    updateSportDisplay();

});

let isOpen = false;


//Couverture et 4eme de couverture
const cover = document.getElementById('cover');
cover.addEventListener('click', ()=>{
    if(current_page === 0){
        cover.classList.add('flipping-forward');
        setTimeout(() => {
            current_page++;
            page.classList.remove('hidden');
        }, 150);
    }
    else if(current_page === 1){
        cover.classList.remove('flipping-forward');
        setTimeout(() => {
            current_page--;
            page.classList.add('hidden');
        }, 350);
    }
});

const lastCover = document.getElementById('lastCover');
lastCover.addEventListener('click', ()=>{
    console.log(current_page)
    if(current_page === number_of_sports+1){
        lastCover.classList.add('flipping-forward');
        setTimeout(() => {
            current_page++;
            page.classList.add('hidden');
            lastCover.style.zIndex = 1;
        }, 350);
    }
    else if(current_page === number_of_sports+2){
        setTimeout(() => {
            current_page--;
            page.classList.remove('hidden');
            lastCover.style.zIndex = -10;
        }, 150);
        lastCover.classList.remove('flipping-forward');
    }
    else{
        console.log(current_page)
        current_page++;
    }
});

//Page de connexion
const page = document.getElementById('page');
page.addEventListener('click', (e) => {
    if(!is_connected){
        alert("Connexion obligatoire pour aller à la page suivante.");
    }else if(is_connected && current_page === 1){
        page.classList.add('flipping-forward');
        current_page++;
        page.style.right= "35px";
        updateSportDisplay()

    }else if(current_page === 2){
        current_page--;
        page.style.right= "23px";
        page.classList.remove('flipping-forward');
        updateSportDisplay()
    }
})

const form = document.getElementById('connexionForm');
form.addEventListener('click', (e) => {
    e.stopPropagation();
});



