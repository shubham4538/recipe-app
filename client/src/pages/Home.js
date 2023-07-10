import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";
import Posts from "../components/Posts";

function Home() {
  const [posts, setPosts] = useState(null);
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .get("https://recipe-app-kappa-nine.vercel.app/recipe", config)
        .then((result) => {
          setPosts(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return !posts ? (
    <div>Loading...</div>
  ) : posts.length > 0 ? (
    <Posts data={posts} />
  ) : (
    <div>No Posts yet</div>
  );
}

export default Home;
