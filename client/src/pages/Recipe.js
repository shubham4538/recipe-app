import React from "react";
import { redirect, useLocation, useParams } from "react-router-dom";
import "../styles/RecipePage.css";

function Recipe() {
  const { id } = useParams();
  const location = useLocation();
  const recipe = location.state;

  if (!recipe || recipe._id !== id) redirect("/");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="recipe-container">
        <h1 style={{ alignSelf: "center" }}>{recipe.name}</h1>
        <img src={recipe.image_url} alt="" />
        <div>
          <ps>Prepration time: {recipe.cooking_time} minutes</ps>
          <i className="far fa-alarm-clock"></i>
        </div>
        <div>
          <span>Description: </span>
          {recipe.description}
        </div>
        <div>
          <span>Ingredients</span>
          <ul>
            {recipe.ingredients.map((ingredient) => {
              return <li>{ingredient}</li>;
            })}
          </ul>
        </div>
        <div>
          <span>Steps</span>
          <ul>
            {recipe.steps.map((step) => {
              return <li>{step}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
