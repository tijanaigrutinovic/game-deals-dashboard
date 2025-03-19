import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import DealsList from "../components/DealsList";

function Homepage() {
  return (
    <div className="main-container">
    <h1 className='game-deal-heading p-2'>Game Deals</h1>
        <div className="content-container">
            <div >
                <DealsList />
                <div className="p-5 d-flex align-items-center flex-direction-column flex-column">
                    <h4 class="login-text">Register or Login to view, filter and sort all offers!</h4>
                    <div className="d-flex">
                        <Link to="/register">
                            <button type="button" className="btn btn-outline-dark m-2 px-5 btn-lg">Register</button>
                        </Link>

                        <Link to="/login">
                            <button type="button" className="btn btn-outline-dark m-2 px-5 btn-lg">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default Homepage;