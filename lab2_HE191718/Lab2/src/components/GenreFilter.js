function GenreFilter({ genres, selectedGenre, onSelect }) {
  return (
    <div className="genre-filter" aria-label="Lọc phim theo thể loại">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={selectedGenre === genre ? "genre-btn active" : "genre-btn"}
          onClick={() => onSelect(genre)}
        >
          {genre === "all" ? "Tất cả" : genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
