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
import ProfilePage from "./ProfilePage";
import ThankYouPage from "./ThankYouPage";
import { Profiler } from "react";
import LogoutPage from "./LogoutPage";

function App() {
  return (
    <Router>
      <div className="app-bg d-flex flex-column min-vh-100">
        <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />  {/* HomePage is now the index route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/home" element={<ProtectedRoute>
            <HomePage />
          </ProtectedRoute>}/>
          <Route path="/logout" element={<LogoutPage/>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/donation" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />
          <Route path="/selectedOrgs" element={<ProtectedRoute><SelectedOrgsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/thank-you" element={<ProtectedRoute><ThankYouPage /></ProtectedRoute>} />
        </Route>
      </Routes>
      </div>
      
    </Router>
  );
}

export default App;
