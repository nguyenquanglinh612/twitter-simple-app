import React, { useContext } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import AppContext from "./AppContext";

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;

  const handleSignOut = () => {
    localStorage.removeItem("token");

    // Reset User
    dispatch({ type: "CURRENT_USER", payload: null });
  };
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">Twitter</Link>
      </h1>
      <nav>
        <ul className="main-nav">
          {user ? (
            <>
              <li>
                <span className="user-name">Hello, {user.userName}</span>
              </li>
              <li>
                <span className="sign-out" onClick={handleSignOut}>
                  Sign out
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
