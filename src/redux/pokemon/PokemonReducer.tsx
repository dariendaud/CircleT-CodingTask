import { SAVE_ALL_POKEMON, SAVE_POKEMON_ID } from "./PokemonTypes";
import { IPokemon } from "../../interfaces/IPokemon";

interface IReduxAction {
  type: string,
  payload: any
};

interface IReduxState {
  listPokemon: IPokemon[],
  pokemonID: number
};

const initialState = {
  listPokemon: [],
  pokemonID: 0,
};

const pokemonReducer = (state: IReduxState = initialState, action: IReduxAction) => {
  switch(action.type) {
    case SAVE_ALL_POKEMON:
      return {
        ...state,
        listPokemon: action.payload
      };
      break;
    case SAVE_POKEMON_ID:
      return {
        ...state,
        pokemonID: action.payload
      }
      break;
    default:
      return state;
      break;
  }
}

export default pokemonReducer;