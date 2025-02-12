import OpenAI from "openai";
import express from 'express';
import type { Request, Response } from 'express';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Recipe } from "../../models/recipe.js";

const router = express.Router();
//const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

router.post('/', async (req: Request, res: Response) => {
    const formData = req.body;
    console.log(formData)
    const prompt:ChatCompletionMessageParam[] = [
          {
            role: "developer",
            content: "Results must be JSON formatted. Please act as a fancy, silly, entertaining chef/waiter. You will return a brief recipe plan as a JSON object which contains the following keys: intro, welcome, title, ingredients, cooking, serving, outro. intro you should quickly introduce yourself with a creative chef name and must be a string; welcome must be a string; title must be a string; ingredients you should include required measurements and expand the food descriptions with poetic detail while you teach a bit of history or culture behind each, it must be an array of strings; cooking you should display a list of steps, each step should follow the format '*emoji* Step _:', each step should focus on nutritional benefits, safety tips, and precise ingredient measurements, must be an array of strings; serving must be an array of strings which includes serving instructions and the dessert/drink pairings; outro must be a string. Each string should start with a single emoji. Add food safety handling messages where necessary include washing hands, separating raw and cooked foods, cooking to safe temperatures, and refrigerating promptly.",
          },
        
          {
            role: "user",
            content: `I have ${formData.ingredients}, please give me a recipe plan for ${formData.numberOfPeople} people using these ingredients, include the following additional requests: ${formData.additionalRequests}. At the end, give me a good dessert and drink to pair with the dish.`,
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
      console.log(completion.choices[0].message.content)
      await Recipe.create({
        entryDate: new Date(),
        recipeData: completion.choices[0].message.content
      })
      res.send({
        message: completion.choices[0].message.content
      });
    } catch(err) {
      res.status(500).send(err);
    }
    
});

export { router as recipeRouter };

