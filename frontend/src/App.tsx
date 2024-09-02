import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Main/Dashboard';
import { AuthProvider } from './context/Auth/AuthContext';
import { ItemProvider } from './context/Item/ItemContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Wrap only the Dashboard route with ItemProvider */}
          <Route
            path="/dashboard"
            element={
              <ItemProvider>
                <Dashboard />
              </ItemProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;