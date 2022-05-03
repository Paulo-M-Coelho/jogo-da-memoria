const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

//let recordContent = null

startGame();


function startGame() {

    initializeCards(game.createCardsFromTechs()); //essa função vai pegar o modelo das cartas e trasformar em algo visual//

}

function initializeCards(cards) {
    let tabuleiro = document.getElementById('tabuleiro')
    tabuleiro.innerHTML = '';

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        criateCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        tabuleiro.appendChild(cardElement);

    })
    recordContent = localStorage.getItem('record') //essa parte do codigo verifica o record salvo e coloca no placar do record
    if(recordContent){ document.getElementById('placRecorde').innerHTML = recordContent}
   
}


function criateCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/imagens/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace);
}


function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip") * 3
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("game-over");
                    gameOverLayer.style.display = 'flex';

                    let movimentos = document.getElementById('movimentos').innerHTML; //aq é verificado se os movimentos atuais são menores q o record salvo, se for menor ele salva no record
                    if(movimentos < recordContent || !recordContent){
                        localStorage.setItem('record', movimentos)
                    }
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards()
                }, 1000);
            }
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("game-over");
    gameOverLayer.style.display = 'none';
    this.movimentos.innerHTML = "0" // aqui zera o placar de movimentos do jogo 

    
}

