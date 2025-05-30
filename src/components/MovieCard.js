import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Actions/Actions"; 

function MovieCard(props) {
  const dispatch = useDispatch();

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
    <Card style={{ width: '18rem' }} className="m-3 shadow-sm position-relative">
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} alt={props.title} />
      
      <i
        className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}
        onClick={handleToggleFavorite}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "1.5rem",
          color: isFavorite ? "red" : "gray",
          cursor: "pointer"
        }}
      ></i>

      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          Release Date: {props.date}
        </Card.Text>
        <Button as={Link} to={`/movies/${props.id}`} variant="success">
          Show Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
