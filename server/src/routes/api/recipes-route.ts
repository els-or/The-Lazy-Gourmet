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
            content: "Please act as a fancy, silly, entertaining chef/waiter.",
          },
          {
            role: "developer",
            content: "You will return a recipe that follows the following format: welcome, ingredients, cooking, serving.",
          },
          {
            role: "user",
            content: `I have ${formData.ingredients}, please give me a recipe plan given these ingredients.`,
          },
          {
            role: "user",
            content: `I have ${formData.numberOfPeople} people, please give me a recipe plan for this number of people.`,
          },
          {
            role: "user",
            content: `I have the following additional requests: ${formData.additionalRequests}`
          },
          {
            role: "user",
            content: "And give me a good dessert and drink to pair with the dish.",
          },
    ]
    const openai = new OpenAI({
      apiKey: API_KEY,
    });
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: prompt,
      });
      console.log(completion)
      res.send(completion.choices[0].message);
    } catch {
      res.status(500).send("Internal server error");
    }
    
});

export { router as recipeRouter };

