import * as Pokémon from "./controller/pokemon.js";
import * as Type from "./controller/type.js";
import * as Team from "./controller/team.js";
import * as Vote from "./controller/vote.js"
/* import * as Vote from './controller/vote.js' */
import { Router } from "express";


export const router = Router();

// Route pokémon
router.get("/pokemons", Pokémon.getAllPokemons);
router.get("/pokemons/:id", Pokémon.getOnePokemon);

// Route types
router.get("/types", Type.getAllTypes);
router.get("/types/:id", Type.getOneType);


//Route team
router.get("/teams", Team.getAllTeam);
router.get("/teams/:id", Team.getOneTeam);
router.post("/teams/", Team.createTeam);
router.patch("/teams/:id", Team.editTeam);
router.delete("/teams/:id", Team.deleteTeam);
router.put("/teams/:teamId/pokemons/:pokemonId", Team.addPokemonToTeam);
router.delete("/teams/:teamId/pokemons/:pokemonId", Team.deletePokemonOnTeam);


//Route vote 
router.post("/pokemons/:id/votes", Vote.voteForPokemon); 
router.get("/leaderboard", Vote.getAllVote); 
