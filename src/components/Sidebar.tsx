import React, { Component } from "react";
import { connect } from "react-redux";
import { searchPokemonByName } from "../redux";

interface ISidebarProps {
  searchPokemonByName(keyword: string): any,
};

interface ISidebarState {
  keyword: string
};

class Sidebar extends Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props);

    this.state = {
      keyword: ""
    };
  }

  onClickBtnSidebar = () => {
    let sidebar = document.querySelector(".sidebar")!;
    sidebar.classList.toggle("active");
  }

  onSubmit = () => {
    
  }

  render() {
    return (
      <div className="sidebar active">
        <div className="logo-content mb-2">
          <div className="logo">
            <div className="logo-name">Filter</div>
          </div>
          <i className="fas fa-bars" id="btn-sidebar" onClick={() => this.onClickBtnSidebar()}></i>
        </div>

        <form className="form-inline my-2 my-lg-0 ml-auto pl-4" onSubmit={() => this.onSubmit()}>
          <div className="input-group mb-3">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-prepend">
              <button type="submit" className="btn btn-outline-secondary">
                <i className="fas fa-search fa-btn-group"></i>
              </button>
            </div>
          </div>
        </form>

        <ul className="nav-list">
          <li>
            <span className="links-name">Type</span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: ISidebarState) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchPokemonByName: (payload: string) => dispatch(searchPokemonByName(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);