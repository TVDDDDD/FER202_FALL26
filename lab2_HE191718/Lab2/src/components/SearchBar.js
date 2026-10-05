function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <span className="sr-only">Tìm kiếm phim</span>
      <input
        type="search"
        aria-label="Tìm kiếm phim"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm kiếm phim..."
      />
    </label>
  );
}

export default SearchBar;
