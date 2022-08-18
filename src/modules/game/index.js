import './game.css';

class Game {
    constructor (level) {
        this.level = level;
        this.pokechecked = 0;
        this.oportunities = 0
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
            // pokechecked = 1
        } else if (this.pokechecked === 1) {
            //show card 2
            //save card 2
            //compare cards
            //if card 1 === card 2
                //block cards
                //oportunities =- 1
                //if oportunities === 0
                    //win game tempalte
                //else
                    //pokechecked = 0
            //else
                //hide cards
                //pokechecked = 0
        }
    }
}

export { Game }