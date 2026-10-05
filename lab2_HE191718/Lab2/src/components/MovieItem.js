function MovieItem({ movie, onToggleFavorite }) {
  return (
    <li className="movie-item">
      <button
        type="button"
        className={movie.favorite ? "star-btn active" : "star-btn"}
        aria-label={movie.favorite ? `Bỏ yêu thích ${movie.title}` : `Yêu thích ${movie.title}`}
        onClick={() => onToggleFavorite(movie.id)}
      >
        ★
      </button>

      <div className="movie-card">
        <div className="movie-card-header">
          <h3 className="movie-card-title">{movie.title}</h3>
          <span className="movie-rating">⭐ {movie.rating}</span>
        </div>

        <div className="movie-card-meta">
          <span>Thể loại: {movie.genre}</span>
          <span>Năm: {movie.year}</span>
        </div>

        <div className="movie-card-actions">
          <button
            type="button"
            className={movie.favorite ? "favorite-toggle active" : "favorite-toggle"}
            onClick={() => onToggleFavorite(movie.id)}
          >
            {movie.favorite ? "Bỏ thích" : "Yêu thích"}
          </button>

          <button type="button" className="detail-button">
            Chi tiết phim
          </button>
        </div>
      </div>
    </li>
  );
}

export default MovieItem;
