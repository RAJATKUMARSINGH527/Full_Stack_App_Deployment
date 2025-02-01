import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


const App = () => {
  const token = localStorage.getItem("token"); // Check if user is logged in

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
          
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
