import React, { useRef } from "react";

export default function RecipeIngredientEdit(props) {
  let { name, amount } = props.ingredient;
  const nameRef = useRef();
  function handleChange(change) {
    props.handleIngredientChange(props.ingredient.id, {
      ...props.ingredient,
      ...change,
    });
  }
  return (
    <>
      <input
        ref={nameRef}
        value={name}
        onInput={(e) => handleChange({ name: e.target.value })}
        type="text"
        className="recipe-edit__input"
      />
      <input
        value={amount}
        type="text"
        className="recipe-edit__input"
        onInput={(e) => handleChange({ amount: e.target.value })}
      />
      <button
        className="btn btn--danger"
        onClick={() => props.handleIngredientDelete(props.ingredient.id)}
      >
        &times;
      </button>
    </>
  );
}
