import React from 'react';
import '../assets/css/Navbar.css';

function Navbar({ setIsConnected }) {
  const handleLogout = async () => {

      const response = await fetch("http://localhost/finance-flow-back/index.php", { method: 'POST' });
      if (response.ok) {
        setIsConnected(false);
      }

  };

  return (
    <nav className="navbar">
      <h1>Finance Flow</h1>
      <button onClick={handleLogout} className="logout-button">
        Déconnexion
      </button>
      {/* Autres liens de navigation ici */}
    </nav>
  );
}

export default Navbar;
