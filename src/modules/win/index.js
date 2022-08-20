import './win.css';

class Win {
    constructor(config) {
        this.config = config;
    }
    winPage = () => {
        this.config.father.innerHTML = this.template(this.config.message);
        gsap.to('.win_container', { duration: 0.7, opacity: 1 }, 'startWin')
        gsap.from('.win_container', { duration: 0.7, scale: 0.5, ease: Back.easeOut.config(1.7)}, 'startWin')
        gsap.to('.win_container', { duration: 3, scale: 1.3, repeat: -1, yoyo: true }, '>')
    }

    template = (msg) => {
        let template = `
            <section class="win_container">
                <h1>${msg[0]}</h1>
                <div class="sub-section">
                    <i class="material-icons star_1">star</i>
                    <h2>${msg[1]}</h2>
                    <i class="material-icons star_2">star</i>
                </div>
            </section>
        `;
        return template;
    }
}

export { Win }