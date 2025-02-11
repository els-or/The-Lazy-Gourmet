import React, { useEffect, useState } from "react";
import DisplayRecipe from "./DisplayRecipe";

interface Recipe {
  id: number;
  entryDate: Date;
  recipeData: string;
}

const RecipeHistory: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [displayData, setDisplayData] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/history");
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <ul>
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <li key={recipe.id}>
                <div
                  className="bg-background-blue hover:bg-green-500 m-5 text-center mx-auto rounded-lg shadow-xl"
                  onClick={() =>
                    displayData == null
                      ? setDisplayData(recipe)
                      : setDisplayData(null)
                  }
                >
                  <p>{new Date(recipe.entryDate).toLocaleString()}</p>
                  <div className="bg-background-primary">
                    {displayData && displayData.id == recipe.id ? (
                      <div>
                        <DisplayRecipe
                          recipe={{ message: displayData.recipeData }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default RecipeHistory;

// import React, { useEffect, useState } from 'react';

// interface Recipe {
//   id: number;
//   numOfpeople: string;
//   receipeName: string;
//   instruction: string;
//   createdAt: string;
// }

// const RecipeHistory: React.FC = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const response = await fetch('/api/recipe/history');
//       const data = await response.json();
//       setRecipes(data);
//     };

//     fetchRecipes();
//   }, []);

//   return (
//     <div>
//       <h2>Recipe History</h2>
//       <ul>
//         {recipes.map((recipe) => (
//           <li key={recipe.id}>
//             <p>{recipe.receipeName}</p>
//             <p>{recipe.numOfpeople} people</p>
//             <p>{recipe.instruction}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecipeHistory;
