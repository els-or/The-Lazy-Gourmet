export default function DisplayRecipe(props: any) {
  if (!props.recipe) {
    return (
      <div>
        No recipe to display please submit a request or lookup a recipe from
        your previous requests.
      </div>
    );
  }
  let recipe = props.recipe.message;
  console.log(recipe);
  recipe = recipe.replaceAll("```", "");
  recipe = recipe.replace("json", "");
  recipe = JSON.parse(recipe);
  return (
    <div>
      <h3>{recipe.title}</h3>
      <p>{recipe.intro}</p>
      <p>{recipe.welcome}</p>
      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Cooking Steps</h4>
      <ul>
        {recipe.cooking.map((step: string, index: number) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <h4>Serving Instructions</h4>
      <p>{recipe.serving}</p>
    </div>
  );
}
