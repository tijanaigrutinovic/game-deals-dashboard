import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DealDetails = () => {
  const { dealId } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
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
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/deals/${dealId}/`)
      .then((response) => response.json())
      .then((data) => {
        setDeal(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [dealId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="main-container"> 
      <div className="d-flex justify-content-center">
        <div className="col-xl-4 col-12 d-flex justify-content-center align-items-center flex-column detail-container">
          <div className="game-detail-heading d-flex justify-content-between align-items-center p-3">
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
          <div className='pb-3 text-center w-100'>
            <div className={`deal-game-img ${deal.store_id === '1' ? 'steam-bg' : deal.store_id === '7' ? 'gog-bg' : deal.store_id === '11' ? 'humble-bg' : 'default-bg'}`}>          
              <img src={deal.thumb_url} alt={deal.title} />
            </div>
            <div className='p-2'>
              <p className={`game-detail-title mb-0 ${deal.store_id === '1' ? 'steam-c' : deal.store_id === '7' ? 'gog-c' : deal.store_id === '11' ? 'humble-c' : 'default-c'}`}>{deal.title}</p>
              <p>on {deal.store_name}</p> 
            </div>
            <div className='game-detail-content p-2'>
              <p className='font-weight-bold'>- Price: {deal.sale_price}$ <span>Instead of {deal.original_price}$</span></p>
              <p className='font-weight-bold'>- Deal rating: {deal.deal_rating ? deal.deal_rating : "Rating unavailable"}</p>
              <p className='font-weight-bold'>  - Game rating: {deal.steam_rating_text ? deal.steam_rating_text : "Rating unavailable"}</p>
              <p className='font-weight-bold'>- Released: {deal.release_date 
                  ? new Date(deal.release_date * 1000).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })
                  : "Release date unavailable"}
              </p>
            </div>
              <Link to="/authenticated-homepage">
                  <button type="button" className="btn btn-outline-dark m-2 px-2">Back to the list</button>
              </Link>
              <Link to={`https://www.metacritic.com${deal.metacritic_link || ""}`}>
                <button type="button" className="btn btn-outline-dark m-2 px-2">View on Store</button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
