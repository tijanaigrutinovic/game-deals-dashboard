import React, { useState, useEffect } from 'react';

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>Deals</h2>
      <ul>
      {deals.map((deal) => (
        <li key={deal.deal_id}>
            <h3>{deal.title}</h3>
            <p>{deal.store_id}</p>
            <p>{deal.original_price}</p>
            <p>{deal.sale_price}</p>
            <p>{deal.deal_rating}</p>
            <p>{deal.is_on_sale ? "On Sale" : "Not on Sale"}</p>
            <img src={deal.thumb_url} alt={deal.title} />
        </li>
        ))}
      </ul>
    </div>
  );
};
export default DealsList;
