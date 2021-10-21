import axios from "axios";
import { POKE_API, POKE_GRAPHQL } from "../config";

const conn = axios.create({
  baseURL: POKE_API,
  headers: {}
});

export const fetchAllPokemon = async (limit: number) => {
  return await conn.get("pokemon/?limit=" + limit);
}

export const fetchPokemonGraphQL = async (pQuery: string) => {
  return await axios.post(POKE_GRAPHQL, { query: pQuery });
}

export const fetchPokemon = async (name: string) => {
  return await conn.get("pokemon/" + name);
}