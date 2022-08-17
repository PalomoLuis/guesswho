export function creaEl (newElement, classStyles = []) {
    let element = document.createElement(newElement);
    if(classStyles.length >= 1) {
        for (let i = 0; i < classStyles.length; i++) {
            element.classList.add(`${classStyles[i]}`)
        }
    }
    return element
}