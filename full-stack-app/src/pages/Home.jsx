import React from "react";
import { Link } from "react-router-dom";
import "../assets/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Full Stack App</h1>
      <p>Your go-to platform for managing products efficiently.</p>
      <div className="buttons">
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
