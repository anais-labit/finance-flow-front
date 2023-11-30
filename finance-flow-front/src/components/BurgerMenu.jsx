// BurgerMenu.jsx
import React from 'react';
import '../assets/css/BurgerMenu.css'; // Assurez-vous de créer ce fichier CSS

function BurgerMenu({ onClick }) {
  return (
    <button className="burger-menu" onClick={onClick}>
      More Details
    </button>
  );
}

export default BurgerMenu;
