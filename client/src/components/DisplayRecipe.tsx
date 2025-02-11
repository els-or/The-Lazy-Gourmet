import { useEffect, useState } from "react";

export default function DisplayRecipe(props: any) {
  const [nutrition, setNutrition] = useState([]);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    cooking: [],
    serving: "",
    intro: "",
    welcome: "",
  });
  useEffect(() => {
    if (props.recipe) {
      let recipe = props.recipe.message;
      console.log(recipe);
      recipe = recipe.replaceAll("```", "");
      recipe = recipe.replace("json", "");
      recipe = JSON.parse(recipe);
      setRecipe(recipe);
      fetch(`/api/nutrition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: recipe.ingredients }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNutrition(data.nutritionInfo);
        });
    }
    document.getElementById("recipeDivider")?.scrollIntoView(true);
  }, [props.recipe]);
  if (!props.recipe) {
    return (
      <div className="bg-background-blue mb-25 p-5 text-center mx-auto rounded-lg shadow-xl">
        No recipe to display, please submit a request or pick a recipe from your
        recipe history.
      </div>
    );
  }

  return (
    <div className="bg-background-blue p-5 text-center mx-auto rounded-lg shadow-xl">
      <h3 className="font-header">{recipe.title}</h3>
      <p>{recipe.intro}</p>
      <p>{recipe.welcome}</p>
      <h3 className="font-header">Nutrition Facts</h3>
      <table className="table-auto mx-auto pb-5">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Cholesterol</th>
            <th>Sodium</th>
            <th>Sugar</th>
          </tr>
        </thead>
        <tbody>
          {nutrition.map((item: any, key: number) => {
            return (
              <tr key={key}>
                <td className="p-2">{item.Ingredient}</td>
                <td className="p-2">{item.Protein}</td>
                <td className="p-2">{item.Carbs}</td>
                <td className="p-2">{item.Cholesterol}</td>
                <td className="p-2">{item.Sodium}</td>
                <td className="p-2">{item.Sugar}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4 className="font-header">Ingredients</h4>
      <ul>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4 className="font-header">Cooking Steps</h4>
      <ul>
        {recipe.cooking.map((step: string, index: number) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <h4 className="font-header">Serving Instructions</h4>
      <p>{recipe.serving}</p>
      <img
        src="/chef.png"
        alt="clipart of a gourmet chef"
        className="h-60 mx-auto bottom-0 right-0"
      />
    </div>
  );
}
