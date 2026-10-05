import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { movies as initialMovies } from "./movies";

function App() {
  const [movies, setMovies] = useLocalStorage(
    "mini-movie-manager-movies",
    initialMovies,
  );
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("rating-desc");

  const genres = useMemo(
    () => ["all", ...new Set(movies.map((movie) => movie.genre))],
    [movies],
  );

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...movies]
      .filter((movie) => {
        const matchesQuery = movie.title.toLowerCase().includes(normalizedQuery);
        const matchesGenre =
          selectedGenre === "all" || movie.genre === selectedGenre;
        return matchesQuery && matchesGenre;
      })
      .sort((firstMovie, secondMovie) => {
        switch (sortBy) {
          case "rating-asc":
            return firstMovie.rating - secondMovie.rating;
          case "year-desc":
            return secondMovie.year - firstMovie.year;
          case "year-asc":
            return firstMovie.year - secondMovie.year;
          case "title-asc":
            return firstMovie.title.localeCompare(secondMovie.title);
          case "rating-desc":
          default:
            return secondMovie.rating - firstMovie.rating;
        }
      });
  }, [movies, query, selectedGenre, sortBy]);

  const favoriteCount = movies.filter((movie) => movie.favorite).length;

  const toggleFavorite = (movieId) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId ? { ...movie, favorite: !movie.favorite } : movie,
      ),
    );
  };

  return (
    <ThemeProvider>
      <main className="app-shell">
        <section className="movie-panel" aria-label="Mini Movie Manager">
          <Header />

          <div className="panel-content">
            <div className="search-wrap">
              <SearchBar value={query} onChange={setQuery} />
            </div>

            <div className="filter-grid">
              <label className="select-field" htmlFor="movie-genre">
                <span className="field-label">Filter by genre</span>
                <select
                  id="movie-genre"
                  value={selectedGenre}
                  onChange={(event) => setSelectedGenre(event.target.value)}
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre === "all" ? "Tất cả thể loại" : genre}
                    </option>
                  ))}
                </select>
              </label>

              <label className="select-field" htmlFor="movie-sort">
                <span className="field-label">Sort by</span>
                <select
                  id="movie-sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="rating-desc">Đánh giá cao nhất</option>
                  <option value="rating-asc">Đánh giá thấp nhất</option>
                  <option value="year-desc">Năm mới nhất</option>
                  <option value="year-asc">Năm cũ nhất</option>
                  <option value="title-asc">Tên A-Z</option>
                </select>
              </label>
            </div>

            <div className="summary-row" aria-live="polite">
              <span>Tổng số phim: <strong>{movies.length}</strong></span>
              <span>Yêu thích: <strong>{favoriteCount}</strong></span>
              <span>Đang hiển thị: <strong>{filteredMovies.length}</strong></span>
            </div>

            <MovieList
              movies={filteredMovies}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
