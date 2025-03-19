import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import DealsListAuth from "../components/DealListAuth";

function AuthenticatedHomepage() {
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/'; 
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState); 
  };

  return (
    <div className="main-container">
      <div className="game-deal-heading d-flex justify-content-around align-items-center">
        <h1 className='p-2'>Game Deals</h1>
        {token && (
          <div className="dropdown-container">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              User
            </button>
            <div className="dropdown-menu" style={{ display: dropdownOpen ? "block" : "none" }}>
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </div>
          </div>
        )}
      </div>
      <div className="content-container">
        <DealsListAuth />
      </div>
    </div>
  );
}

export default AuthenticatedHomepage;
