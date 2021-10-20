import React, { Component } from "react";
import * as PokemonDataSource from "../../api/PokemonSource";
import { IPokemonNameResults } from "../../interfaces/IApiResults";
import { IPokemon } from "../../interfaces/IPokemon";

interface IHomeProps {

};

interface IHomeState {
  isLoading: boolean,
  totalData: number,
  limit: number
};

let allPokemon: IPokemon[] = [];

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      isLoading: true,
      totalData: 0,
      limit: 10
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
                this.setState({
                  isLoading: false
                }, () => {
                  console.log("all pokemon", allPokemon);
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
            console.log("response data", response.data);
            let newPokemon: IPokemon = {
              id: response.data.id,
              name: response.data.name,
              imgURL: response.data.sprites.other.dream_world.front_default
            };

            allPokemon.push(newPokemon);
          }
        } else {
          // show modal
        }
      })
      .catch((ex) => {
        // show modal
        reject();
      })
      .finally(() => {
        resolve(1);
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

export default Home;