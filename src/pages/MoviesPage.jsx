import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=YOUR_API_KEY&language=en-US`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError("Error fetching movies");
      }
    };

    searchMovies();
  }, [query]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <SearchBar onSubmit={handleSearch} />
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
