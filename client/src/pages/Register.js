import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };

    axios
      .post("https://recipe-app-kappa-nine.vercel.app/auth/signup", data)
      .then((result) => {
        alert(result.data.success);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={(e) => formSubmit(e)}>
        <h1>SignUp</h1>
        <div className="input-containers">
          <div className="input-container">
            <span>Username</span>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <span>Password</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
