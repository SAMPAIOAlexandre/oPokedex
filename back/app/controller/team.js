import { Pokemon, Team, User } from "../models/association.js";


export async function getAllTeam(req,res) {
    try {
        const teams = await Team.findAll()
        res.json(teams);
    } catch (error) {
        console.error()
    }
}


export async function getOneTeam(req,res) {
    try {
       const teamId = parseInt(req.params.id);

       if(isNaN(teamId)){
        return res.status(404).json({ error: "Cette team n'existe pas :)" });
    }
    

       const team = await Team.findByPk(teamId);
        if (! team) {
        return res.status(404).json({ error: "Cette team n'existe pas :) " }); 
        }

       res.json(team)


    } catch (error) {
        console.error()
    }
}

export async function createTeam(req,res) {
    try {

        const  { name,description,user_id } = req.body;
        /* console.log(req.body); */

            // Validation des inputs
        if (! name || typeof name !== "string" || ! description || typeof description !== "string") {
        return res.status(400).json({ error: "Les deux champs doivent être une chaine de caracteres"});
        }

        const team = await Team.create({name, description,user_id})
  
        // Renvoyer la tâche créée
        res.status(201).json(team);
    } catch (error) {
        console.error()  
    }
}

export async function editTeam(req,res) {
    try {
        const teamId = parseInt(req.params.id);
       /*  console.log(teamId); */

       // Je récupère les données du body
       const  { name,description } = req.body;

        // Validation des inputs
        if (! name || typeof name !== "string" || ! description || typeof description !== "string") {
            return res.status(400).json({ error: "Les deux champs doivent être une chaine de caracteres"});
            }

        // Vérification de l'existence de la team
        const team = await Team.findByPk(teamId);
        if (! team) {
        return res.status(404).json({ error: `La team avec l'ID ${teamId} n'existe pas` });
        }   
        
        // Mettre à jour les valeurs 
        team.name = name;
        team.description = description;
        await team.save();
            
        res.json(team)
    } catch (error) {
        console.error() 
    }
}

export async function deleteTeam(req,res) {
    try {
        const teamId = parseInt(req.params.id);
        
         // Vérification de l'existence de la team
        const team = await Team.findByPk(teamId);
        if (! team) {
            return res.status(404).json({ error: `La team avec l'ID ${teamId} n'existe pas` });
            }
            
    await team.destroy();

    res.status(204).end();
        
    } catch (error) {
      console.error(error);  
    }
    
}

export async function addPokemonToTeam(req,res) {
    
    try {
        const teamId = parseInt(req.params.teamId); 
        const pokemonId = parseInt(req.params.pokemonId);
        if (isNaN(teamId) || isNaN(pokemonId)) {
            return res.status(400).json({ error: "Les deux champs doivent être un chiffre." });
        }

        const team = await Team.findByPk(teamId);
        if(! team) {
            return res.status(404).json({ error: "Cette équipe n'existe pas vérifier l'id." });  
        }
        const pokemon = await Pokemon.findByPk(pokemonId);
        if(! pokemon) {
            return res.status(404).json({ error: "Ce pokémon n'existe pas vérifier l'id." });  
        }
       /*  console.log(team);
        console.log(pokemon);
        */

        // je récupère les pokémon dans l'équipe pour limiter le nombre max après
        const pokemonsInTeam = await team.getPokemons();
        if(pokemonsInTeam.length >= 6){
            return res.status(400).json({ error: "Il ne peut pas y avoir plus de 6 Pokémon dans l'équipe." });
        }

        // vérif des pokémons déja présent
        const pokemonAlreadyInTeam = pokemonsInTeam.some(pokemon => pokemon.id === pokemonId);
        if (pokemonAlreadyInTeam) {
            return res.status(400).json({ error: "Ce Pokémon est déjà dans l'équipe. Il ne peut y avoir deux fois le même pokémon " });
        }
    
    

        await team.addPokemon(pokemon); 
    
        const updatedTeam = await Team.findByPk(teamId, { include: [{ model: Pokemon, as: 'Pokemons' }] });
    
        return res.status(200).json(updatedTeam);
        
    } catch (error) {
        console.error() 
    }


}

export async function deletePokemonOnTeam(req, res) {
    try {
        const teamId = parseInt(req.params.teamId); 
        const pokemonId = parseInt(req.params.pokemonId);
        if(isNaN(teamId)){
            return res.status(404).json({error: "Les deux champs doivent être un chiffre"});
        }
        if(isNaN(pokemonId)){
            return res.status(404).json({error: "Les deux champs doivent être un chiffre"});  
        }

        const team = await Team.findByPk(teamId);
        if(! team) {
            return res.status(404).json({ error: "Cette équipe n'existe pas vérifier l'id." });  
        }
        const pokemon = await Pokemon.findByPk(pokemonId);
        if(! pokemon) {
            return res.status(404).json({ error: "Ce pokémon n'existe pas vérifier l'id." });  
        }

        await team.removePokemon(pokemon)

        const updatedTeam = await Team.findByPk(teamId, { include: [{ model: Pokemon, as: 'Pokemons' }] });

        res.json(updatedTeam);
    } catch (error) {
        console.error()    
    }
}