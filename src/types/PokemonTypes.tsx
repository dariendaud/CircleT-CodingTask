export type Pokemon = {
  id: number,
  name: string,
  imgURL: string,
  stats: {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
  },
  type: number,
  typeDesc: string
};