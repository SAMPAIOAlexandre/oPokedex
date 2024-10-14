import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.js";



export class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },

    name : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: "user"
})