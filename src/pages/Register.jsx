import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { registerUser } from "@/api";


const Register = () => {

  useEffect(() => {
    document.title = "Register - Movie Hub";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase) return "Password must have at least one uppercase letter.";
    if (!hasLowercase) return "Password must have at least one lowercase letter.";
    if (!isLongEnough) return "Password must be at least 6 characters long.";
    return ""; // No error
  };

  const handleRegister = async () => {
    const validationError = validatePassword(password);

    if (validationError) {
      setPasswordError(validationError);
      return; // Stop further processing if password is invalid
    }

    setPasswordError(""); // Clear previous errors

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      const firebaseUser = userCredential.user;
      console.log("user-> ", firebaseUser);
      const response = await registerUser({
        firebaseUid: firebaseUser.uid,
        name,
        email,
        profileImage: photoURL,
      });
      if(response.status === 201){
        toast.success("Registration successful!");
      }
    
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container-style min-h-screen flex justify-center  items-center">
       <div className="max-w-xl md:max-w-2xl lg:max-w-3xl border border-gray-400 rounded-xl px-8 py-4"> 
       <h1 className="text-2xl mb-4 text-center">Register</h1>
      <input
        type="text"
        placeholder="Name"
       className="block p-2 w-full mb-4 hover:outline-none focus:outline-none border focus:border-gray-400 rounded-xl"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="block p-2 w-full mb-4 hover:outline-none focus:outline-none border focus:border-gray-400 rounded-xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="url"
        placeholder="Photo URL"
         className="block p-2 w-full mb-4 hover:outline-none focus:outline-none border focus:border-gray-400 rounded-xl"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
         className="block p-2 w-full mb-4 hover:outline-none focus:outline-none border focus:border-gray-400 rounded-xl"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      <button
        onClick={handleRegister}
       className="bg-blue-500 hover:bg-blue-400 text-white p-2 w-full mb-4 border rounded-lg"
      >
        Register
      </button>
      <div className="">
        <Link to="/login" className="text-blue-600">Login</Link>
      </div>
        </div>
     
    </div>
  );
};

export default Register;