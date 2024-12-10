import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AddRestaurant from './components/AddRestaurant';
import AddDish from './components/AddDish';
import RestaurantList from './components/RestaurantList';
import DishList from './components/DishList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/add-dish" element={<AddDish />} />
        <Route path="/restaurants" element={<RestaurantList />} /> {/* Ruta para la lista de restaurantes */}
        <Route path="/restaurants/:restaurantId/dishes" element={<DishList />} /> {/* Ruta para los platos de un restaurante */}
      </Routes>
    </Router>
  );
}

export default App;