import { TOGGLE_FAVORITE } from "../Actions/Actions";

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const exists = state.find((movie) => movie.id === action.payload.id);
      if (exists) {
        return state.filter((movie) => movie.id !== action.payload.id);
      } else {
        return [
          ...state, 
          action.payload];
      }
    default:
      return state;
  }
};

export default favoritesReducer;
