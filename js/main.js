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
    updateSportDisplay(current_sport);

});

let isOpen = false;


//Couverture et 4eme de couverture
const cover = document.getElementById('cover');
cover.addEventListener('click', () => {
    if (current_page === 0) {
        cover.classList.add('flipping-forward');
        setTimeout(() => {
            current_page++;
            page.classList.remove('hidden');
        }, 150);
    } else if (current_page === 1) {
        cover.classList.remove('flipping-forward');
        setTimeout(() => {
            current_page--;
            page.classList.add('hidden');
        }, 350);
    }
});

const lastCover = document.getElementById('lastCover');
lastCover.addEventListener('click', () => {
    console.log(current_page)
    if (current_page === number_of_sports + 1) {
        lastCover.classList.add('flipping-forward');
        setTimeout(() => {
            current_page++;
            page.classList.add('hidden');
            lastCover.style.zIndex = 1;
        }, 350);
    } else if (current_page === number_of_sports + 2) {
        setTimeout(() => {
            current_page--;
            page.classList.remove('hidden');
            lastCover.style.zIndex = -10;
        }, 150);
        lastCover.classList.remove('flipping-forward');
    } else {
        console.log(current_page)
        current_page++;
    }
});

//Page de connexion TODO: Factoriser pour toutes les pages
const page = document.getElementById('page0');
let right_page;
page.addEventListener('click', (e) => {
    if (!is_connected) {
        alert("Connexion obligatoire pour aller à la page suivante.");
    } else if (is_connected && current_page === 1) {
        page.classList.add('flipping-forward');
        right_page = pageCreation();
        console.log(right_page);
        right_page.classList.remove('hidden');
        updateSportDisplay(current_sport);
        setTimeout(() => {
            page.style.right = "35px";
            current_page++;
        }, 150)
    } else if (current_page === 2) {
        page.classList.remove('flipping-forward');
        setTimeout(() => {
            page.style.right = "23px";
            current_page--;
            book.removeChild(right_page);
        }, 350)
        updateSportDisplay(current_sport);
    }
})

const form = document.getElementById('connexionForm');
form.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Création de la page
function pageCreation() {
    let newPage = document.createElement("div");
    newPage.classList.add('page');
    newPage.classList.add('hidden');
    newPage.id = `page${current_sport+1}`; // TODO : Attention au numéro de la page

    // Front
    let newFront = document.createElement('div');
    newFront.classList.add('front');
    newFront.classList.add('face');
    newPage.appendChild(newFront);

    let newGameDone = document.createElement('div');
    newGameDone.classList.add('game-not-done');
    newGameDone.id = `game-not-done${current_sport}`;
    newGameDone.innerHTML = "Déverrouillez les informations en jouant au mini-jeu !";
    newFront.appendChild(newGameDone);

    let newInfoContainer = document.createElement('div');
    newInfoContainer.classList.add('informations-container');
    newFront.appendChild(newInfoContainer);

    let newConfidential = document.createElement('div');
    newConfidential.classList.add('confidential');
    newConfidential.id = `confidential${current_sport}`;
    newInfoContainer.appendChild(newConfidential);

    let newInfo = document.createElement('div');
    newInfo.classList.add('informations');
    newInfoContainer.appendChild(newInfo);

    let newResume = document.createElement('div');
    newResume.classList.add('resume');
    newResume.id = `resume${current_sport}`;
    newInfo.appendChild(newResume);

    let newSeason = document.createElement('div');
    newSeason.classList.add('season');
    newSeason.id = `season${current_sport}`;
    newInfo.appendChild(newSeason);

    let newH4Cost = document.createElement('h4');
    newH4Cost.innerHTML = "Coût de la pratique";
    newInfo.appendChild(newH4Cost);

    let newCost = document.createElement('div');
    newCost.classList.add('cost');
    newCost.id = `cost${current_sport}`;
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
    newMaterial.id = `material${current_sport}`;
    newMaterialContainer.appendChild(newMaterial);

    let newBenefitsContainer = document.createElement('div');
    newBenefitsContainer.classList.add('benefits-container');
    newMaterialBenefits.appendChild(newBenefitsContainer);

    let newH4Benefits = document.createElement('h4');
    newH4Benefits.innerHTML = "Bienfaits";
    newBenefitsContainer.appendChild(newH4Benefits);

    let newBenefits = document.createElement('div');
    newBenefits.classList.add('benefits');
    newBenefits.id = `benefits${current_sport}`;
    newBenefitsContainer.appendChild(newBenefits);

    let newH4Tips = document.createElement('h4');
    newH4Tips.innerHTML = "Conseils";
    newInfo.appendChild(newH4Tips);

    let newTips = document.createElement('div');
    newTips.classList.add('tips');
    newTips.id = `tips${current_sport}`;
    newInfo.appendChild(newTips);

    let newClubLink = document.createElement('div');
    newClubLink.classList.add('club-link');
    newClubLink.id = `club${current_sport}`;

    // Back
    let newBack = document.createElement('div');
    newBack.classList.add('back');
    newBack.classList.add('face');
    newPage.appendChild(newBack);

    let newContainer = document.createElement('div');
    newContainer.classList.add('sport-container');
    newBack.appendChild(newContainer);

    let newSportNameContainer = document.createElement('div');
    newSportNameContainer.classList.add('sport-name-container');
    newSportNameContainer.id = `container${current_sport+1}`;
    newContainer.appendChild(newSportNameContainer);

    let newSportName = document.createElement('div');
    newSportName.classList.add('sport-name');
    newSportName.id = `sport${current_sport+1}`;
    newSportNameContainer.appendChild(newSportName);

    let newDescription = document.createElement('div');
    newDescription.classList.add('description');
    newDescription.id = `description${current_sport+1}`;
    newContainer.appendChild(newDescription);

    let newBadge = document.createElement('img');
    newBadge.classList.add('badge');
    newBadge.id = `badge${current_sport+1}`;
    // TODO: Voir pour src
    newContainer.appendChild(newBadge);

    let newButton = document.createElement('button');
    newButton.classList.add('game-btn');
    newButton.id = `game${current_sport+1}`;
    newButton.innerHTML = "Lancer le mini jeu"
    newContainer.appendChild(newButton);

    book.appendChild(newPage);

    return newPage;

}



// // <div className="page-wrapper right hidden" id="rightPage">-->
// <!--                <div class="page-face front right-page sport-page ">-->
// <!--                    <div class="game-not-done" id="game-not-done">Déverrouillez les informations en jouant au mini-jeu !</div>-->
//
// <!--                    <div class="informations-container">-->
// <!--                        <div class="confidential hidden" id="confidential"></div>-->
// <!--                        <div class="informations">-->
// <!--                            <div class="resume" id = "resume"></div>-->
//
// <!--                            <div class="season" id="season"></div>-->
//
// <!--                            <h4>Coût de la pratique</h4>-->
// <!--                            <div class="cost" id="cost"></div>-->
//
// <!--                            <div class="material-benefits">-->
// <!--                                <div class="material-container">-->
// <!--                                    <h4>Matériel nécessaire</h4>-->
// <!--                                    <div class="material" id="material"></div>-->
// <!--                                </div>-->
//
// <!--                                <div class="benefits-container">-->
// <!--                                    <h4>Bienfaits</h4>-->
// <!--                                    <div class="benefits" id="benefits"></div>-->
// <!--                                </div>-->
// <!--                            </div>-->
//
//
// <!--                            <h4>Conseils</h4>-->
// <!--                            <div class="tips" id = "tips"></div>-->
//
// <!--                            <div class="club-link" id="club">Si tu veux plus <b>d'informations</b> pour pratiquer rends-toi sur ce(s) lien(s) : </div>-->
//
// <!--                        </div>-->
//
// <!--                    </div>-->
// <!--                </div>-->
// <!--            </div>-->


