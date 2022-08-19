import './game.css';

class Game {
    constructor (level) {
        this.level = level;
        this.pokechecked = 0;
        this.oportunities = 0;
        this.savedCards = [];
        this.targets = [];
    }

    init = () => {

        let cards = document.querySelectorAll('.pokecard');
        cards.forEach(element => {
            this.oportunities += 0.5
            element.addEventListener('click', (e) => {
                this.playGame(e)
            })
        })
    }

    playGame = (event) => {
        let target = event.target;
        let targetClass = target.className.slice(9, target.className.length + 1);
        let targetName = target.className.slice(11, -2);
        if(this.pokechecked === 0) {
            //show card 1
            gsap.to(`.${targetClass} .cover_card`, { duration: .5, top: '-110%' })
            //save card 1
            this.savedCards.push(targetName);
            //save target 1
            this.targets.push(target)
            this.targets[0].style.pointerEvents = 'none';
            // pokechecked = 1
            this.pokechecked = 1

            console.log("saved cards: " + this.savedCards)
            console.log("pokemon checked : " + this.pokechecked)
            console.log("targets : " + this.targets)
        } else if (this.pokechecked === 1) {
            //show card 2
            gsap.to(`.${targetClass} .cover_card`, { duration: .5, top: '-110%' })
            //save card 2
            this.savedCards.push(targetName);
            //save target 2
            this.targets.push(target)
            //compare cards
            if(this.savedCards[0] === this.savedCards[1] ||
                this.savedCards[0] + '_' === this.savedCards[1] + '_' ||
                this.savedCards[0] === this.savedCards[1] + '_' ||
                this.savedCards[0] + '_' === this.savedCards[1]) {
                //block cards
                target.style.pointerEvents = 'none';
                //oportunities =- 1
                this.oportunities -= 1;
                if(this.oportunities === 0) {
                    //if oportunities === 0
                    //win game tempalte
                    console.log('You won!!!')
                } else {
                    //else
                    //pokechecked = 0
                    this.pokechecked = 0
                }
            } else {
                // To hide needs to save both targets.
                let clss = [this.targets[0].className.slice(9, this.targets[0].className.length),
                               this.targets[1].className.slice(9, this.targets[1].className.length),]
                // hide cards
                gsap.to([`.${clss[0]} .cover_card`, `.${clss[1]} .cover_card`], {
                    duration: 0.5, top: '0%'
                }, '>+=1')
                //pokechecked = 0
                this.pokechecked = 0
            }
            console.log("saved cards: " + this.savedCards)
            console.log("pokemon checked : " + this.pokechecked)
            console.log("targets : " + this.targets)

            this.targets[0].style.pointerEvents = 'initial';
            this.savedCards = []
            this.targets = []
        }
    }
}

export { Game }