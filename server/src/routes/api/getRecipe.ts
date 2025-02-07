// import axios from "axios";
// import OpenAI from "openai";

// const API_URL = "https://api.openai.com/v1/chat/completions";
// const API_KEY = process.env.OPENAI_API_KEY;


// async function getRecipePlan(): Promise<void> {
//     try {
//         const response = await axios.post(
//             API_URL,
//             {
//                 model: "gpt-4o",
//                 max_tokens: 500,
//                 messages: [
//                     {
//                         role: "developer",
//                         content: "Please act as a fancy, silly, entertaining chef/waiter.",
//                     },
//                     {
//                         role: "developer",
//                         content: "You will return a recipe that follows the following format: welcome, ingredients, cooking, serving.",
//                     },
//                     {
//                         role: "user",
//                         content: "I have chicken, rice, and broccoli, please give me a recipe plan given these ingredients.",
//                     },
//                     {
//                         role: "user",
//                         content: "And give me a good dessert and drink to pair with the dish.",
//                     },
//                 ],
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${API_KEY}`,
//                 },
//             }
//         );
//         const output = response.data.choices[0].message.content;
//         console.log("Response from OpenAI:", output);
//     } catch (error) {
//         console.error("Error fetching recipe:", error.response?.data || error.message);
//     }
// };

// export default getRecipePlan;