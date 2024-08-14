// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./pages/admin/Login/Login";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Users from "./pages/admin/Users/Users";
import Employees from "./pages/admin/Employees/Employees";
import Home from "./pages/client/Home/Home";
import AboutPage from "./pages/client/About/About";
import ContactPage from "./pages/client/Contact/Contact";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import "./assets/styles/global.css";

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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
