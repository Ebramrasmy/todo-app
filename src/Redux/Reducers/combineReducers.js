// Reducers/combineReducers.js
import { combineReducers } from "redux";
import favoritesReducer from "./favoritsReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  moviesState: moviesReducer, 
});

export default rootReducer;
