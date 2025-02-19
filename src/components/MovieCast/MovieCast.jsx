import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
  const fetchMovieCast = async (movieId) => {
    const { data } = await axios.get(
      `/movie/${movieId}/credits?language=en-US&api_key=05e456d46a8dfe98f1cd1e6a7a49575e`
    );
    return data.cast;
  };
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast:</h3>
      {cast.length > 0 ? (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              />
              <p>Name:{actor.name}</p>

              <p>Character:{actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
