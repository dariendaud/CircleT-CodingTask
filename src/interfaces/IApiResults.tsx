export interface IPokemonListResults {
  id: number,
  name: string,
  pokemon_v2_pokemonsprites: {
    sprites: string
  }[]
};

export interface IPokemonDetailResults {
  id: number,
  name: string,
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  },
  stats: [{
    base_stat: number,
    stat: {
      name: string,
      url: string
    }
  }],
  types: [{
    type: {
      name: string,
      url: string
    }
  }],
  weight: number
};