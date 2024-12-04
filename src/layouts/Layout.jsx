import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-serif">
      <Navbar />
      <main className="container-style overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;