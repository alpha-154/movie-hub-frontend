import React from "react";
import { useEffect } from "react";

function Error() {
    // dynamic title on the browser's title bar
    useEffect(() => {
      document.title = "404 - Movie Hub";
    }, []);
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl text-red-500">404 Page not Found!</h1>
    </div>
  );
}

export default Error;