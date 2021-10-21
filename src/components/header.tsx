import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light navbar-border-bottom background-color-theme">
        <Link className="navbar-brand" to="/">
          <img src={process.env.PUBLIC_URL + '/image/pokeball.png'} width="50px" />
          <span className="logo-title">Pokedex</span>
        </Link>
      </nav>
    );
  }
}

export default Header;