import React, { Component } from "react";
import { connect } from "react-redux";
import { searchPokemon, fetchPokemonList } from "../redux";
import { POKEMON_TYPE } from "../config";
import { ucfirst } from "../Helper";

interface ISidebarProps {
  searchPokemon(keyword: string, types: string[]): any,
  fetchPokemonList(): any,
};

interface ISidebarState {
  keyword: string,
  types: string[]
};

class Sidebar extends Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props);

    this.state = {
      keyword: "",
      types: []
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

  onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newArray = [...this.state.types];

    if(e.target.checked) {
      newArray.push(e.target.value);
    } else {
      newArray = newArray.filter((data: string) => {
        return data != e.target.value;
      });
    }

    this.setState({
      types: newArray
    }, () => {
      this.props.searchPokemon(this.state.keyword, this.state.types);
    });
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(this.state.keyword == "") {
      this.props.fetchPokemonList();
    } else {
      this.props.searchPokemon(this.state.keyword, this.state.types);
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
            <input
              type="text"
              name="pSearch"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              onChange={this.onKeywordChange} />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">
                <i className="fas fa-search fa-btn-group"></i>
              </button>
            </div>
          </div>
        </form>

        <div className="sidebar-filter">
          Type
          <div className="sidebar-checkbox-wrapper">
            { POKEMON_TYPE.map((data: string, index: number) => {
              return (
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name={"p" + ucfirst(data)} value={data} onChange={this.onCheckboxChange} />
                  <label className="form-check-label">
                    {ucfirst(data)}
                  </label>
                </div>
              );
            }) }
          </div>
        </div>
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
    searchPokemon: (keyword: string, types: string[]) => dispatch(searchPokemon(keyword, types)),
    fetchPokemonList: () => dispatch(fetchPokemonList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);