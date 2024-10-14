import { apiBaseUrl } from "./config.js";

// Variable pour stocker tous les Pokémon récupérés besoin de cette variable pour réutiliser les données sans refetcher a chaque interactions
let allPokemons = [];
// Fonction pour récupérer tous les Pokémon
export async function allPokemon() {
    try {
        const httpResponse = await fetch(`${apiBaseUrl}/pokemons`);
        if (!httpResponse.ok) {
            throw new Error("Erreur lors de la récupération des Pokémon");
        }
        const pokemons = await httpResponse.json();
        
        console.log("Pokémons récupérés :", pokemons);
        
        // Stocke les Pokémon récupérés dans la variable allPokemons
        allPokemons = pokemons;
        
        // Affiche tous les Pokémon
        displayPokemons(allPokemons);
        
        
    } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
    }
}

// Fonction pour afficher les Pokémon dans le DOM
function displayPokemons(pokemons) {
    const pokemonContainer = document.querySelector('#pokemonContainer');
    pokemonContainer.innerHTML = ""; // Vide le container avant d'insérer de nouveaux Pokémon

    // biome-ignore lint/complexity/noForEach: <>
    pokemons.forEach(pokemon => {
        insertPokemon(pokemon);
    });

    // Ajoute les écouteurs d'événements aux boutons de détail après l'insertion
    // biome-ignore lint/complexity/noForEach: <explanation>
        document.querySelectorAll('.pokemon-detail').forEach(button => {
        button.addEventListener('click', (event) => {
            const pokemonId = event.target.dataset.pokemonId;
            fetchPokemonDetails(pokemonId);
        });
    });
}

// Fonction pour filtrer les Pokémon par nom ou type
function filterPokemon(searchValue) {
    const filteredPokemons = allPokemons.filter(pokemon => {
        // recherche par nom
        const nameMatch = pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
        // recherche par type
        const typeMatch = pokemon.Types.some(type => type.name.toLowerCase().includes(searchValue.toLowerCase()));
        return nameMatch || typeMatch;
    });
    
    displayPokemons(filteredPokemons);
}

// Écouteur d'événement pour la recherche
document.querySelector('#searchForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const searchValue = document.querySelector('#searchInput').value;
    filterPokemon(searchValue); 
});

// Fonction pour récupérer les détails du Pokémon
async function fetchPokemonDetails(pokemonId) {
    try {
        const response = await fetch(`${apiBaseUrl}/pokemons/${pokemonId}`);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des détails du Pokémon");
        }
        const pokemon = await response.json();
        openModal(pokemon);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du Pokémon :", error);
    }
}

// Fonction pour ouvrir la modal
function openModal(pokemon) {
    const modal = document.getElementById('pokemonDialog');
    const closeButtons = document.querySelectorAll('.close');

    document.getElementById('modalPokemonImage').src = `./assets/img/${pokemon.id}.webp`;
    document.getElementById('modalPokemonName').textContent = pokemon.name;
    document.getElementById('modalPokemonHp').textContent = `HP: ${pokemon.hp}`;
    document.getElementById('modalPokemonAtk').textContent = `ATK: ${pokemon.atk}`;
    document.getElementById('modalPokemonDef').textContent = `DEF: ${pokemon.def}`;
    document.getElementById('modalPokemonAtkSpe').textContent = `ATK SPE: ${pokemon.atk_spe}`;
    document.getElementById('modalPokemonDefSpe').textContent = `DEF SPE: ${pokemon.def_spe}`;
    document.getElementById('modalPokemonSpeed').textContent = `SPEED: ${pokemon.speed}`;

    modal.showModal(); // Ouvrir la modal

    // biome-ignore lint/complexity/noForEach: <>
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.close(); // Fermer la modal
        });
    });
}

// Fonction pour insérer un Pokémon dans le DOM
export function insertPokemon(pokemon) {
    try {
        const pokemonTemplate = document.querySelector('.template-pokemon');
        const newPokemon = document.importNode(pokemonTemplate.content, true);

        newPokemon.querySelector('.pokemon_name').textContent = pokemon.name;
        newPokemon.querySelector('.pokemon_image').src = `./assets/img/${pokemon.id}.webp`;
        newPokemon.querySelector('.pokemon_image').alt = pokemon.name;

        const typeContainer = newPokemon.querySelector('.pokemon_types');
        if (pokemon.Types) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            pokemon.Types.forEach(type => {
                const typeSpan = document.createElement('span');
                typeSpan.classList.add('tag');
                typeSpan.textContent = type.name;
                let color;
                if (type.color.startsWith('#')) {
                    color = type.color;
                } else {
                    color = `#${type.color}`;
                }
                typeSpan.style.backgroundColor = color;
        
                typeContainer.appendChild(typeSpan);
            });
        } else {
            console.warn(`Aucun type trouvé pour le Pokémon ${pokemon.name}`);
        }

        // pour que le button détail est l'id DU pokémon 
        const detailButton = newPokemon.querySelector('.pokemon-detail');
        detailButton.dataset.pokemonId = pokemon.id;

        document.querySelector('#pokemonContainer').append(newPokemon);

    } catch (error) {
        console.error("Erreur lors de l'insertion du Pokémon :", error);
    }
}
