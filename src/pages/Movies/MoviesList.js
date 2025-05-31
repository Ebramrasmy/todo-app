import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../Redux/Actions/movieActions";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../components/MovieCard";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../locales";  

function MoviesList() {
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);
  const t = translations[language].moviesList;

  const { movies, loading, error } = useSelector((state) => state.moviesState);

  useEffect(() => {
    dispatch(fetchMovies(language));
  }, [dispatch, language]);

  if (loading) return <p>{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>;
  if (error) return <p>{language === "ar" ? "حدث خطأ:" : "Error:"} {error}</p>;

  return (
    <Container className="mt-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <h2 className="mb-4">{t.popularMovies}</h2>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} md={4} lg={3}>
            <MovieCard
              id={movie.id}
              title={language === "ar" ? movie.title_ar || movie.title : movie.title}
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
