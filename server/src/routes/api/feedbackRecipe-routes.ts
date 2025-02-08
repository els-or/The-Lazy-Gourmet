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
        res.status(500).json({err: 'Internal Server Error, recipe creation failed'});

    }

 //Get /recipe - retrieve entire recipes
 router.get('/', async (_req: Request, res: Response) =>{

    try{

        const recipeAll = await Recipe.findAll(); //using Sequelize method.

        //if success, then send success(200) and JSON response. 
        res.status(200).json(recipeAll);
    }
    catch(err)
    {    //failed to retrieve all recipes
        res.status(500).json({err: 'Internal Server Error, no entries found!'});

    }

// /recipe/:id - get recipe by id.
router.get('/:id', async (req: Request, res: Response) =>{

    try{

        const recipe = await Recipe.findByPk(req.params.id); //using Sequelize method.

        if(recipe)
        //if success, then send success(200) and JSON response. 

        res.status(200).json(recipe);
        else
        res.status(404).json({ err: 'recipe not found' }); //failed to retrieve recipe
    }
    catch(err)
    {  
        res.status(500).json({err: 'Internal Server Error'});

    }


});





export {router as feedbackRecipe};

















