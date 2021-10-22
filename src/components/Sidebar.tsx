import React, { Component } from "react";
import { connect } from "react-redux";
import { searchPokemon, fetchPokemonList } from "../redux";

interface ISidebarProps {
  searchPokemon(keyword: string): any,
  fetchPokemonList(): any,
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

  onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      keyword: e.target.value
    }, () => {
      console.log("search keyword", this.state.keyword);
    });
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(this.state.keyword == "") {
      this.props.fetchPokemonList();
    } else {
      this.props.searchPokemon(this.state.keyword);
    }
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

        <form className="form-inline my-2 my-lg-0 ml-auto pl-4" onSubmit={this.onSubmit}>
          <div className="input-group mb-3">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={this.onKeywordChange} />
            <div className="input-group-append">
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
    searchPokemon: (payload: string) => dispatch(searchPokemon(payload)),
    fetchPokemonList: () => dispatch(fetchPokemonList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);