import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";

//import uuidv4 from "uuid/v4";

import "../css/app.css";
import RecipeEdit from "./RecipeEdit";
export const RecipeContext = React.createContext();

const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipe);
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const aa = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (aa != null) {
      setRecipes(aa);
    }
  }, []);
  useEffect(() => {
    //console.log("rendered!");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    // return () => {
    //   console.log("clean up returned!");
    // };
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  function handleRecipeAdd() {
    const newRecipe = {
      id: Math.random(),
      name: "Dish1",
      servings: 2,
      cookTime: "3.33",
      instructions: "Instr.",
      ingredients: [
        {
          id: 1,
          name: "eggs",
          amount: "2 pcs",
        },
        {
          id: 2,
          name: "olive oil",
          amount: "2 tbsps",
        },
      ],
    };

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id)
      setSelectedRecipeId(undefined);
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipe = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1.45",
    instructions:
      "1. Put salt on chicken.\n2. Put chicken in oven.\n3. Eat chicken.\n",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0.45",
    instructions:
      "1. Put paprika on pork.\n2. Put pork in oven.\n3. Eat pork.\n",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];

export default App;
