import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard'; // Importa el componente RestaurantCard

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/restaurants/', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error al obtener los restaurantes', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Restaurantes</h2>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="col-md-4 mb-4" key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} /> {/* Usa el componente RestaurantCard */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;