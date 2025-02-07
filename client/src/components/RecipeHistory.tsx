
import React, { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  numOfpeople: string;
  receipeName: string;
  instruction: string;
  createdAt: string;
}

const RecipeHistory: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/recipe/history');
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Recipe History</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <p>{recipe.receipeName}</p>
            <p>{recipe.numOfpeople} people</p>
            <p>{recipe.instruction}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeHistory;
