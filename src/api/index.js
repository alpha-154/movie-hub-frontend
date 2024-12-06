import axios from "axios";

// Creating an Axios instance for API requests
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  
    timeout: 120000,
  });

const registerUser = (registrationData) => {
    return apiClient.post("/api/user/register", registrationData);
  };

const registerUserWithGoogle = (registrationData) => {
    return apiClient.post("/api/user/register-with-google", registrationData);
}

const addMovie = (movieData) => {
    return apiClient.post("/api/movie/create-movie", movieData);
}

const getTopRatedMovies = () => {
    return apiClient.get("/api/movie/top-rated-movies");
}

const getAllMovies = () => {
    return apiClient.get("/api/movie/get-all-movies");
}

const getMovieById = (movieId) => {
    return apiClient.get(`/api/movie/get-movie/${movieId}`);
}

const deleteMovie = ({username, movieId}) => {
    return apiClient.delete("/api/movie/delete-movie", {
        data: {
            userName: username,
            id: movieId
        }
    });
}

const addToFavorite = ({username, movieId}) => {
    console.log("addToFavorite index.js ->  username", username, "movieId", movieId);
    return apiClient.post("/api/user/add-to-favorite", {
        username: username,
        movieId: movieId
    });
}

const getAllFavoritesMovies = (username) => {
    return apiClient.get(`/api/user/get-favorites-movies/${username}`);
}

const removeMovieFromFavorite = ({username, movieId}) => {
    return apiClient.delete(`/api/user/remove-from-favorites/${username}/${movieId}`);
}

const updateMovie = (updateData) => {
    return apiClient.post("/api/movie/update-movie", updateData);
}

const searchMovies = ({query}) => {
    return apiClient.post("/api/movie/search-movies", {
        query: query
    });
}

const reviewMovie = (reviewData) => {
    return apiClient.post("/api/movie/review-movie", reviewData);
}

export {
    registerUser,
    registerUserWithGoogle,
    addMovie,
    getTopRatedMovies,
    getAllMovies,
    getMovieById, 
    deleteMovie,
    addToFavorite,
    getAllFavoritesMovies,
    removeMovieFromFavorite,
    updateMovie,
    searchMovies,
    reviewMovie
}