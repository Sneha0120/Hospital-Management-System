import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";



import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";


import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, doctor, setdoctor } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/doctor/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setdoctor(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setdoctor({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;