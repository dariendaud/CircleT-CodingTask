import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import PokemonReducer from "./pokemon/PokemonReducer";

const store = createStore(PokemonReducer, applyMiddleware(Thunk));

export default store;