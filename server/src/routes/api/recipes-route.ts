// import OpenAI from "openai";
// import express from 'express';
// import type { Request, Response } from 'express';

// const router = express.Router();

// router.post('/', async (req: Request, res: Response) => {
//     const instructions = req.body;
//     console.log(instructions)
//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY,
//         });
    
//         const completion = openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         store: true,
//         messages: [
//             {"role": "user", "content": "write a haiku about ai"},
//         ],
//         });
    
//         completion.then((result) => res.send(result.choices[0].message));
// });

import { Router, Request, Response } from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const router = Router();
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

router.post("/recipe-router", async (req: Request, res: Response) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 500,
        messages: [
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
            content: "I have chicken, rice, and broccoli, please give me a recipe plan given these ingredients.",
          },
          {
            role: "user",
            content: "And give me a good dessert and drink to pair with the dish.",
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch recipe.");
    }

    res.json({ recipe: data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export { router as recipeRouter };

