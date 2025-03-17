import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const valid_store_ids = ['2', '7', '11'];

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
    <div className='deal-container'>
  <ul className="d-flex row list-unstyled">
    {deals
      .filter(deal => valid_store_ids.includes(deal.store_id)) 
      .reduce((acc, deal) => {
      
        if (!acc.some(d => d.store_id === deal.store_id)) {
          acc.push(deal);
        }
        return acc;
      }, [])
      .map((deal) => (
        <li key={deal.deal_id} className="col-xl-4 col-12 d-flex justify-content-center align-items-center">
          <div className="deal-card">
            <div className='deal-img'>
              <img src={deal.thumb_url} alt={deal.title} />
            </div>
            <div className='p-2'>
              <p>{deal.store_name} ({deal.store_id})</p>
              <p className='deal-card-title'>{deal.title}</p>
              <p className='sale-price'>{deal.sale_price}$</p>
              <p className='original-price'>Instead of {deal.original_price}$</p>
            </div>
          </div>
        </li>
      ))}
  </ul>
</div>

  );
};
export default DealsList;
