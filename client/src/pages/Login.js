import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    setError({ message: null });
    setLoading(true);
    const data = { username, password };

    axios
      .post("https://recipe-app-kappa-nine.vercel.app/auth/login", data)
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
        setError({ message: err.response.data.error });
        setLoading(false);
      });
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>Login</h1>
        {error.message ? (
          <div className="error">
            <i className="far fa-circle-exclamation"></i>
            <span>{error.message}</span>
          </div>
        ) : (
          <></>
        )}
        <form onSubmit={(e) => formSubmit(e)} className="form-block">
          <div className="input-container">
            <span>Username</span>
            <div className="button-input">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="given-name"
                required
              />
            </div>
          </div>
          <div className="input-container">
            <span>Password</span>
            <div className="button-input">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="submit-button" type="submit">
            {loading ? (
              <i className="fa-duotone fa-spinner-third fa-spin"></i>
            ) : (
              "submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
