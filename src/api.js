import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
export const fetchMovies = async () => {
    const {data} = await axios.get('/trending/movie/day?language=en-US&api_key=05e456d46a8dfe98f1cd1e6a7a49575e')
    return data.results;
}

export const fetchMoviesById = async (movieId) => {
    const { data } = await axios.get(`/movie/${movieId}?language=en-US&api_key=05e456d46a8dfe98f1cd1e6a7a49575e`);
    return data;
};
// export const fetchMovieCast = async (movieId) => {
//     const { data } = await axios.get(`/movie/${movieId}/credits?language=en-US&api_key=05e456d46a8dfe98f1cd1e6a7a49575e`);
//     return data.cast;
// };



export const API_KEY = '05e456d46a8dfe98f1cd1e6a7a49575e';