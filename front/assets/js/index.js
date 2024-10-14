import * as Pokemon from "./pokemon.js"

document.addEventListener("DOMContentLoaded", init);


async function init() {

  // Fetch et afficher les tâches

  await Pokemon.allPokemon();


}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('#navbarMenu');

    if (burger && menu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    }
});