import axiosInstance from "../../Network/axiosInstance";

export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

export const fetchMovies = (language = "en") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });
    try {
      const res = await axiosInstance.get("/movie/popular", {
        params: { language },
      });
      dispatch({ type: FETCH_MOVIES_SUCCESS, payload: res.data.results });
    } catch (error) {
      dispatch({ type: FETCH_MOVIES_FAILURE, payload: error.message });
    }
  };
};