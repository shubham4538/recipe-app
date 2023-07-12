import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Link } from "react-router-dom";

function EachPost({ recipe }) {
  const { user } = useContext(LoginContext);
  const [saved, setSaved] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://recipe-app-kappa-nine.vercel.app/recipe/saved", config)
      .then((response) => {
        setSaved(response.data.saved);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const saveRecipe = (id) => {
    axios
      .put(
        "https://recipe-app-kappa-nine.vercel.app/recipe/save",
        { id },
        config
      )
      .then((response) => {
        setSaved((old) => [...old, id]);
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const unsaveRecipe = (id) => {
    axios
      .put(
        "https://recipe-app-kappa-nine.vercel.app/recipe/unsave",
        { id },
        config
      )
      .then((response) => {
        setSaved((old) => old.filter((els) => els != id));
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    // <Link to={`/recipe/${recipe._id}`} state={recipe}>
    <div className="post-container">
      <div className="recipe-details">
        <div className="saved-container">
          <div style={{ width: "90%", display: "grid" }}>
            <div className="recipe-name">{recipe.name}</div>
          </div>
          {saved.includes(recipe._id) ? (
            <i
              className="fas fa-bookmark"
              onClick={() => unsaveRecipe(recipe._id)}
            ></i>
          ) : (
            <i
              className="far fa-bookmark"
              onClick={() => saveRecipe(recipe._id)}
            ></i>
          )}
        </div>
        <div className="recipe-description">{recipe.description}</div>
        <div className="recipe-time">
          cooking time: {recipe.cooking_time} minutes
        </div>
      </div>
      <div className="recipe-image">
        <img src={recipe.image_url} alt="" />
      </div>
    </div>
    // </Link>
  );
}

export default EachPost;
