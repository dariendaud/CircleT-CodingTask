import React, { Component } from "react";
import { connect } from "react-redux";
import { saveAllPokemon } from "../../redux";
import { TOTAL_POKEMON } from "../../config";
import * as PokemonDataSource from "../../api/PokemonSource";
import { IPokemonNameResults } from "../../interfaces/IApiResults";
import { IPokemon } from "../../interfaces/IPokemon";

interface IHomeProps {
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
      limit: TOTAL_POKEMON,
      listPokemon: [],
    };
  }

  componentDidMount() {
    this.fetchAllPokemon();
  }

  fetchAllPokemon = () => {
    let getPokemon = null;

    PokemonDataSource.fetchAllPokemon(this.state.limit)
      .then((response) => {
        if(response.status == 200) {
          if(response.data != null) {
            let arrPromise: Promise<any>[] = [];

            let listPokemon = response.data.results;
            listPokemon.map((data: IPokemonNameResults, index: number) => {
              getPokemon = this.fetchPokemon(data.name)
              arrPromise.push(getPokemon);
            });

            Promise.all(arrPromise)
              .then(() => {
                
              })
              .catch(() => {

              })
              .finally(() => {
                this.props.saveAllPokemon(allPokemon);

                this.setState({
                  isLoading: false
                });
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

      });
  }

  fetchPokemon = (name: string) => {
    return new Promise((resolve, reject) => {
      PokemonDataSource.fetchPokemon(name)
      .then((response) => {
        if(response.status == 200) {
          if(response.data != null) {
            let newPokemon: IPokemon = {
              id: response.data.id,
              name: response.data.name,
              imgURL: response.data.sprites.other.dream_world.front_default
            };

            allPokemon.push(newPokemon);
          }
          resolve(1);
        } else {
          // show modal
          reject();
        }
      })
      .catch((ex) => {
        // show modal
        reject();
      })
      .finally(() => {
        
      });
    });
  }

  render() {
    return(
      <div>
        <h2>Home</h2>
        {this.state.isLoading ? "loading..." : "done!"}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (Home);