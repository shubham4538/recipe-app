import React, { useContext, useState } from "react";
import axios from "axios";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [_, setCookies] = useCookies(["access_token"]);
  const { setUser } = useContext(LoginContext);

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };

    axios
      .post("http://localhost:3001/auth/login", data)
      .then((result) => {
        const logUser = {
          token: result.data.token,
          username: result.data.username,
        };
        localStorage.setItem("user", JSON.stringify(logUser));
        setUser(logUser);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={(e) => formSubmit(e)}>
        <h1>Login</h1>
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

export default Login;
