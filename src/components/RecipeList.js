import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "./App";
import "../css/app.css";

export default function Recipelist({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  //let r = recipes.map( recipes=> <Recipe name={recipes.name} servings={recipes.servings} cookTime={recipes.cookTime} instructions={recipes.instructions}/>);
  return (
    <div className="recipe-list">
      <div>
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button className="btn btn--primary" onClick={handleRecipeAdd}>
          Add Recipe
        </button>
      </div>
    </div>
  );
}
