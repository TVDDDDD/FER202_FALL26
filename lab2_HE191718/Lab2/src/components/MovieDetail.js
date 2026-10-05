function MovieDetail({ movie, onToggleFavorite }) {
  if (!movie) {
    return (
      <div className="movie-detail empty" aria-live="polite">
        Không tìm thấy phim phù hợp.
      </div>
    );
  }

  return (
    <article className="movie-detail">
      <div className="movie-detail-header">
        <div>
          <h2>{movie.title}</h2>
        </div>
        <span className="movie-rating">★ {movie.rating}</span>
      </div>

      <div className="detail-meta">
        <div>
          <span>Genre: </span>
          <strong>{movie.genre}</strong>
        </div>
        <div>
          <span>Year: </span>
          <strong>{movie.year}</strong>
        </div>
        <div>
          <span>Director: </span>
          <strong>{movie.director}</strong>
        </div>
        <div>
          <span>Duration: </span>
          <strong>{movie.duration} minutes</strong>
        </div>
      </div>

      <p className="movie-description">{movie.description}</p>

      <div className="detail-actions">
        <button
          type="button"
          className={movie.favorite ? "detail-action active" : "detail-action"}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {movie.favorite ? "♥ Favorited" : "♡ Add to Favorites"}
        </button>
      </div>
    </article>
  );
}

export default MovieDetail;
