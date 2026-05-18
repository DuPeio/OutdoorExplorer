let current_page = 0;
let current_sport = 0;
let is_connected = true;
const number_of_sports = sports.length;
const book = document.getElementById('book');

function updateSportDisplay(idSport) {
    if (typeof sports !== 'undefined') {
        let sport = sports[idSport]

        if (sport) {
            // Tout les éléments nécessaires
            const sport_name = document.getElementById(`sport${idSport}`);
            const sport_name_container = document.getElementById(`container${idSport}`);
            const description = document.getElementById(`description${idSport}`);
            const gameBtn = document.getElementById(`game${idSport}`);
            const resume = document.getElementById(`resume${idSport}`);
            const tips = document.getElementById(`tips${idSport}`);
            const club = document.getElementById(`club${idSport}`);
            const material = document.getElementById(`material${idSport}`);
            const cost = document.getElementById(`cost${idSport}`);
            const benefits = document.getElementById(`benefits${idSport}`);
            const season = document.getElementById(`season${idSport}`);
            const badge = document.getElementById(`badge${idSport}`);

            if (sport_name && sport_name_container) {
                sport_name.innerHTML = sport.name;
                sport_name.style.backgroundImage = `url(${sport.image})`;
                sport_name_container.style.backgroundImage = `url(${sport.image})`;
            }

            sport_name_container.addEventListener('mouseover', () => {
                sport_name.style.color = '#dabe12';
                sport_name.style.fontSize = '500%';
                sport_name.style.filter = 'invert(0)';
            })

            sport_name_container.addEventListener('mouseout', () => {
                sport_name.style.color = 'transparent';
                sport_name.style.fontSize = '450%';
                sport_name.style.filter = 'invert(1)'
            })

            if (description) {
                description.innerHTML = sport.description;
            }

            gameBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const scriptPath = sport.miniJeu;

                let scriptGame = document.getElementById('gameScript')
                if (scriptGame) {
                    scriptGame.remove();
                }
                console.log("ggod")
                scriptGame = document.createElement('script');
                scriptGame.id = "gameScript";
                scriptGame.src = scriptPath;
                document.body.appendChild(scriptGame);
            });

            if (resume) {
                resume.innerHTML = sport.infos.resume;
            }


            if (tips) {
                tips.innerHTML = sport.infos.conseilsDebutant
            }

            if (club) {
                club.innerHTML = "Si tu veux plus <b>d'informations</b> pour pratiquer rends-toi sur ce(s) lien(s) : ";
                if (sport.infos.lienClub.length > 1) {
                    const newUl = document.createElement('ul');
                    club.appendChild(newUl);

                    for (let link in sport.infos.lienClub) {
                        const newLi = document.createElement('li');
                        const newA = document.createElement('a');
                        newA.textContent = sport.infos.lienClub[link];
                        newA.href = sport.infos.lienClub[link];
                        newA.target = "_blank";
                        newLi.appendChild(newA);
                        newUl.appendChild(newLi);
                    }
                } else {
                    const newA = document.createElement('a');
                    newA.innerHTML = sport.infos.lienClub[0];
                    newA.href = sport.infos.lienClub[0];
                    club.appendChild(newA);
                }
            }

            if (material) {
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
            if (badge) {
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

    for(let i=1; i<number_of_sports+1; i++){
        pageCreation(i);
    }

    for(let i=0; i<number_of_sports; i++){
        updateSportDisplay(i);
    }

});

book.addEventListener('click', (e) => {
    const clickablePage = e.target.closest('.page, .cover');

    if (!clickablePage || e.target.closest('form') || e.target.closest('button')) {
        return;
    }

    handlePageFlip(clickablePage);
});

function handlePageFlip(element) {
    const isFlipped = element.classList.contains('flipping-forward');

    if (!isFlipped) {
    //     Cas particuliers (ne pas tourner)
    //     4eme de couverture
        if(element.id === 'lastCover' && current_page !== number_of_sports+1){
            return;
        }
    //     Page de connexion
        else if (element.id === 'page0' && !is_connected) {
            alert("Connexion obligatoire pour aller à la page suivante.");
            return;
        }

        // Cas classiques (tourner l'élément)
        element.classList.add('flipping-forward');



    //     Cover
        if(element.id === "cover") {
            setTimeout(()=> {
                document.getElementById('page0').classList.remove('hidden');
            },150)

        }

        // 4eme de cover
        else if(element.id === "lastCover") {
            setTimeout(() => {
                document.getElementById(`page${number_of_sports}`).classList.add('hidden');
                element.style.zIndex=1;
            }, 350);
        }

        // Page de connexion
        else if(element.id === 'page0') {

            current_page++;
            setTimeout(() => {
                element.style.right="35px";
                document.getElementById('page1').classList.remove('hidden');
            }, 150)
        }

    //     Pages
        else {
            current_page++;
            setTimeout(() => {
                element.style.right="35px";
                document.getElementById(`page${current_page - 2}`).classList.add('hidden');

            }, 350);

            if(current_page <= number_of_sports){
                setTimeout(() => {
                    document.getElementById(`page${current_page}`).classList.remove('hidden');
                }, 150);
            }

        }
    }

    else{
        // Cas particuliers (ne pas tourner)
        // Cover
        if(element.id === 'cover' && current_page !== 0){
            return;
        }

        // Cas classiques (on peut tourner)
        element.classList.remove('flipping-forward');

        //     Couverture
        if(element.id === 'cover') {
            setTimeout(()=> {
                document.getElementById('page0').classList.add('hidden');
            }, 350)
        }

        //     4eme de couverture
        else if (element.id === 'lastCover') {
            setTimeout(() => {
                document.getElementById(`page${number_of_sports}`).classList.remove('hidden');
                element.style.zIndex=-5;
            },150)
        }
        //     Pages
        else{

            current_page--;
            if(current_page+1 <= number_of_sports){
                setTimeout(() => {
                    element.style.right="23px";
                    document.getElementById(`page${current_page+1}`).classList.add('hidden');

                },350)
            }

            if(current_page >= 1){

                setTimeout(()=> {
                    element.style.right="23px";
                    document.getElementById(`page${current_page-1}`).classList.remove('hidden');
                }, 150)
            }

        }
    }
}

const form = document.getElementById('connexionForm');
form.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Création de la page
function pageCreation(id_page) {
    let id_sport = id_page-1;
    let newPage = document.createElement("div");
    newPage.classList.add('page');
    newPage.classList.add('hidden');
    newPage.id = `page${id_page}`; // TODO : Attention au numéro de la page

    // Front
    let newFront = document.createElement('div');
    newFront.classList.add('front');
    newFront.classList.add('face');
    newPage.appendChild(newFront);

    let newGameDone = document.createElement('div');
    newGameDone.classList.add('game-not-done');
    newGameDone.id = `game-not-done${id_sport}`;
    newGameDone.innerHTML = "Déverrouillez les informations en jouant au mini-jeu !";
    newFront.appendChild(newGameDone);

    let newInfoContainer = document.createElement('div');
    newInfoContainer.classList.add('informations-container');
    newFront.appendChild(newInfoContainer);

    let newConfidential = document.createElement('div');
    newConfidential.classList.add('confidential');
    newConfidential.id = `confidential${id_sport}`;
    newInfoContainer.appendChild(newConfidential);

    let newInfo = document.createElement('div');
    newInfo.classList.add('informations');
    newInfoContainer.appendChild(newInfo);

    let newResume = document.createElement('div');
    newResume.classList.add('resume');
    newResume.id = `resume${id_sport}`;
    newInfo.appendChild(newResume);

    let newSeason = document.createElement('div');
    newSeason.classList.add('season');
    newSeason.id = `season${id_sport}`;
    newInfo.appendChild(newSeason);

    let newH4Cost = document.createElement('h4');
    newH4Cost.innerHTML = "Coût de la pratique";
    newInfo.appendChild(newH4Cost);

    let newCost = document.createElement('div');
    newCost.classList.add('cost');
    newCost.id = `cost${id_sport}`;
    newInfo.appendChild(newCost);

    let newMaterialBenefits = document.createElement('div');
    newMaterialBenefits.classList.add('material-benefits');
    newInfo.appendChild(newMaterialBenefits);

    let newMaterialContainer = document.createElement('div');
    newMaterialContainer.classList.add('material-container');
    newMaterialBenefits.appendChild(newMaterialContainer);

    let newH4Material = document.createElement('h4');
    newH4Material.innerHTML = "Matériel nécessaire";
    newMaterialContainer.appendChild(newH4Material);

    let newMaterial = document.createElement('div');
    newMaterial.classList.add('material');
    newMaterial.id = `material${id_sport}`;
    newMaterialContainer.appendChild(newMaterial);

    let newBenefitsContainer = document.createElement('div');
    newBenefitsContainer.classList.add('benefits-container');
    newMaterialBenefits.appendChild(newBenefitsContainer);

    let newH4Benefits = document.createElement('h4');
    newH4Benefits.innerHTML = "Bienfaits";
    newBenefitsContainer.appendChild(newH4Benefits);

    let newBenefits = document.createElement('div');
    newBenefits.classList.add('benefits');
    newBenefits.id = `benefits${id_sport}`;
    newBenefitsContainer.appendChild(newBenefits);

    let newH4Tips = document.createElement('h4');
    newH4Tips.innerHTML = "Conseils";
    newInfo.appendChild(newH4Tips);

    let newTips = document.createElement('div');
    newTips.classList.add('tips');
    newTips.id = `tips${id_sport}`;
    newInfo.appendChild(newTips);

    let newClubLink = document.createElement('div');
    newClubLink.classList.add('club-link');
    newClubLink.id = `club${id_sport}`;

    // Back
        let newBack = document.createElement('div');
        newBack.classList.add('back');
        newBack.classList.add('face');
        newPage.appendChild(newBack);

    if (id_sport < number_of_sports-1){
        let newContainer = document.createElement('div');
        newContainer.classList.add('sport-container');
        newBack.appendChild(newContainer);

        let newSportNameContainer = document.createElement('div');
        newSportNameContainer.classList.add('sport-name-container');
        newSportNameContainer.id = `container${id_sport+1}`;
        newContainer.appendChild(newSportNameContainer);

        let newSportName = document.createElement('div');
        newSportName.classList.add('sport-name');
        newSportName.id = `sport${id_sport+1}`;
        newSportNameContainer.appendChild(newSportName);

        let newDescription = document.createElement('div');
        newDescription.classList.add('description');
        newDescription.id = `description${id_sport+1}`;
        newContainer.appendChild(newDescription);

        let newBadge = document.createElement('img');
        newBadge.classList.add('badge');
        newBadge.id = `badge${id_sport+1}`;
        newContainer.appendChild(newBadge);

        let newButton = document.createElement('button');
        newButton.classList.add('game-btn');
        newButton.id = `game${id_sport+1}`;
        newButton.innerHTML = "Lancer le mini jeu"
        newContainer.appendChild(newButton);
    }

    book.appendChild(newPage);

    return newPage;
}
