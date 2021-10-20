import { SAVE_ALL_POKEMON } from "./PokemonTypes";
import { IPokemon } from "../../interfaces/IPokemon";

export const saveAllPokemon = (payload: IPokemon[]) => {
  return {
    type: SAVE_ALL_POKEMON,
    payload: payload
  };
};