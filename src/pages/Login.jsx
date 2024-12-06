import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserWithGoogle } from "@/api";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect
} from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";


const Login = () => {
  useEffect(() => {
    document.title = "Login - Movie Hub";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Manage forgot password form visibility
  const navigate = useNavigate();

  // Handle standard email/password login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Redirecting to homepage...");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      let result;
      if (window.innerWidth < 768) {
        // Use redirect for mobile devices
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup for desktop
        result = await signInWithPopup(auth, provider);
      }
  
      const user = result?.user || auth?.currentUser;
  
      // Extract user information
      const userData = {
        firebaseUid: user.uid,
        name: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
      };
  
      // Make an API call to check if the user exists and save if not
      const response = await registerUserWithGoogle(userData);
  
      if (response.status === 201) {
        toast.success("Google Login successful! Account created.");
      } else if (response.status === 200) {
        toast.success("Google Login successful!");
      }
  
      // Redirect to homepage
      navigate("/");
    } catch (error) {
      toast.error(error.message || "An error occurred during Google login.");
    }
  };

  return (
    <div className="container-style min-h-screen flex justify-center  items-center">
      <div className="max-w-xl md:max-w-2xl lg:max-w-3xl border border-gray-400 rounded-xl px-8 py-4">
        <h1 className="text-2xl mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="block p-2 w-full mb-4 hover:outline-none focus:outline-none border focus:border-gray-400 rounded-xl text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block p-2 w-full mb-4 hover:outline-none focus:outline-none border focus:border-gray-400 rounded-xl text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-400 text-white p-2 w-full mb-4 border rounded-lg"
        >
          Login
        </button>

        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 hover:bg-red-400 text-white p-2 w-full mb-4 border rounded-lg"
        >
          Login with Google
        </button>

        <div className="mt-4">
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </div>

        {/* Forgot Password Section */}
        <div className="mt-4">
          <div className="mt-4">
            <button
              onClick={() => {
                if (email) {
                  navigate(
                    `/reset-password?email=${encodeURIComponent(email)}`
                  );
                } else {
                  toast.error("Please enter your email address.");
                }
              }}
              className="text-blue-600 underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;