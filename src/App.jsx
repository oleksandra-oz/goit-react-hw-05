import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MovieCast from "./components/MovieCast/MovieCast.jsx";
import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import { useState } from "react";
import axios from "axios";
import MoviesPage from "./pages/MoviesPage";

function App() {
  const [movies, setMovies] = useState([]); // Список знайдених фільмів
  const [error, setError] = useState(null); // Стан для помилки
  const searchMovies = async (query) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=YOUR_API_KEY&language=en-US`
      );
      setMovies(data.results);
    } catch (error) {
      setError("Error fetching movies");
    }
  };
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/movies"
          element={<MoviesPage onSubmit={searchMovies} movies={movies} />}
        />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
