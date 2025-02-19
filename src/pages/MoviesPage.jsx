//searchbar
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";

const MoviesPage = ({ movies, searchMovies }) => {
  return (
    <div>
      <h1>Search Movies</h1>
      <SearchBar onSubmit={searchMovies} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
