import MovieItem from "./MovieItem";

function MovieList({ movies, onToggleFavorite }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}

export default MovieList;
