import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.js";

export class Type extends Model {}

Type.init({ 

name: {
    type: DataTypes.STRING(255),
    allowNull: false
},

color: {
    type:DataTypes.STRING(7),
    allowNull: false
},

}, {
    sequelize,
    tableName: "type",
    timestamps: false
})