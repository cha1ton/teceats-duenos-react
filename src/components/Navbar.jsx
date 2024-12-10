import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Restaurant App</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Bienvenido, {user.username}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/restaurants">Restaurantes</Link> {/* Enlace a la lista de restaurantes */}
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-restaurant">Agregar Restaurante</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-dish">Agregar Plato</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;