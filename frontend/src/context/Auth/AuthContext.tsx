import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert2';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  // Redirect to login if not authenticated and trying to access protected routes
  useEffect(() => {
    const unprotectedRoutes = ['/login', '/register'];
    const isProtectedRoute = !unprotectedRoutes.includes(location.pathname);
    
    if (!isAuthenticated && isProtectedRoute) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully login!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
      navigate('/dashboard');
    } catch (error) {
      // Extracting the error message from the axios error object
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
      console.error('Login error', error);
    }
  };
  
  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, { username, email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully created!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
      navigate('/dashboard');
    } catch (error) {
      // Extracting the error message from the axios error object
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
      console.error('Login error', error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Successfully logout!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
      timerProgressBar: true, // Optional: shows a progress bar during the timer
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};