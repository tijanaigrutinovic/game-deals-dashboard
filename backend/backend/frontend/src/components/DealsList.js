import React, { useState, useEffect } from 'react';

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <div className={`deal-img ${deal.store_id === '1' ? 'steam-bg' : deal.store_id === '7' ? 'gog-bg' : deal.store_id === '11' ? 'humble-bg' : 'default-bg'}`}>          
              <img src={deal.thumb_url} alt={deal.title} />
            </div>
            <div className='p-2'>
              <p className={`deal-card-title ${deal.store_id === '1' ? 'steam-c' : deal.store_id === '7' ? 'gog-c' : deal.store_id === '11' ? 'humble-c' : 'default-c'}`}>{deal.title}</p>
              <p className='sale-price'>{deal.sale_price}$</p>
              <p className={`original-price ${deal.store_id === '1' ? 'steam-c' : deal.store_id === '7' ? 'gog-c' : deal.store_id === '11' ? 'humble-c' :'default-c'}`}>Instead of {deal.original_price}$</p>
            </div>
          </div>
        </li>
      ))}
  </ul>
</div>

  );
};
export default DealsList;
