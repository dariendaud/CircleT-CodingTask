import { SAVE_ALL_POKEMON } from "./PokemonTypes";
import { IPokemonState } from "../../interfaces/IReduxState";
import { ISaveAllPokemonAction } from "../../interfaces/IReduxAction";

const initialState = {
  allPokemon: []
};

const pokemonReducer = (state: IPokemonState = initialState, action: ISaveAllPokemonAction) => {
  switch(action.type) {
    case SAVE_ALL_POKEMON:
      return {
        ...state,
        allPokemon: action.payload
      };
      break;
    default:
      return state;
      break;
  }
}

export default pokemonReducer;