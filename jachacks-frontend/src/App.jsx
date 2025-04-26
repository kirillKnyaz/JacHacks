import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import './App.css';
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./DashboardPage";
import CallbackPage from "./CallbackPage";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/dashboard" element={<ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
