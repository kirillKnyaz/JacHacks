import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

  /*My own code-ish*/
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <Router>  {/* React Router needs to wrap your whole app */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* This is a container to center everything nicely */}
        
        <Routes> {/* Routes component will manage which page to show */}
          <Route path="/login" element={<LoginPage />} /> {/* If URL is /login show LoginPage */}
          <Route path="/register" element={<RegisterPage />} /> {/* If URL is /register show RegisterPage */}
          <Route path="*" element={<LoginPage />} /> {/* If URL is anything else, default to LoginPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App
