import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";
import Posts from "../components/Posts";

function MyRecipes() {
  const [posts, setPosts] = useState(null);
  const { user } = useContext(LoginContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get("https://recipe-app-kappa-nine.vercel.app/account/recipes", config)
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !posts ? (
    <div>Loading...</div>
  ) : posts.length > 0 ? (
    <Posts data={posts} />
  ) : (
    <div>No Posts yet</div>
  );
}

export default MyRecipes;
