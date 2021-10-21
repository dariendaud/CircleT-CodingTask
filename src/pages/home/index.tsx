import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { saveAllPokemon } from "../../redux";
import { MAX_POKEMON } from "../../config";
import * as PokemonDataSource from "../../api/PokemonSource";
import { IPokemonListResults } from "../../interfaces/IApiResults";
import { IPokemon } from "../../interfaces/IPokemon";
import Sidebar from "../../components/Sidebar";
import { ucfirst } from "../../Helper";

interface IHomeProps extends RouteComponentProps {
  listPokemon: IPokemon[],
  saveAllPokemon(payload: IPokemon[]): any
};

interface IHomeState {
  isLoading: boolean,
  totalData: number,
  limit: number,
  listPokemon: IPokemon[],
};

let allPokemon: IPokemon[] = [];

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
    // if(this.props.listPokemon.length == this.state.limit) {
    //   this.setState({
    //     listPokemon: this.props.listPokemon,
    //     isLoading: false
    //   });
    // } else {
      this.fetchPokemon();
    // }
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
            let padID = "";

            result.map((data: IPokemonListResults, index: number) => {
              padID = String(data.id).padStart(3, "0");
              imgURL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padID + ".png";

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
        }, () => {
          console.log("state listpokemon", this.state.listPokemon);
        });
      });
  }

  render() {
    console.log("isLoading", this.state.isLoading);
    console.log("listpokemon", this.state.listPokemon);
    return (
      <React.Fragment>
        <Sidebar />

        <div className="content">
          <div className="row">
            {
              this.state.listPokemon.map((data: IPokemon, index: number) => {
                return (
                  <div className="col-md-4 col-12 card-wrapper">
                    <div className="card-content">
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
    saveAllPokemon: (payload: IPokemon[]) => dispatch(saveAllPokemon(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Home));