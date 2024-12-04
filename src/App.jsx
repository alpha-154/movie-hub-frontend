import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import PrivateRoute from "./components/customComponents/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateProfile from "./pages/UpdateProfile";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AllMovies from "./pages/AllMovies";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./pages/AddMovie";
import FavouriteMovies from "./pages/FavoriteMovies";
import Error from "./pages/Error";
import { Toaster } from "./components/ui/sonner";


//import 'aos/dist/aos.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-movies"
            element={
              <PrivateRoute>
                <AllMovies/>
              </PrivateRoute>
            }
          />
          <Route
            path="/movie-details/:id"
            element={
              <PrivateRoute>
                <MovieDetails/>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-movies"
            element={
              <PrivateRoute>
                <AddMovie/>
              </PrivateRoute>
            }
          />
          <Route
            path="/favourite-movies"
            element={
              <PrivateRoute>
                <FavouriteMovies/>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-movies"
            element={
              <PrivateRoute>
                <AllMovies/>
              </PrivateRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Toaster className="max-sm:max-w-[350px]" richColors position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
