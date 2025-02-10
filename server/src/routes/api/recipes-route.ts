import OpenAI from "openai";
import express from 'express';
import type { Request, Response } from 'express';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const router = express.Router();
//const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

router.post('/', async (req: Request, res: Response) => {
    const formData = req.body;
    console.log(formData)
    const prompt:ChatCompletionMessageParam[] = [
          {
            role: "developer",
            content: "Results must be JSON formatted. Please act as a fancy, silly, entertaining chef/waiter. You will return a brief recipe plan as a JSON object which contains the following keys: intro, welcome, title, ingredients, cooking, serving. The intro you should introduce yourself and must be a string, the welcome must be a string, title must be a string, the ingredients must be an array of strings, the cooking must be an array of strings, the serving must be a string.",
          },
        
          {
            role: "user",
            content: `I have ${formData.ingredients}, please give me a recipe plan for ${formData.numberOfPeople} people that includes these ingredients, include the following additional requests: ${formData.additionalRequests}. At the end, give me a good dessert and drink to pair with the dish.`,
          },
    ]
    const openai = new OpenAI({
      apiKey: API_KEY,
    });
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 1500,
        store: true,
        messages: prompt,
      });
      console.log(completion)
      // TODO: look up nutrition information
      // TODO: save to database
      // TODO: return nutrition information with recipe
      res.send({message: completion.choices[0].message.content});
    } catch {
      res.status(500).send("Internal server error");
    }
    
});

export { router as recipeRouter };

