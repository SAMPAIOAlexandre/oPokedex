import { Pokemon, sequelize, Vote } from "../models/association.js"

export async function getAllVote(req, res) {
    console.log("getAllVote called");
    try {

        const pokemonCount = await Pokemon.count();
        if (pokemonCount === 0) {
            return res.status(404).json({ error: "Aucun Pokémon trouvé dans la base de données" });
        }

        const leaderboard = await sequelize.query(`
            SELECT p.id AS pokemon_id, p.name, COUNT(v.pokemon_id) AS voteCount
            FROM pokemon p
            LEFT JOIN vote v ON p.id = v.pokemon_id
            GROUP BY p.id
            ORDER BY voteCount DESC
            LIMIT 10;
        `, {
            type: sequelize.QueryTypes.SELECT
        });

        if (leaderboard.length === 0) {
            return res.status(404).json({ error: "Aucun vote trouvé pour ce Pokémon" });
        }

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du leaderboard" });
    }
}

export async function voteForPokemon(req,res) {
    try {
        const {user_id, pokemon_id} = req.body;

        // vérification si user a déja voté
        const userVote = await Vote.findOne({
            where: {
                user_id: user_id,
                pokemon_id: pokemon_id
            }
        })

        //Vérifs pour savoir si le pokémon existe
        const pokemonExisting = await Pokemon.findByPk(pokemon_id);
        if(!pokemonExisting) {
        return res.status(404).json({ error: "Le Pokémon n'existe pas" }); 
        }

        if(userVote) {
         return res.status(400).json({ error: "Vous avez déjà voté pour ce Pokémon" }); 
        }

        //Creation du vote
        const vote = await Vote.create({
            user_id: user_id,
            pokemon_id: pokemon_id
        })

        const voteCount = await Vote.count({
            where: {pokemon_id: pokemon_id}
        })
        /* console.log(req.body) */
        return res.status(201).json({ message: "Vote ajouté avec succès",
            "Nombre de vote qu'a eu le pokémon" : voteCount
         });
    } catch (error) {
        
    }
}


