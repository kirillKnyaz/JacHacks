import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import './App.css';
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./DashboardPage";
import CallbackPage from "./CallbackPage";
import Layout from "./Layout";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <div className="app-bg">
        <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />  {/* HomePage is now the index route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/dashboard" element={<ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute>}/>
          <Route path="/logout" element={<div className="m-2">You have been logged out!</div>} />
        </Route>
      </Routes>
      </div>
      
    </Router>
  );
}

export default App;
