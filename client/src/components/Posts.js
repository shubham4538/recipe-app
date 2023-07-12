import React from "react";
import EachPost from "./EachPost";

function Posts({ data }) {
  return (
    <div className="posts">
      {data.map((recipe) => {
        return <EachPost recipe={recipe} key={recipe._id} />;
      })}
    </div>
  );
}

export default Posts;
