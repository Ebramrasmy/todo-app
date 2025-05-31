import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "81858cb5fd4b0e627d19e5302d465822",
  },
});

export default axiosInstance;
