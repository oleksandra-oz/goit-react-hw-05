import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieReviews = () => {
  const fetchMovieReviews = async (movieId) => {
    const { data } = await axios.get(
      `/movie/${movieId}/reviews?language=en-US&api_key=05e456d46a8dfe98f1cd1e6a7a49575e`
    );
    return data.results;
  };
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No review information available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
