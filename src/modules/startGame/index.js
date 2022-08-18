import './startGame.css';
import { loadingPage } from '../loadingPage/index.js';
import { creaEl } from '../functions/functions.js';
import { Game } from '../game/index.js'

class StartGame {
    constructor(config) {
        this.config = config;
        this.levels = [0,3,4,5,6,8,10,12,15,20]
        this.pokemonsGetted = []
        this.pokemonsMixed = []
    };

    start = async () => {
        this.level = document.querySelector('#input_level').value;
        this.boxesCont = this.levels[this.level]

        this.config.father.innerHTML = loadingPage()

        await this.getPokemons().then( data => {
                this.mixPokemons(data);
                this.config.father.innerHTML = this.template(this.pokemonsMixed);
                let gameCardsCont = document.querySelector('.game_cards_cont');
                gameCardsCont.appendChild(this.createCards(this.pokemonsMixed));

                const game = new Game(this.level);
                game.init()
            })
    };

    getPokemons = async () => {
        let pushPokemon = (poke) => {
            this.pokemonsGetted.push(poke)
            this.pokemonsGetted.push(poke)
        }
        for(let i = 0; i <this.boxesCont; i++) {
            let ramdom = Math.floor((Math.random() * 750) + 1)
            let pokemon
            let newPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${ramdom}`)
                .then((response) => response.json())
                .then((data) => {
                    pokemon = data
                })
            pushPokemon(pokemon)
        }
        // console.log(this.pokemonsGetted[0].id)
        
        return this.pokemonsGetted
    }

    mixPokemons = (oldArray) => {
        let currentIndex = oldArray.length,  randomIndex;
        this.pokemonsMixed = [...this.pokemonsGetted]

        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [this.pokemonsMixed[currentIndex], this.pokemonsMixed[randomIndex]] = [
            this.pokemonsMixed[randomIndex], this.pokemonsMixed[currentIndex]];
          }
    }

    template = ( pokeArray ) => {
        const template = `
            <section class="game_container flex_center">
                <h2>Level ${this.level}</h2>
                <div class="game_cards_cont"></div>
            </section>
        `;
        return template;
    }

    createCards = (pokeArray) => {
        let rep;
        if(this.level === '1' || this.level === '4') {
            rep = 3
        } else if (this.level === '2' || this.level === '5' ) {
            rep = 4
        } else if (this.level === '3' || this.level === '6' ) {
            rep = 5
        } else if (this.level === '7' || this.level === '8' ){
            rep = 6
        } else {
            rep = 8
        }
        let gridColumns = `repeat(${rep}, 1fr)`;
        const ulElem = creaEl('ul');
        for(let i = 0; i < pokeArray.length; i++) {
            let newCard = creaEl('li', ['pokecard', `n_${pokeArray[i].name}_${i}`]);
            let img = new Image();
            img.src = pokeArray[i].sprites.front_shiny;
            newCard.appendChild(img);
            let coverCard = creaEl('div', ['cover_card']);
            let coverCardIcon = creaEl('i', ['material-icons', 'cover_card_icon']);
            let iconText = new Text('visibility');
            newCard.appendChild(coverCard).appendChild(coverCardIcon).appendChild(iconText)
            ulElem.appendChild(newCard)
            ulElem.style.gridTemplateColumns = gridColumns
        }

        return ulElem
    }
}

export { StartGame }