import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

// Component Imports
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";
import NotFound from "./components/common/NotFound"; // Create this component

// Private Route Wrapper
const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userData");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem("userData"));

  useEffect(() => {
    // Update login status if localStorage changes
    const updateLoginStatus = () => {
      setUserLoggedIn(!!localStorage.getItem("userData"));
    };
    window.addEventListener("storage", updateLoginStatus);
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/adminhome"
              element={
                <PrivateRoute>
                  <AdminHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/userhome"
              element={
                <PrivateRoute>
                  <UserHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/userhome/userappointments/:doctorId"
              element={
                <PrivateRoute>
                  <UserAppointments />
                </PrivateRoute>
              }
            />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">© 2025 Copyright: BookaDoc</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
