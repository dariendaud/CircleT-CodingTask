import * as PokemonTypes from "./PokemonTypes";
import { IPokemon } from "../../interfaces/IPokemon";
import { ISearchParam } from "../../interfaces/IParameter";

interface IReduxAction {
  type: string,
  payload: any
};

interface IReduxState {
  isLoading: boolean,
  allPokemon: IPokemon[],
  listPokemon: IPokemon[],
  pokemonID: number,
  searchKeyword: string,
  errorMessage: string,
  showModal: boolean,
  search: ISearchParam,
};

const initialState = {
  isLoading: false,
  allPokemon: [],
  listPokemon: [],
  pokemonID: 0,
  searchKeyword: "",
  errorMessage: "",
  showModal: false,
  search: {
    keyword: "",
    types: [],
    page: 1,
  }
};

const pokemonReducer = (state: IReduxState = initialState, action: IReduxAction) => {
  let lsPokemon: IPokemon[] = [];
  switch (action.type) {
    case PokemonTypes.CLOSE_MODAL:
      return {
        ...state,
        showModal: false
      };
      break;
    case PokemonTypes.FETCH_API:
      return {
        ...state,
        isLoading: true
      };
      break;
    case PokemonTypes.FETCH_POKEMON_FROM_STORE:
      return {
        ...state,
        isLoading: false,
        listPokemon: state.allPokemon
      };
      break;
    case PokemonTypes.ON_CHANGE_FILTER:
      return {
        ...state,
        search: {
          ...state.search,
          types: action.payload,
        }
      };
      break;
    case PokemonTypes.ON_CHANGE_KEYWORD:
      return {
        ...state,
        search: {
          ...state.search,
          keyword: action.payload,
        }
      };
      break;
    case PokemonTypes.SAVE_POKEMON_ID:
      return {
        ...state,
        pokemonID: action.payload
      }
      break;
    case PokemonTypes.SEARCH_POKEMON_SUCCESS:
      let param = action.payload.param;
      console.log("page", param.page);

      lsPokemon = [];
      lsPokemon = [...state.listPokemon];

      if (param.page > 1) {
        lsPokemon = lsPokemon.concat(action.payload.listPokemon);
      } else {
        lsPokemon = [...action.payload.listPokemon];
      }

      return {
        ...state,
        isLoading: false,
        listPokemon: lsPokemon,
        search: param,
      };
      break;
    case PokemonTypes.SEARCH_POKEMON_FAILED:
      return {
        ...state,
        isLoading: false,
        listPokemon: [],
        errorMessage: action.payload,
        showModal: true
      };
      break;
    default:
      return state;
      break;
  }
}

export default pokemonReducer;