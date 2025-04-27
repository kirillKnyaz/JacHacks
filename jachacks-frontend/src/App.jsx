import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import './App.css';
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./DashboardPage";
import CallbackPage from "./CallbackPage";
import Layout from "./Layout";
import HomePage from "./HomePage";
import Quiz from "./Quiz";
import DonationPage from "./DonationPage";
import SelectedOrgsPage from "./SelectedOrgsPage";

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
          <Route path="/home" element={<ProtectedRoute>
            <HomePage />
          </ProtectedRoute>}/>
          <Route path="/logout" element={<div className="m-2">You have been logged out!</div>} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/selectedOrgs" element={<SelectedOrgsPage />} />
        </Route>
      </Routes>
      </div>
      
    </Router>
  );
}

export default App;
