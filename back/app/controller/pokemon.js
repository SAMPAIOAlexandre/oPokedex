import { Pokemon, Type } from "../models/association.js";

export async function getAllPokemons(req,res){
    
    try {
        const pokemons = await Pokemon.findAll({
            include: [
                {
                    model: Type,
                    as: 'Types', 
                    through: {
                        attributes: [] 
                    }
                }
            ]
        });
        res.json(pokemons);
    } catch (error) {
        console.error()
    }
}
        
export async function getOnePokemon(req,res) {
    try {
        const pokemonId = parseInt(req.params.id);
    
        //vérif de l'id 
        if(isNaN(pokemonId)){
            return res.status(404).json({ error: "Ce pokémon n'existe pas :)" });
        }
        
        /* res.send("Coucou je suis là") */

        const pokemon = await Pokemon.findByPk(pokemonId);

        // si le pokemon n'existe pas on déclenche une 404
        if(! pokemon) {
            return res.status(404).json({ error: "Ce pokémon n'existe pas :) " });  
        }

        res.json(pokemon)
    } catch (error) {
        console.error() 
    }
    
}

