import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container,  Row, Col, Badge, Button } from "react-bootstrap";

function MovieDetails() {
  const { id } = useParams();
  const history = useHistory(); 

  const [movie, setMovie] = useState([]);

 useEffect(() => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {api_key: "81858cb5fd4b0e627d19e5302d465822"}
    })
    .then((res) => setMovie(res.data))
    .catch((err) => console.error("Error fetching movie details", err));
}, [id]);


  if (!movie) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <Row className="align-items-start">
        <Col md={5}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={7}>
          <h2>{movie.title}</h2>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> <Badge bg="info">{movie.release_date}</Badge></p>
          <p><strong>Rating:</strong> <Badge bg="warning" text="dark">{movie.vote_average}</Badge></p>
          <p><strong>Votes Count:</strong> {movie.vote_count}</p>
          {movie.genres && (
            <div className="mb-2">
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => (
                <Badge key={genre.id} bg="secondary" className="me-1">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          <Button variant="dark" className="mt-4" onClick={() => history.push("/movies")}>
            Back to List
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
