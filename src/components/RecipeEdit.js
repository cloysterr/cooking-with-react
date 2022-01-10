import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";

export default function RecipeEdit(props) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  const { id, name, cookTime, servings, instructions, ingredients } =
    props.recipe;

  function handleChange(changes) {
    handleRecipeChange(id, { ...props.recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...props.recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = { id: new Date().getTime(), name: "", amount: "" };
    handleChange({
      ingredients: [...props.recipe.ingredients, newIngredient],
    });
  }

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: props.recipe.ingredients.filter((r) => r.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          className="btn recipe-edit__remove-button"
          onClick={() => {
            handleRecipeSelect(undefined);
          }}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => handleChange({ name: e.target.value })}
          className="recipe-edit__input"
        />
        <label htmlFor="cookTime" className="recipe-edit__label">
          Cook Time
        </label>
        <input
          type="text"
          name="cookTime"
          id="cookTime"
          value={cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
          className="recipe-edit__input"
        />
        <label htmlFor="servings" className="recipe-edit__label">
          Servings
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
          className="recipe-edit__input"
        />
        <label htmlFor="instructions" className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          name="instructions"
          id="instructions"
          className="recipe-edit__input"
          value={instructions}
          onChange={(e) => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {ingredients.map((i) => (
          <RecipeIngredientEdit
            key={i.id}
            ingredient={i}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => {
            handleIngredientAdd();
          }}
        >
          Add Ingredients
        </button>
      </div>
    </div>
  );
}
