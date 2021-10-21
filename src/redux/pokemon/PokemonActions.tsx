import { SAVE_ALL_POKEMON, SAVE_POKEMON_ID } from "./PokemonTypes";
import { IPokemon } from "../../interfaces/IPokemon";

export const saveAllPokemon = (payload: IPokemon[]) => {
  return {
    type: SAVE_ALL_POKEMON,
    payload: payload
  };
};

export const savePokemonID = (payload: number) => {
  return {
    type: SAVE_POKEMON_ID,
    payload: payload
  };
};