import { Home } from './modules/home/index.js'
import { StartGame } from './modules/startGame/index.js';
import { creaEl } from './modules/functions/functions.js'
import './css/style.css';
// import Icon from './images/img_3208906.png'

function component() {
    const mainE = creaEl('main', ['main_container', 'flex_center'])
    const gsap = creaEl('script')
    gsap.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js'

    /* App here*/
    const startGame = new StartGame({
      father: mainE
    })
    const home = new Home({
      logo: 'Guess Who',
      cta: 'Start',
      callback: startGame.start
    })
    home.createTemplate(mainE)

    /* Start Game */



    /* End of app */
    let parts = [mainE, gsap]
  
    return parts;
  }

function headHTML() {
  const materialize = creaEl('link')
  materialize.rel = 'stylesheet'
  materialize.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'

  return materialize
}

let bodyParts = component()
  
  document.head.appendChild(headHTML())
  document.body.appendChild(bodyParts[0])
               .appendChild(bodyParts[1]);