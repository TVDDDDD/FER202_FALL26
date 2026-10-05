import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import GenreFilter from "./components/GenreFilter";
import MovieDetail from "./components/MovieDetail";
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
  const [selectedMovieId, setSelectedMovieId] = useState(initialMovies[0]?.id ?? null);

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

  useEffect(() => {
    if (!filteredMovies.length) {
      setSelectedMovieId(null);
      return;
    }

    const isCurrentSelectedInList = filteredMovies.some(
      (movie) => movie.id === selectedMovieId,
    );

    if (!isCurrentSelectedInList) {
      setSelectedMovieId(filteredMovies[0].id);
    }
  }, [filteredMovies, selectedMovieId]);

  const selectedMovie =
    filteredMovies.find((movie) => movie.id === selectedMovieId) ??
    filteredMovies[0] ??
    null;

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
            <div className="toolbar-row">
              <SearchBar value={query} onChange={setQuery} />
              <label className="sort-wrap" htmlFor="movie-sort">
                <span className="sr-only">Sắp xếp phim</span>
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

            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onSelect={setSelectedGenre}
            />

            <div className="summary-row" aria-live="polite">
              <span>
                Tổng phim <strong>{movies.length}</strong>
              </span>
              <span>
                Yêu thích <strong>{favoriteCount}</strong>
              </span>
              <span>
                Hiển thị <strong>{filteredMovies.length}</strong>
                
              </span>
            </div>

            <div className="movie-layout">
              <MovieList
                movies={filteredMovies}i
                selectedMovieId={selectedMovieId}
                onSelect={setSelectedMovieId}
                onToggleFavorite={toggleFavorite}
              />
              <MovieDetail
                movie={selectedMovie}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
