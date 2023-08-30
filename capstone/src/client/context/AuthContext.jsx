
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider invoked");

  // Initialize from local storage
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
  const storedUser = localStorage.getItem("user");

  console.log("IsLoggedIn:", storedIsLoggedIn);
  console.log("Stored User:", storedUser);

  // Safely parse stored user
  let parsedUser = {};

  if (storedUser && storedUser !== "undefined") {
    try {
      parsedUser = JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse stored user:", error);
    }
  } else {
    console.warn("Stored user is undefined or not present.");
  }

  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === "true");
  const [user, setUser] = useState(parsedUser);

  console.log("User state:", user);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
