//searchbar
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";

const MoviesPage = ({ movies, searchMovies }) => {
  return (
    <>
      <SearchBar onSubmit={searchMovies} />
      <div>
        <MovieList movies={movies} />
      </div>
    </>
  );
};

export default MoviesPage;
