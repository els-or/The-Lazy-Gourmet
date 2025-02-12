import React, { useState } from "react";

type updateRecipeType = (recipe: object) => void;

async function createRecipe(data: object) {
  const response = await fetch("/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const results = await response.json();
  console.log(results);
  return results;
}

export default function RecipeForm(props: { updateRecipe: updateRecipeType }) {
  const [ingredients, setIngredients] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [sayPlease, setSayPlease] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!submitted) {
      setSubmitted(true);
      try {
        const recipe = await createRecipe({
          ingredients,
          numberOfPeople,
          additionalRequests,
        });
        props.updateRecipe(recipe);
        setSubmitted(false);
      } catch (error) {
        console.error("Failed to create recipe:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-tertiary p-5 mx-auto rounded-lg shadow-xl"
    >
      <div className="mb-5">
        <label className="font-header block mb-2 text-sm font-medium">
          Ingredients:
        </label>
        <input
          type="text"
          id="ingredients"
          placeholder="Enter ingredients separated by commas"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-5">
        <label className="font-header block mb-2 text-sm font-medium">
          Number of people:
        </label>
        <input
          className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          required
        />
      </div>
      <div className="mb-5">
        <label className="font-header block mb-2 text-sm font-medium">
          Any occasion or special request?
        </label>
        <textarea
          id="specialRequests"
          value={additionalRequests}
          placeholder="Enter any special requests or restrictions here"
          onChange={(e) => setAdditionalRequests(e.target.value)}
          className="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
            type="checkbox"
            checked={sayPlease}
            onChange={(e) => setSayPlease(e.target.checked)}
            required
          />
          <label className="font-header p-1 text-sm font-medium">Please!</label>
        </div>
      </div>

      <br />
      <button type="submit" className="btn">
        {submitted ? "Hold your fork.." : "Submit"}
      </button>
    </form>
  );
}
