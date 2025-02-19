import { useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../api";
import MovieCast from "../components/MovieCast/MovieCast.jsx";
import s from "../MoviesDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackUrl = useRef(location?.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div className={s.moviedetailspage}>
      <p>ID of movie: {movieId}</p>
      <Link to={goBackUrl.current}>Go Back</Link>
      {movie ? (
        <>
          <div className={s.moviedetailscontainer}>
            <img
              className={s.moviedetailsimg}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.moviedetailsinfo}>
              <h2>Movie name: {movie.title}</h2>
              <ul>
                <li>
                  <strong>Vote Average:</strong> {movie.vote_average}
                </li>
                <li>
                  <strong>Overview:</strong> {movie.overview}
                </li>

                <li>
                  <strong>Genres:</strong>{" "}
                  {movie.genres?.map((genre) => genre.name).join(", ")}
                </li>
              </ul>
              <p>Additional information</p>
              <nav className={s.moviedetailsnav}>
                <Link to="cast" className={s.moviedetailsnavlink}>
                  Cast
                </Link>
                <Link to="reviews" className={s.moviedetailsnavlink}>
                  Reviews
                </Link>
              </nav>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </>
      ) : (
        <p className={s.loading}>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
