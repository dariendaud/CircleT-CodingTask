export interface IPokemonListResults {
  id: number,
  name: string,
  pokemon_v2_pokemonsprites: {
    sprites: string
  }[]
};

export interface IPokemonTypesResults {
  slot: number,
  type: {
    name: string,
    url: string
  },
};