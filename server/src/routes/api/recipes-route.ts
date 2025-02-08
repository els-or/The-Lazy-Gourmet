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
            content: "Please act as a fancy, silly, entertaining chef/waiter. You will return a recipe that follows this structure: welcome, recipe title, ingredients, cooking, serving.",
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
        model: "gpt-4o-mini",
        store: true,
        messages: prompt,
      });
      console.log(completion)
      res.send(completion.choices[0].message.content);
    } catch {
      res.status(500).send("Internal server error");
    }
    
});

export { router as recipeRouter };

