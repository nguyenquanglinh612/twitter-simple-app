import React, { useContext, useState } from "react";
import "../css/Auth.css";
import axios from "axios";
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const options = {
        method: "post",
        url: "/api/v1/auth/register",
        data: userInput,
      };
      const response = await axios(options);
      const { token, userName } = response.data.data;
      localStorage.setItem("token", token);
      dispatch({ type: "CURRENT_USER", payload: { userName } });
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <section className="auth-container">
      <form className="auth-form" onSubmit={onSubmitHandle}>
        <h2>Register New Account</h2>
        {errorMessage &&
          (Array.isArray(errorMessage) ? (
            errorMessage.map((err, index) => (
              <div className="error-message" key={index}>
                Error: {err}
              </div>
            ))
          ) : (
            <div className="error-message">Error: {errorMessage}</div>
          ))}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userInput.name}
          onChange={onChangeHandle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInput.email}
          onChange={onChangeHandle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userInput.password}
          onChange={onChangeHandle}
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}
