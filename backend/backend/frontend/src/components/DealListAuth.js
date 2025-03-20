import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const DealsListAuth = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const [storeFilter, setStoreFilter] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const valid_store_ids = ['1', '7', '11'];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/deals/')
      .then((response) => response.json())
      .then((data) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  let filteredDeals = deals.filter(deal => valid_store_ids.includes(deal.store_id));

  if (storeFilter) {
    filteredDeals = filteredDeals.filter(deal => deal.store_id === storeFilter);
  }

  if (priceRange) {
    filteredDeals = filteredDeals.filter(deal => {
      const price = parseFloat(deal.sale_price);
      if (priceRange === "1-50") return price >= 1 && price <= 50;
      if (priceRange === "50-100") return price > 50 && price <= 100;
      if (priceRange === "100+") return price > 100;
      return true;
    });
  }

  const sortDeals = (deals, criteria, order) => {
    return deals.sort((a, b) => {
      let compareA = 0;
      let compareB = 0;

      if (criteria === "price") {
        compareA = parseFloat(a.sale_price);
        compareB = parseFloat(b.sale_price);
      } else if (criteria === "savings") {
        compareA = parseFloat(a.original_price) - parseFloat(a.sale_price);
        compareB = parseFloat(b.original_price) - parseFloat(b.sale_price);
      } else if (criteria === "deal_rating") {
        compareA = parseFloat(a.deal_rating || 0);
        compareB = parseFloat(b.deal_rating || 0);
      }

      return order === "asc" ? compareA - compareB : compareB - compareA;
    });
  };

  const sortedDeals = sortDeals(filteredDeals, sortBy, sortOrder);

  const visibleDeals = sortedDeals.slice(0, visibleCount);

  return (
    <div className='deal-container'>
      <div className="filters d-flex justify-content-center mb-3 flex-md-row flex-column">
        <select className="form-select mx-2 my-md-0 my-2" value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}>
          <option value="">All Stores</option>
          <option value="1">Steam</option>
          <option value="7">Gog</option>
          <option value="11">Humble</option>
        </select>

        <select className="form-select mx-2 my-md-0 my-2" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Price Range</option>
          <option value="1-50">1 - 50$</option>
          <option value="50-100">50 - 100$</option>
          <option value="100+">100$+</option>
        </select>
        <select className="form-select mx-2 my-md-0 my-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price">Sort by Price</option>
          <option value="savings">Sort by Savings</option>
          <option value="deal_rating">Sort by Deal Rating</option>
        </select>
        <select className="form-select mx-2 my-md-0 my-2" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button className="btn btn-dark mx-2 my-md-0 my-2" onClick={() => {
          setStoreFilter("");
          setPriceRange("");
        }}>
          Reset Filters
        </button>
      </div>
 
      <ul className="d-flex row list-unstyled">
        {visibleDeals.map((deal) => (
          <li key={deal.id} className="col-xl-3 col-12 d-flex justify-content-center align-items-center">
            <Link to={`/deals/${deal.id}`} className="deal-card">
            <div className={`deal-img ${deal.store_id === '1' ? 'steam-bg' : deal.store_id === '7' ? 'gog-bg' : deal.store_id === '11' ? 'humble-bg' : 'default-bg'}`}>          
            <img src={deal.thumb_url} alt={deal.title} />
              </div>
              <div className='p-2'>
                <p className={`deal-card-title ${deal.store_id === '1' ? 'steam-c' : deal.store_id === '7' ? 'gog-c' : deal.store_id === '11' ? 'humble-c' : 'default-c'}`}>{deal.title}</p>
                <p className='sale-price'>{deal.sale_price}$</p>
                <p className={`original-price ${deal.store_id === '1' ? 'steam-c' : deal.store_id === '7' ? 'gog-c' : deal.store_id === '11' ? 'humble-c' :'default-c'}`}>Instead of {deal.original_price}$</p>
                </div>
            </Link>
          </li>
        ))}
      </ul>

      {visibleCount < sortedDeals.length && (
        <div className="text-center mt-3">
          <button className="btn btn-outline-dark m-2 px-5 btn-lg" onClick={() => setVisibleCount(prev => prev + 8)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default DealsListAuth;
