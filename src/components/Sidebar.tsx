import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar active">
        <div className="logo-content ">
          <div className="logo">
            <div className="logo-name">Prydwen</div>
          </div>
          <i className="fas fa-bars" id="btn-sidebar"></i>
        </div>

        <ul className="nav-list">
          <li>
            <a className="{{ url('/deck/dashboard') }}">
              <i className="fas fa-th-large"></i>
              <span className="links-name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;