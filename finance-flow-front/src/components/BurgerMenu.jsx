import React from "react";
import "../assets/css/BurgerMenu.css";

function BurgerMenu({ onClick }) {
  return (
    <button className="burger-menu" onClick={onClick}>
      More Details
    </button>
  );
}

export default BurgerMenu;
