import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";


const ResetPassword = () => {

    useEffect(() => {
        document.title = "Reset Password - Mountain Trek";
      }, []);


  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill email field if passed from login
  useEffect(() => {
    const prefilledEmail = new URLSearchParams(location.search).get("email");
    if (prefilledEmail) setEmail(prefilledEmail);
  }, [location]);

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Please provide an email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      window.open("https://mail.google.com", "_blank"); // Redirect to Gmail
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto py-24">
        <div className="bg-white border-gray-300 rounded-xl shadow-lg px-8 py-6">
        <h1 className="text-2xl mb-4">Forgot Password</h1>
     <label htmlFor='email' className="block mb-2 text-gray-600">Enter your email:</label>
      <input
        type="email"
        placeholder="Email"
        className="block border p-2 w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handlePasswordReset}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Reset Password
      </button>

      <div className="mt-4">
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 underline"
        >
          Back to Login
        </button>
      </div>
        </div>
     
    </div>
  );
};

export default ResetPassword;
