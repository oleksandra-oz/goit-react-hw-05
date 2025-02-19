//searchbar users
import { useState } from "react";
import toast from "react-hot-toast";
import MovieList from "../components/MovieList/MovieList.jsx";

const MoviesPage = ({ onSubmit, movies }) => {
  const [query, setQuery] = useState("");

  const notify = () => toast.error("Cannot be empty");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      notify();
      return;
    }
    onSubmit(query.trim());
    setQuery("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <MovieList movies={movies} />
      </div>
    </>
  );
};

export default MoviesPage;
