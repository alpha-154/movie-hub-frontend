import axios from "axios";

// Creating an Axios instance for API requests
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 120000,
  });

const registerUser = (registrationData) => {
    return apiClient.post("/api/user/register", registrationData);
  };

export {
    registerUser,
}