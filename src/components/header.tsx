import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemonList } from "../redux";

interface IHeaderProps {
  fetchPokemonList(): any
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
    this.props.fetchPokemonList();
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
    fetchPokemonList: () => dispatch(fetchPokemonList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Header);