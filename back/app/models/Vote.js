import { sequelize } from "../database.js";
import { DataTypes, Model } from "sequelize";
import { User } from "./User.js";
import { Pokemon } from "./Pokemon.js";


export class Vote extends Model {}

Vote.init({
    
    user_id :{
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false,
        primaryKey: true
    },

    pokemon_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Pokemon,
            key: "id"
        },
        allowNull: false,
        primaryKey: true
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

}, {
    sequelize,
    tableName: "vote",
    timestamps: false,
    primaryKey: ['user_id', 'pokemon_id'] 
})