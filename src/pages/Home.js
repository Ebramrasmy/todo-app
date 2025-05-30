import React from "react";
import { useHistory } from "react-router-dom";
import img1 from "../images/imag1.jpg";
import "./Home.css";

function Home() {
  const history = useHistory();

  const goToMovies = () => {
    history.push("/movies");
  };

  return (
    <div className="home-container" onClick={goToMovies}>
      <img src={img1} alt="welcome" className="home-image" />
      <div className="overlay-text">
        <h1>Welcome to MovieApp</h1>
        <p>Click anywhere to explore  movies</p>
      </div>
    </div>
  );
}

export default Home;
