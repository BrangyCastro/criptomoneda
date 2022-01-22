import React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary mb-5">
      <div className="container">
        <div className="navbar-brand">
          <img
            src="https://ictelecom.es/wp-content/uploads/2018/11/bitcoin-3125488_960_720.png"
            alt=""
            width="50"
            height="50"
            className="d-inline-block align-text-top"
          />
          <span>Criptomonedas</span>
        </div>
      </div>
    </nav>
  );
};
