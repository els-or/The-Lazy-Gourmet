export default function DisplayRecipe(props: any) {
  if (!props.recipe) {
    return (
      <div className="bg-background-blue p-5 text-center mx-auto rounded-lg shadow-xl">
        No recipe to display, please submit a request or pick a recipe from your
        recipe history.
      </div>
    );
  }
  let recipe = props.recipe.message;
  console.log(recipe);
  recipe = recipe.replaceAll("```", "");
  recipe = recipe.replace("json", "");
  recipe = JSON.parse(recipe);
  return (
    <div className="bg-background-blue pb-60 p-5 text-center mx-auto rounded-lg shadow-xl">
      <h3 className="font-header">{recipe.title}</h3>
      <p>{recipe.intro}</p>
      <p>{recipe.welcome}</p>
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
