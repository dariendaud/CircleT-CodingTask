import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPokemonList, savePokemonID } from "../../redux";
import { IPokemon } from "../../interfaces/IPokemon";
import Sidebar from "../../components/Sidebar";

interface IHomeProps extends RouteComponentProps {
  isLoading: boolean,
  listPokemon: IPokemon[],
  fetchPokemonList(): any,
  savePokemonID(payload: number): any,
};

interface IHomeState {
  isLoading: boolean,
  listPokemon: IPokemon[],
};

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      isLoading: true,
      listPokemon: [],
    };
  }

  componentDidMount() {
    this.props.fetchPokemonList();
  }

  redirectToDetails = (id: number) => {
    this.props.savePokemonID(id);
    this.props.history.push("/details");
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar />

        <div className="content">
          {this.props.isLoading ? "loading props..." : "props done!"}
          <div className="row">
            {
              this.props.listPokemon.map((data: IPokemon, index: number) => {
                return (
                  <div className="col-md-4 col-12 card-wrapper" key={"pokemon-" + data.id}>
                    <div className="card-content" onClick={() => this.redirectToDetails(data.id)}>
                      <div className="card-img">
                        <img src={data.imgURL} width="100%" />
                      </div>
                      <div className="card-title">
                        {data.name}
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state: IHomeState) => {
  return {
    isLoading: state.isLoading,
    listPokemon: state.listPokemon
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPokemonList: () => dispatch(fetchPokemonList()),
    savePokemonID: (payload: number) => dispatch(savePokemonID(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Home));