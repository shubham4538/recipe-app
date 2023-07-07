import React, { useContext, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Account() {
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  const link = location.pathname;

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, []);

  return !user ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="tab-container">
        <span
          className={
            link.includes("posts")
              ? "icon-container active-tab"
              : "icon-container"
          }
        >
          <Link to={"/account/posts"}>
            <i
              className={
                link.includes("posts") ? "fas fa-grid-2" : "far fa-grid-2"
              }
            ></i>
          </Link>
        </span>
        <hr />
        <span
          className={
            link.includes("saved")
              ? "icon-container active-tab"
              : "icon-container"
          }
        >
          <Link to={"/account/saved"}>
            <i
              className={
                link.includes("saved") ? "fas fa-bookmark" : "far fa-bookmark"
              }
            ></i>
          </Link>
        </span>
      </div>
      <Outlet />
    </div>
  );
}

export default Account;
