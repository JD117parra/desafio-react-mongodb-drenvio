import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Articulos from './pages/Articulos';
import Subida from './pages/Subida';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1>Tienda Drenvío</h1>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/articulos" className="nav-link">Artículos</Link>
              </li>
              <li className="nav-item">
                <Link to="/subida" className="nav-link">Subida</Link>
              </li>
            </ul>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Articulos />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/subida" element={<Subida />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;