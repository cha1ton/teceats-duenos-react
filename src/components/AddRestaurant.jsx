import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:8000/api/restaurants/',
        {
          name,
          address,
          description,
          image_url: imageUrl, // Asegúrate de que la URL de la imagen esté siendo enviada
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log('Restaurante creado exitosamente', response.data);
    } catch (error) {
      console.error('Error al crear el restaurante', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Restaurante</h2>
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
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          <label>URL de la Imagen</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default AddRestaurant;