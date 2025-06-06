import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser as fetchCurrentUser, logoutUser as apiLogout, loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../services/api'; // Correctly import loginUser and registerUser

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for current user on initial load
    fetchCurrentUser()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(() => {
        setCurrentUser(null); // Not logged in or error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await apiLoginUser(credentials); // Use imported apiLoginUser
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      setCurrentUser(null);
      throw error;
    }
  };

  const register = async (userData) => {
    // Assuming registerUser in api.js POSTs and backend auto-logins or we login after
    // For now, let's assume registration doesn't auto-login, user needs to login separately.
    return apiRegisterUser(userData); // Use imported apiRegisterUser
  };

  const logout = async () => {
    try {
      await apiLogout();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error", error);
      // Still clear user on client even if backend logout fails for some reason
      setCurrentUser(null);
    }
  };


  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
