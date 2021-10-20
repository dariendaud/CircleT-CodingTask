import { createStore } from "redux";
import PokemonReducer from "./pokemon/PokemonReducer";

const store = createStore(PokemonReducer);

export default store;