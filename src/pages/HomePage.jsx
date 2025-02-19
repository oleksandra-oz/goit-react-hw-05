import { useEffect, useState } from "react";
import { fetchMovies } from "../api.js";
import MovieList from "../components/MovieList/MovieList.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);
  return (
    <>
      <p>Trending today</p>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
