function MovieItem({ movie, isSelected, onSelect, onToggleFavorite }) {
  return (
    <li className={isSelected ? "movie-item selected" : "movie-item"}>
      <button type="button" className="movie-card" onClick={() => onSelect(movie.id)}>
        <div className="movie-card-header">
          <span className="movie-card-title">{movie.title}</span>
          <span className="movie-rating">★ {movie.rating}</span>
        </div>
        <div className="movie-card-meta">
          <span>{movie.genre}</span>
          <span>{movie.year}</span>
        </div>
      </button>
      <button
        type="button"
        className={movie.favorite ? "favorite-toggle active" : "favorite-toggle"}
        aria-label={movie.favorite ? `Bỏ yêu thích ${movie.title}` : `Yêu thích ${movie.title}`}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite(movie.id);
        }}
      >
        {movie.favorite ? "♥" : "♡"}
      </button>
    </li>
  );
}

export default MovieItem;
