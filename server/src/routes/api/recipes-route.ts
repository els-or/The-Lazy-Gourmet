import OpenAI from "openai";
import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const instructions = req.body;
    console.log(instructions)
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        });
    
        const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            {"role": "user", "content": "write a haiku about ai"},
        ],
        });
    
        completion.then((result) => console.log(result.choices[0].message));
    res.send('Recipe received');
});


export { router as recipeRouter };

