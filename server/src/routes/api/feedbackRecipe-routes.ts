/*
get recipe info to database.
app.use(express.json()); //parse req.body
*/

import express from 'express';
import type {Request, Response} from 'express';
import {Recipe} from '../../models/index';

const router = express.Router();


//POST /create new receipe
router.post('/', async (req: Request, res: Response) =>{

    try{

        const newRecipe = await Recipe.create(req.body); //using Sequelize method.

        //if success, then send created(201) and JSON response. 
        res.status(201).json(newRecipe);
    }
    catch(err)
    {    //failed to create recipe
        res.status(500).json({error: 'Internal Server Error, recipe creation failed'});

    }



});

export {router as feedbackRecipe};

















