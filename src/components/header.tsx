import React, { Component } from "react";
import { connect } from "react-redux";
import { searchPokemon } from "../redux";
import { ISearchParam } from "../interfaces/IParameter";

interface IHeaderProps {
  searchPokemon(param: ISearchParam): any
};

interface IHeaderState {

};

class Header extends Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
      
    };
  }

  onClickLogo = () => {
    let param: ISearchParam = {
      keyword: "",
      types: [],
      page: 1.
    };
    
    this.props.searchPokemon(param);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light navbar-border-bottom background-color-theme">
        <a className="navbar-brand cursor-pointer" onClick={() => this.onClickLogo()}>
          <img src={process.env.PUBLIC_URL + '/image/pokeball.png'} width="50px" />
          <span className="logo-title">Pokedex</span>
        </a>
      </nav>
    );
  }
}

const mapStateToProps = (state: IHeaderState) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchPokemon: (param: ISearchParam) => dispatch(searchPokemon(param)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Header);