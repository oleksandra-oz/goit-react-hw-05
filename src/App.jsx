import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import HomePage from "./pages/HomePage.jsx";
// import NotFoundPage from "./pages/NotFoundPage.jsx";
// import MovieCast from "./components/MovieCast/MovieCast.jsx";
// import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";
// import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import { Suspense, useState, lazy } from "react";
import axios from "axios";
// import MoviesPage from "./pages/MoviesPage";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews.jsx")
);
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage.jsx"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));

function App() {
  const [movies, setMovies] = useState([]); // Список знайдених фільмів
  const [error, setError] = useState(null); // Стан для помилки

  const searchMovies = async (query) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=05e456d46a8dfe98f1cd1e6a7a49575e&language=en-US`
      );
      setMovies(data.results);
      setError(null);
    } catch (error) {
      setError("Error fetching movies", error);
    }
  };

  return (
    <>
      <Navigation />
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movies"
            element={<MoviesPage searchMovies={searchMovies} movies={movies} />}
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;
