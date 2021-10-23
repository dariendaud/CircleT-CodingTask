import React, { Component } from "react";
import { connect } from "react-redux";
import { searchPokemon, onChangeFilter, onChangeKeyword } from "../redux";
import { POKEMON_TYPE } from "../config";
import { ucfirst } from "../Helper";
import { ISearchParam } from "../interfaces/IParameter";

interface ISidebarProps {
  currentPage: number,
  search: ISearchParam,
  searchPokemon(param: ISearchParam): any,
  onChangeFilter(types: string[]): any,
  onChangeKeyword(keyword: string): any,
};

interface ISidebarState {
  keyword: string,
  types: string[],
  currentPage: number,
  search: ISearchParam,
};

class Sidebar extends Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props);

    this.state = {
      keyword: "",
      types: [],
      currentPage: 1,
      search: {
        keyword: "",
        types: [],
        page: 1,
      }
    };
  }

  onClickBtnSidebar = () => {
    let sidebar = document.querySelector(".sidebar")!;
    sidebar.classList.toggle("active");
  }

  onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeKeyword(e.target.value);
  }

  onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newArray = [...this.props.search.types];

    if(e.target.checked) {
      newArray.push(e.target.value);
    } else {
      newArray = newArray.filter((data: string) => {
        return data != e.target.value;
      });
    }

    this.props.onChangeFilter(newArray);

    let param: ISearchParam = {
      keyword: this.props.search.keyword,
      types: newArray,
      page: 1,
    };

    this.props.searchPokemon(param);
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let param: ISearchParam = {
      keyword: "",
      types: [],
      page: 1,
    };

    if(this.props.search.keyword == "") {
      this.props.searchPokemon(param);
    } else {
      param.keyword = this.props.search.keyword;
      param.types = this.state.types;

      this.props.searchPokemon(param);
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
              value={this.props.search.keyword}
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={"p" + ucfirst(data)}
                    value={data}
                    onChange={this.onCheckboxChange}
                    checked={this.props.search.types.includes(data)}
                  />
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
    currentPage: state.currentPage,
    search: state.search,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchPokemon: (param: ISearchParam) => dispatch(searchPokemon(param)),
    onChangeFilter: (types: string[]) => dispatch(onChangeFilter(types)),
    onChangeKeyword: (keyword: string) => dispatch(onChangeKeyword(keyword)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);