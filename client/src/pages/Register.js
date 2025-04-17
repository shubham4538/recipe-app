import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import background from "../resources/background.jpg";

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
    <div>
      <img
        src={background}
        style={{
          position: "absolute",
          objectFit: "cover",
          height: "100%",
          width: "100%",
          objectPosition: "20% center",
          overflow: "hidden",
        }}
      />
      <div className="auth-box">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>

        <form
          onSubmit={(e) => formSubmit(e)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {error.message && (
            <div className="error">
              <i className="far fa-circle-exclamation"></i>
              <span>{error.message}</span>
            </div>
          )}

          <input
            type="name"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="given-name"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #5c5c5c",
              background: "#f5f5f5",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #5c5c5c",
              backgroundColor: "#f5f5f5",
            }}
          />
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "rgb(24 153 24)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? (
              <i className="fa-duotone fa-spinner-third fa-spin"></i>
            ) : (
              "submit"
            )}
          </button>

          <p style={{ fontSize: "0.9em" }}>
            Already have an Account?{" "}
            <a href="/login" style={{ color: "green", textDecoration: "none" }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
