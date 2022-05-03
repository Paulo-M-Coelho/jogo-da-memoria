let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {


        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        } if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;

            function atualizarPlacar() {

                let movimentos = document.getElementById("movimentos"); //aqui é a ação que faz o placar de movimentos ir almentando a cada jogada
                movimentos.innerHTML = parseInt(movimentos.innerText) + 1;

            }

            atualizarPlacar();

            return true

        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;

        }

    },





    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon;

    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards()
    },


    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,


    createCardsFromTechs: function () { //essa função cria as cartas//

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech))
        })

        this.cards = this.cards.flatMap(pair => pair); //aqui o flatMap separa os arrays e coloca cada um como um item individual separando do array oryginal que estavam os pares juntos no msm array// 
        this.shuffleCards();
        return this.cards
    },

    //essa função esta criando um par para cada carta que já vem com um id aleatorio//
    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        },
        {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },

    //essa função está criando o id aleatorio para cada carta//
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },


    shuffleCards: function (cards) { //essa função embaralha as cartas//
        let currentIndex = this.cards.length;  //index atual vai começar com o ultimo elemento do index//
        let randomIndex = 0;

        while (currentIndex !== 0) {  //quando currentIndex for diferente de 0//
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}