import * as PokemonTypes from "./PokemonTypes";
import * as PokemonDataSource from "../../api/PokemonSource";
import { MAX_POKEMON, BASE_URL_IMG } from "../../config";
import { ucfirst } from "../../Helper";

import { IPokemon } from "../../interfaces/IPokemon";
import { IPokemonListResults } from "../../interfaces/IApiResults";
import { ISearchParam } from "../../interfaces/IParameter";

export const closeModal = () => {
  return {
    type: PokemonTypes.CLOSE_MODAL,
  };
};

export const fetchAPI = () => {
  return {
    type: PokemonTypes.FETCH_API
  };
}

export const fetchPokemonFromStore = () => {
  return {
    type: PokemonTypes.FETCH_POKEMON_FROM_STORE
  };
}

export const onChangeFilter = (types: string[]) => {
  return {
    type: PokemonTypes.ON_CHANGE_FILTER,
    payload: types,
  };
}

export const onChangeKeyword = (keyword: string) => {
  return {
    type: PokemonTypes.ON_CHANGE_KEYWORD,
    payload: keyword,
  };
}

export const savePokemonID = (payload: number) => {
  return {
    type: PokemonTypes.SAVE_POKEMON_ID,
    payload: payload
  };
};

export const searchPokemonSuccess = (listPokemon: IPokemon[], param: ISearchParam) => {
  return {
    type: PokemonTypes.SEARCH_POKEMON_SUCCESS,
    payload: {
      listPokemon: listPokemon,
      param: param,
    }
  };
};

export const searchPokemonFailed = (payload: string) => {
  return {
    type: PokemonTypes.SEARCH_POKEMON_FAILED,
    payload: payload
  };
};

export const searchPokemon = (param: ISearchParam) => {
  return (dispatch: any) => {
    dispatch(fetchAPI());

    let listPokemon: IPokemon[] = [];

    let offset: number = (param.page - 1) * MAX_POKEMON;
    
    let whereName = "";
    if(param.keyword != "") {
      whereName = `name: { _ilike: "` + param.keyword + `" },`;
    }

    let whereTypes = "";
    param.types.map((data: string, index: number) => {
      whereTypes += `{
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _eq: "` + data + `" } }
        }
      }`;
    });
    
    let query = `
        query pokemon {
          pokemon_v2_pokemon(
            limit: ` + MAX_POKEMON + `
            offset: ` + offset + `
            where: {
              ` + whereName + `
              _and: [
                ` + whereTypes + `
              ]
            }
          ) {
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

            dispatch(searchPokemonSuccess(listPokemon, param));
          }
        } else {
          // show modal
          dispatch(searchPokemonFailed("Failed to search pokemon"));
        }
      })
      .catch((ex) => {
        // show modal
        dispatch(searchPokemonFailed("Failed to search pokemon"));
      })
      .finally(() => {
        
      });
  };
}