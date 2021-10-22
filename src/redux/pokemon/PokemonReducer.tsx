import * as PokemonTypes from "./PokemonTypes";
import { IPokemon } from "../../interfaces/IPokemon";

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
  errorMessage: string
};

const initialState = {
  isLoading: false,
  allPokemon: [],
  listPokemon: [],
  pokemonID: 0,
  searchKeyword: "",
  errorMessage: ""
};

const pokemonReducer = (state: IReduxState = initialState, action: IReduxAction) => {
  switch(action.type) {
    case PokemonTypes.FETCH_API:
      return{
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
    case PokemonTypes.FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allPokemon: action.payload,
        listPokemon: action.payload
      };
      break;
    case PokemonTypes.FETCH_POKEMON_FAILED:
      return {
        ...state,
        isLoading: false,
        listPokemon: [],
        errorMessage: action.payload
      };
      break;
    case PokemonTypes.SAVE_POKEMON_ID:
      return {
        ...state,
        pokemonID: action.payload
      }
      break;
    case PokemonTypes.SEARCH_POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listPokemon: action.payload
      };
      break;
      case PokemonTypes.SEARCH_POKEMON_FAILED:
        return {
          ...state,
          isLoading: false,
          listPokemon: [],
          errorMessage: action.payload
        };
        break;
    default:
      return state;
      break;
  }
}

export default pokemonReducer;