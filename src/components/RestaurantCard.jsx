import React from 'react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="card shadow-sm">
      {restaurant.image_url && (
        <img src={restaurant.image_url} className="card-img-top" alt={restaurant.name} />
      )}
      <div className="card-body">
        <h5 className="card-title">{restaurant.name}</h5>
        <p className="card-text">{restaurant.description}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;