import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Actions/Actions";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../locales";

function MovieCard(props) {
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);
  const t = translations[language].moviesList;

  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((movie) => movie.id === props.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({
      id: props.id,
      title: props.title,
      image: props.image,
      date: props.date,
    }));
  };

  return (
    <Card style={{ width: '18rem' }} className="m-3 shadow-sm position-relative" dir={language === "ar" ? "rtl" : "ltr"}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} alt={props.title} />
      
      <i
        className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}
        onClick={handleToggleFavorite}
        style={{
          position: "absolute",
          top: "10px",
          right: language === "ar" ? "unset" : "10px",
          left: language === "ar" ? "10px" : "unset",
          fontSize: "1.5rem",
          color: isFavorite ? "red" : "gray",
          cursor: "pointer"
        }}
      ></i>

      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {t.releaseDate}: {props.date}
        </Card.Text>
        <Button as={Link} to={`/movies/${props.id}`} variant="success">
          {t.showDetails}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
