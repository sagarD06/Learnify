"use client";
import React, { createContext, useState, useEffect } from "react";

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for user info
  const [loading, setLoading] = useState(true); // State for loading

  // Check if the token exists in localStorage and set the user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Set user as authenticated if token is found
      setUser({ token });
    } else {
      setUser(null);
    }
    setLoading(false); // Set loading to false after check
  }, [user]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
