import React from "react";

function Posts({ data }) {
  console.log(data);
  return (
    <div className="posts">
      {data.map((recipe) => {
        return (
          <div className="post-container" key={recipe._id}>
            <div className="recipe-details">
              <div className="recipe-name">{recipe.name}</div>
              <div className="recipe-description">{recipe.description}</div>
              <div className="recipe-time">{recipe.cooking_time}</div>
            </div>
            <div className="recipe-image">
              <img src={recipe.image_url} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
