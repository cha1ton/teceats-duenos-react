import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDish = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [restaurantId, setRestaurantId] = useState(null); // ID del restaurante asociado al usuario
  const navigate = useNavigate();

  // Obtener el ID del restaurante asociado al usuario actual
  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const user = JSON.parse(localStorage.getItem('user'));

        // Obtener el restaurante asociado al usuario
        const response = await axios.get(`http://localhost:8000/api/restaurants/?user=${user.id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        // Verificar si el usuario tiene un restaurante asociado
        if (response.data.length > 0) {
          setRestaurantId(response.data[0].id); // Establecer el ID del primer restaurante asociado
        } else {
          console.error('El usuario no tiene un restaurante asociado');
        }
      } catch (error) {
        console.error('Error al obtener el restaurante asociado', error);
      }
    };

    fetchRestaurantId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      console.error('No se encontró un restaurante asociado al usuario');
      return;
    }

    try {
      const access_token = localStorage.getItem('access_token');
      await axios.post(
        'http://localhost:8000/api/restaurants/dishes/',
        {
          name,
          description,
          price: parseFloat(price),
          restaurant: restaurantId, // Enviar el ID del restaurante
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      navigate('/add-restaurant');
    } catch (error) {
      console.error('Error al agregar plato', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Plato</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default AddDish;