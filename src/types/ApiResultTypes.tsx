export type ResultPokemonName = {
  name: string,
  url: string
};

export type ResultPokemonDetails = {
  id: number,
  name: string,
  sprites: {
    other: {
      official_artwork: {
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