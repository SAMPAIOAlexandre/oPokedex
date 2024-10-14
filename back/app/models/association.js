// Import de tous les models
import { sequelize } from "../database.js";
import { Pokemon } from "./Pokemon.js";
import { Team } from "./Team.js";
import { Type } from "./Type.js";
import { User } from "./User.js";
import { Vote } from "./Vote.js";






/* <----- Pokemon Type relation many to many -------> */

Pokemon.belongsToMany(Type, {
    through: 'pokemon_type',
    foreignKey: 'pokemon_id',
    as: 'Types',
    timestamps: false

});

Type.belongsToMany(Pokemon, {
    through: "pokemon_type",
    foreignKey: 'type_id',
    as: 'Pokemons',
    timestamps: false
});


/* <----- Pokemon // Team relation many to many -------> */

Pokemon.belongsToMany(Team, {
    through: 'team_pokemon',
    foreignKey: 'pokemon_id',
    timestamps: false,
})

Team.belongsToMany(Pokemon, {
    through: 'team_pokemon',
    foreignKey: 'team_id',
    timestamps: false
})

/* <----- User // Team relation one to many -------> */

User.hasMany(Team, { foreignKey: 'user_id' });
Team.belongsTo(User, { foreignKey: 'user_id' });

/* <----- User // Vote /many to many -------> */
User.hasMany(Vote, { foreignKey: 'user_id' }); // le user peut voter plusieurs fois
Pokemon.hasMany(Vote, { foreignKey: 'pokemon_id' }); // le pokemon peut recevoir plusieurs vote
Vote.belongsTo(User, { foreignKey: 'user_id' }); 
Vote.belongsTo(Pokemon, { foreignKey: 'pokemon_id' }); // 


// Ne pas oublier d'exporter les models avec leur associations
export {Pokemon, Team, Type, User,Vote, sequelize }