import React, { useState } from "react";


export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [sayPlease, setSayPlease] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`check console log`);
    fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients,
        numberOfPeople,
        additionalRequests,
        sayPlease,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Ingredients:
        </label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Number of people:
        </label>
        <input
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Any occasion or special request?
        </label>
        <textarea
          id="specialRequests"
          value={additionalRequests}
          onChange={(e) => setAdditionalRequests(e.target.value)}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
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
          <label className="p-1 text-sm font-medium text-gray-900">
            Please!
          </label>
        </div>
      </div>

      <br />
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
}
