import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios"; 

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/movie/popular", {
        params: {api_key: "81858cb5fd4b0e627d19e5302d465822", },
      })
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching movies", err);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Popular Movies</h2>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} md={4} lg={3}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              image={movie.poster_path}
              date={movie.release_date}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MoviesList;
