import { combineReducers } from "redux";
import favoritesReducer from "./Reducer";

export default combineReducers({
    favorites: favoritesReducer,
})
