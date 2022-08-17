import './startGame.css'
import { loadingPage } from '../loadingPage/index.js'

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
                this.config.father.innerHTML = this.template();
            })
    };

    getPokemons = async () => {
        let pushPokemon = (poke) => {
            this.pokemonsGetted.push(poke)
            this.pokemonsGetted.push(poke)
        }
        for(let i = 0; i <this.boxesCont; i++) {
            let ramdom = Math.floor((Math.random() * 150) + 1)
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
        for(let i = 0; i < oldArray.length; i++) {
            let ramdom = Math.floor((Math.random() * 10) + 1)
            if(ramdom > 5) {
                this.pokemonsMixed.push(oldArray[i])
            } else {
                this.pokemonsMixed.unshift(oldArray[i])
            }
        }
        console.log(this.pokemonsMixed)
    }

    template = () => {
        const template = `
            <section class="game_container flex_center">
                <h2>Level ${this.level}</h2>
            </section>
        `;
        return template;
    }
}

export { StartGame }