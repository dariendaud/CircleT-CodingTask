import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light navbar-border-bottom background-color-theme ps-4">
        <a className="navbar-brand text-center" href="/">
          <img src={process.env.PUBLIC_URL + '/image/pokeball.png'} width="50px" />
        </a>
        <span className="logo-title ms-4">Pokedex</span>
      </nav>
    );
  }
}

export default Header;