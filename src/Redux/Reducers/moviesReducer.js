import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../Actions/movieActions";

const initialState = {
  loading: false,
  movies: [],
  error: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MOVIES_SUCCESS:
      return { loading: false, movies: action.payload, error: null };
    case FETCH_MOVIES_FAILURE:
      return { loading: false, movies: [], error: action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
