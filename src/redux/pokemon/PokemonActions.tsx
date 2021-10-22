import * as PokemonTypes from "./PokemonTypes";
import * as PokemonDataSource from "../../api/PokemonSource";
import { MAX_POKEMON, BASE_URL_IMG } from "../../config";
import { ucfirst } from "../../Helper";

import { IPokemon } from "../../interfaces/IPokemon";
import { IPokemonListResults } from "../../interfaces/IApiResults";

export const fetchAPI = () => {
  return {
    type: PokemonTypes.FETCH_API
  };
}

export const savePokemonID = (payload: number) => {
  return {
    type: PokemonTypes.SAVE_POKEMON_ID,
    payload: payload
  };
};

export const searchPokemonByName = (payload: string) => {
  let result = searchPokemon();
  return {
    type: PokemonTypes.SEARCH_POKEMON_BY_NAME,
    payload: payload
  };
};

export const fetchPokemonSuccess = (payload: IPokemon[]) => {
  return {
    type: PokemonTypes.FETCH_POKEMON_SUCCESS,
    payload: payload
  };
}

export const fetchPokemonFailed = (payload: string) => {
  return {
    type: PokemonTypes.FETCH_POKEMON_FAILED,
    payload: payload
  };
}

export const fetchPokemonList = () => {
  return (dispatch: any) => {
    dispatch(fetchAPI());

    let listPokemon: IPokemon[] = [];
    let query = `
        query pokemon {
          pokemon_v2_pokemon(limit: ` + MAX_POKEMON + `) {
            id
            name
          }
        }
      `;

    PokemonDataSource.fetchPokemonGraphQL(query)
      .then((response: any) => {
        if (response.status == 200) {
          if (response.data != null) {
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

            dispatch(fetchPokemonSuccess(listPokemon));
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
  };
}

function searchPokemon() {
  // call API
  return "test";
}