import './home.css';

class Home {
    constructor(config) {
        this.config = config
    }

    createTemplate = (father) => {
        father.innerHTML = this.template()
        window.onload = () => { 
            let btnStart = document.getElementById('start_game');
            btnStart.addEventListener('click', this.validateInput);

            this.arrowLevels()
        }
    }

    arrowLevels = () => {
        const btnUp = document.getElementById('level_up');
        const btnDown = document.getElementById('level_down');
        btnUp.addEventListener('click', this.levelUp)
        btnDown.addEventListener('click', this.levelDown)
    }
    
    levelUp = () => {
        let inputLevel = document.querySelector('#input_level');
        let level = inputLevel.value;

        if(level > 0 && level < 10) {
            let lvl = parseInt(level) + 1
            inputLevel.value = lvl
        }
        this.validateInput()
    }

    levelDown = () => {
        let inputLevel = document.querySelector('#input_level');
        let level = inputLevel.value;

        if(level > 0 && level < 10) {
            let lvl = parseInt(level) - 1
            inputLevel.value = lvl
        }
        this.validateInput()
    }

    validateInput = () => {
        let inputLevel = document.querySelector('#input_level');
        let level = inputLevel.value;
        if(level > 9) {
            inputLevel.value = 9
        }
        if (level < 1) {
            inputLevel.value = 1
        }
        if (level.search(/[^\a-z\s]/)) {
            inputLevel.value = 1
            this.showError('Uh! Write only a number')
            console.log('Write a number')
        }
    }

    showError = (msg) => {
        const errorEl = document.querySelector('.home_error_alert');
        errorEl.innerHTML = msg;
        errorEl.classList.remove('d_none');
        gsap.to(errorEl, { duration: 0.3, opacity: 1})
        gsap.from(errorEl, { duration: 1, scale: 0.7, ease: "elastic.out(1, 0.3)"})
        gsap.to(errorEl, { duration: 3, opacity: 0, delay: 4})

    }

    template = () => {
        let template = `
            <section class="home_container flex_center">
                <h1 class="home_logo">${this.config.logo}</h1>
                <div class="home_settings flex_center">
                    <div class="home_levels">
                        <input type="test" value="1" id="input_level">
                        <div class="home_levels_arrows">
                            <button class="arrow_up" id="level_up">
                                <i class="material-icons">arrow_drop_up</i>
                            </button>
                            <button class="arrow_down" id="level_down">
                                <i class="material-icons">arrow_drop_down</i>
                            </button>
                        </div>
                    </div>
                    <button class="btn start_game" id="start_game">${this.config.cta}</button>
                    <div class="home_error_alert d_none"></div>
                </div>
            </section>
        `;
        return template
    }

}

export { Home }