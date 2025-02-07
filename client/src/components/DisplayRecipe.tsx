export default function DisplayRecipe(props: any) {
  return (
    <div>
      <h3>Recipe</h3>
      {JSON.stringify(props.recipe)}
    </div>
  );
}
