import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import DealsList from "../components/DealsList";

function Homepage() {
  return (
    <div className="main-container">
      <h1 className='game-deal-heading'>Game Deals</h1>
      <DealsList />
      <p>Register or Login to view, filter and sort all offers!</p>
      
      <Link to="/register">
        <button>Register</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default Homepage;