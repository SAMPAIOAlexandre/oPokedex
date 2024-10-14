import { Type } from "../models/association.js"


export async function getAllTypes(req,res) {
    try {
        const types = await Type.findAll()
        /* res.send("Coucou je suis la route") */
        res.json(types);
    } catch (error) {
        console.error()
    }
}



export async function getOneType(req,res) {
    
    try {
        const typeId = parseInt(req.params.id);
        /* res.send("Coucou") */

        //vérif de l'id 
        if(isNaN(typeId)){
            return res.status(404).json({ error: "List not found. Please verify the provided id." });
        }

        const type = await Type.findByPk(typeId);

        if(! type){
            return res.status(404).json({error: "Ce pokémon n'existe pas :) " })
        }

        res.json(type)
    } catch (error) {
        console.error()
    }
    
}