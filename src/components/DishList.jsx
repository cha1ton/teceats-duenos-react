import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DishList = () => {
  const { restaurantId } = useParams(); // Obtener el ID del restaurante desde la URL
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/dishes/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setDishes(response.data);
      } catch (error) {
        console.error('Error al obtener los platos', error);
      }
    };

    fetchDishes();
  }, [restaurantId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Platos del Restaurante</h2>
      <div className="row">
        {dishes.map((dish) => (
          <div className="col-md-4 mb-4" key={dish.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text">{dish.description}</p>
                <p className="card-text">Precio: ${dish.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishList;