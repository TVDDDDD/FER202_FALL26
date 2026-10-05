import MovieItem from "./MovieItem";

function MovieList({ movies, selectedMovieId, onSelect, onToggleFavorite }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          isSelected={movie.id === selectedMovieId}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}

export default MovieList;
