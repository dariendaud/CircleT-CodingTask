import React, { Component } from "react";
import * as PokemonDataSource from "../../api/PokemonSource";
import { ResultPokemonName, ResultPokemonDetails } from "../../types/ApiResultTypes";

interface IHomeProps {

};

interface IHomeState {
  isLoading: boolean,
  totalData: number,
  limit: number
};

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
            listPokemon.map((data: ResultPokemonName, index: number) => {
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