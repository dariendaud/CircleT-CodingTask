import { POKE_API } from "../config";

const conn = require('axios').default;
const baseURL = POKE_API;

const axios = conn.create({
  baseURL: baseURL,
  withCredential: false,
  crossDomain: true,
  headers: {}
});

export const fetchAllPokemon = async (limit: number) => {
  return await axios.get("pokemon/?limit=" + limit);
}

export const fetchPokemon = async (name: string) => {
  return await axios.get("pokemon/" + name);
}