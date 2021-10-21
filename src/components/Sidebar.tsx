import React, { Component } from "react";

class Sidebar extends Component {
  onClickBtnSidebar = () => {
    let sidebar = document.querySelector(".sidebar")!;
    sidebar.classList.toggle("active");
  }

  render() {
    return (
      <div className="sidebar active">
        <div className="logo-content ">
          <div className="logo">
            <div className="logo-name">Filter</div>
          </div>
          <i className="fas fa-bars" id="btn-sidebar" onClick={() => this.onClickBtnSidebar()}></i>
        </div>

        <ul className="nav-list">
          <li>
            <span className="links-name">Type</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;