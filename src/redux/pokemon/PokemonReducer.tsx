import { SAVE_ALL_POKEMON } from "./PokemonTypes";
import { IPokemonState } from "../../interfaces/IReduxState";
import { ISaveAllPokemonAction } from "../../interfaces/IReduxAction";

const initialState = {
  listPokemon: []
};

const pokemonReducer = (state: IPokemonState = initialState, action: ISaveAllPokemonAction) => {
  switch(action.type) {
    case SAVE_ALL_POKEMON:
      console.log("save all pokemon", action.payload);
      return {
        ...state,
        listPokemon: action.payload
      };
      break;
    default:
      return state;
      break;
  }
}

export default pokemonReducer;