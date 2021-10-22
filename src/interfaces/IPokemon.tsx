export interface IPokemon {
  id: number,
  padID?: string,
  name: string,
  imgURL?: string,
  height?: number,
  weight?: number,
  stats?: {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
  },
  type?: string[],
};