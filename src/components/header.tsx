import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light navbar-border-bottom background-color-theme ps-4">
          <Link className="navbar-brand text-center" to="/">
            <img src={process.env.PUBLIC_URL + '/image/pokeball.png'} width="50px" />
          </Link>

          <span className="logo-title ms-4">Pokedex</span>

          <Link className="navbar-brand text-center" to="/details">
            Details
          </Link>
      </nav>
    );
  }
}

export default Header;