import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard'; 

function Favorites() {
  const favorites = useSelector(state => state.favorites);

  if (!favorites || favorites.length === 0) {
    return <p>No favorite movies yet.</p>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {favorites.map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={movie.image}
          date={movie.date}
        />
      ))}
    </div>
  );
}

export default Favorites;
