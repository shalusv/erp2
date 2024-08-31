// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./pages/admin/Login/Login";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Users from "./pages/admin/Users/Users";
import Employees from "./pages/admin/Employees/Employees";
import Permissions from "./pages/admin/devOptions/Permissions/Permissions";
import Profiles from "./pages/admin/settings/Profiles/Profiles";
import Securities from "./pages/admin/settings/Securities/Securities";
import Home from "./pages/client/Home/Home";
import AboutPage from "./pages/client/About/About";
import ContactPage from "./pages/client/Contact/Contact";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import "./assets/styles/global.css";
import Profile from "./pages/admin/Profile/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="dev-options/permissions"
            element={
              <ProtectedRoute>
                <Permissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/profiles"
            element={
              <ProtectedRoute>
                <Profiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/securities"
            element={
              <ProtectedRoute>
                <Securities />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
