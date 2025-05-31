import React, { useEffect, useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../locales";

function MovieDetails() {
  const { id } = useParams();
  const history = useHistory(); 
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: "81858cb5fd4b0e627d19e5302d465822",
        language: language,
      },
    })
    .then((res) => {
      setMovie(res.data);
      setLoading(false);
      setError(null);
    })
    .catch(() => {
      setError(t.error);
      setLoading(false);
    });
  }, [id, language, t.error]);

  if (loading) return <p>{t.loading}</p>;
  if (error) return <p>{error}</p>;

  if (!movie) return null;

  return (
    <Container className="mt-5" dir={language === "ar" ? "rtl" : "ltr"}>
      <Row className="align-items-start">
        <Col md={5}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={7}>
          <h2>{language === "ar" && movie.title_ar ? movie.title_ar : movie.title}</h2>
          <p><strong>{t.overview}:</strong> {movie.overview}</p>
          <p><strong>{t.releaseDate}:</strong> <Badge bg="info">{movie.release_date}</Badge></p>
          <p><strong>{t.rating}:</strong> <Badge bg="warning" text="dark">{movie.vote_average}</Badge></p>
          <p><strong>{t.votesCount}:</strong> {movie.vote_count}</p>
          {movie.genres && (
            <div className="mb-2">
              <strong>{t.genres}:</strong>{" "}
              {movie.genres.map((genre) => (
                <Badge key={genre.id} bg="secondary" className="me-1">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          <Button variant="dark" className="mt-4" onClick={() => history.push("/movies")}>
             ← Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
