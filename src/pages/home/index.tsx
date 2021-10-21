import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { savePokemonID } from "../../redux";
import { MAX_POKEMON, BASE_URL_IMG } from "../../config";
import * as PokemonDataSource from "../../api/PokemonSource";
import { IPokemonListResults } from "../../interfaces/IApiResults";
import { IPokemon } from "../../interfaces/IPokemon";
import Sidebar from "../../components/Sidebar";
import { ucfirst } from "../../Helper";

interface IHomeProps extends RouteComponentProps {
  listPokemon: IPokemon[],
  savePokemonID(payload: number): any,
};

interface IHomeState {
  isLoading: boolean,
  totalData: number,
  limit: number,
  listPokemon: IPokemon[],
};

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      isLoading: true,
      totalData: 0,
      limit: MAX_POKEMON,
      listPokemon: [],
    };
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = () => {
    let listPokemon: IPokemon[] = [];
    let query = `
      query pokemon {
        pokemon_v2_pokemon(limit: ` + this.state.limit + `) {
          id
          name
        }
      }
    `;

    PokemonDataSource.fetchPokemonGraphQL(query)
      .then((response: any) => {
        if(response.status == 200) {
          if(response.data != null) {
            let result = response.data.data.pokemon_v2_pokemon;
            let imgURL = "";

            result.map((data: IPokemonListResults, index: number) => {
              imgURL = BASE_URL_IMG + data.id + ".png";

              let newPokemon: IPokemon = {
                id: data.id,
                name: ucfirst(data.name),
                imgURL: imgURL
              };
              listPokemon.push(newPokemon);
            });
          }
        } else {
          // show modal
        }
      })
      .catch((ex) => {
        // show modal
      })
      .finally(() => {
        this.setState({
          listPokemon: listPokemon,
          isLoading: false,
        });
      });
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
          <div className="row">
            {
              this.state.listPokemon.map((data: IPokemon, index: number) => {
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
    listPokemon: state.listPokemon
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    savePokemonID: (payload: number) => dispatch(savePokemonID(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Home));