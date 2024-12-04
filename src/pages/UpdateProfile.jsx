import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const UpdateProfile = () => {

  useEffect(() => {
    document.title = "Update Profile - Mountain Trek";
  }, []);


  const [name, setName] = useState(auth?.currentUser?.displayName || ''); // Default name from Firebase user
  const [photoURL, setPhotoURL] = useState(auth?.currentUser?.photoURL || ''); // Default photoURL from Firebase user
  const navigate = useNavigate();

  // Handle profile update
  const handleUpdate = async () => {
    if (!name || !photoURL) {
      
      return;
    }

    try {
      // Update Firebase profile
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
     
      navigate("/"); // Navigate to the dashboard
    } catch (error) {
     
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center min-h-[70vh]">
      <div className='px-8 py-6 bg-white shadow-lg border border-gray-300 rounded-lg'>
      <h1 className="text-2xl mb-4">Update Profile</h1>
      <label htmlFor='username' className="block mb-2 text-gray-600">Update Username:</label>
      <input
        id='username'
        type="text"
        placeholder="Name"
        className="block border p-2 w-full mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='password' className="block mb-2 text-gray-600">Update Profile Picture:</label>
      <input
      id='password'
        type="url"
        placeholder="Photo URL"
        className="block border p-2 w-full mb-4"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-2 w-full border rounded hover:bg-blue-600"
      >
        Update Information
      </button>
      </div>
      
    </div>
  );
};

export default UpdateProfile;