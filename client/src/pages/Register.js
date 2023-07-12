import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    setError({ message: null });
    setLoading(true);
    const data = { username, password };

    axios
      .post("https://recipe-app-kappa-nine.vercel.app/auth/signup", data)
      .then((result) => {
        alert(result.data.success);
        navigate("/login");
      })
      .catch((err) => {
        setError({ message: err.response.data.error });
        setLoading(false);
      });
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>Register</h1>
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

export default SignUp;
