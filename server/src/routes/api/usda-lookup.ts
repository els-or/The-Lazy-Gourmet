import fetch from "node-fetch"; // Ensure node-fetch is installed 
import type { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const ingredients = req.body.ingredients;
    if (!ingredients) {
        return res.status(200).send("Please provide ingredients");
    }
    console.log(ingredients)
    const nutritionInfo = await getNutritionFactsForIngredients(...ingredients);
    return res.send({
        nutritionInfo: nutritionInfo
    });
})


// Define the structure for a nutrient
interface Nutrient {
  nutrientName: string;
  value: number;
  unitName: string;
}

// Define the structure for a food item in the API response
interface FoodItem {
  description: string;
  foodNutrients: Nutrient[];
}

// Define the structure of the API response
interface USDAApiResponse {
  foods: FoodItem[];
}

// Function to fetch nutrition data for any number of ingredients
async function getNutritionFactsForIngredients(
  ...ingredients: string[]
): Promise<Record<string, string>[]> {
  const apiKey = process.env.USDA_API_KEY; // Replace with your USDA API key 

  // Define the nutrients we want to extract
  const requiredNutrients: string[] = [
    "Protein",
    "Carbohydrate, by difference",
    "Cholesterol",
    "Sodium, Na",
    "Total Sugars"
  ];

  let results: Record<string, string>[] = [];

  for (const ingredient of ingredients) {
    const query = encodeURIComponent(ingredient);
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`;

    try {
      const response = await fetch(url);
      const data = (await response.json()) as USDAApiResponse; // ✅ Explicit Type Assertion

      if (data.foods && data.foods.length > 0) {
        const foodItem: FoodItem = data.foods[0]; // Get the first matching result

        // Extract only the required nutrients
        const filteredNutrients: Record<string, string> = foodItem.foodNutrients
          .filter(nutrient =>
            requiredNutrients.some(name => nutrient.nutrientName.includes(name))
          )
          .reduce((acc: Record<string, string>, nutrient) => {
            acc[nutrient.nutrientName] = `${nutrient.value} ${nutrient.unitName}`;
            return acc;
          }, {});

        results.push({
          Ingredient: foodItem.description,
          Protein: filteredNutrients["Protein"] || "N/A",
          Carbs: filteredNutrients["Carbohydrate, by difference"] || "N/A",
          Cholesterol: filteredNutrients["Cholesterol"] || "N/A",
          Sodium: filteredNutrients["Sodium, Na"] || "N/A",
          Sugar: filteredNutrients["Total Sugars"] || "N/A",
        });
      } else {
        results.push({ Ingredient: ingredient, Error: "No data found" });
      }
    } catch (error) {
      console.error(`Error fetching data for ${ingredient}:`, error);
      results.push({ Ingredient: ingredient, Error: "API error" });
    }
  }

  // Log results to console
  console.log("Final Results:", results);
  console.table(results);

  // ✅ Return results after logging
  return results;
}

export { router as nutritionRouter };