import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.js";
import { User } from "./User.js";


export class Team extends Model  {}

Team.init({
   
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        }
    }
}, {
    sequelize,
    tableName: "team",
    timestamps: false
})