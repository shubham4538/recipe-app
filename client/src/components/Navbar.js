import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LoginContext } from "../context/LoginContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      {user ? (
        <>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/Create">Create</Link>
          </div>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
          </div>
          <div className="links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
