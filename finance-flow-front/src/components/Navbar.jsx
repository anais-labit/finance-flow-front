import React, { useState } from 'react';
import '../assets/css/Navbar.css';


function Navbar({ setIsConnected }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    
    setIsConnected(false);
  };

  return (
    <nav className="navbar">
      <h1>Finance Flow</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {/* Autres liens de navigation ici */}
    </nav>
  );
}

export default Navbar;
