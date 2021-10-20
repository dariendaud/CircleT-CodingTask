import { IPokemon } from "./IPokemon";

export interface ISaveAllPokemonAction {
  type: string,
  payload: IPokemon[]
};