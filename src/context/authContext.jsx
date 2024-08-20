import React, { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/authUtils";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";

const initialAuthContext = {
  user: null,
  signup: async () => {},
  signin: async () => {},
  signout: () => {},
};

const AuthContext = createContext(initialAuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await axiosInstance.get(url.me);
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await axiosInstance.post(url.signup, {
        name,
        email,
        password,
      });
      setToken(response.data.token);
      await fetchUser();
      return true;
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await axiosInstance.post(url.signin, {
        email,
        password,
      });
      setToken(response.data.token);
      await fetchUser();
      return true;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  };

  const signout = () => {
    setUser(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
