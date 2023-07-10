import React from "react";
import { Link } from "react-router-dom";

function Posts({ data }) {
  return (
    <div className="posts">
      {data.map((recipe) => {
        return (
          <Link to={`/recipe/${recipe._id}`} state={recipe} key={recipe._id}>
            <div className="post-container">
              <div className="recipe-details">
                <div className="saved-container">
                  <div style={{ width: "90%", display: "grid" }}>
                    <div className="recipe-name">{recipe.name}</div>
                  </div>
                  <i className="far fa-bookmark"></i>
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
          </Link>
        );
      })}
    </div>
  );
}

export default Posts;
