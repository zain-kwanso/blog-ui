import React, { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/authUtils";
import axiosInstance from "../axiosInstance";
import { url } from "../utils/API";
import { User, UserResponse } from "src/types/user";
import { AuthContextType } from "../types/context";

const initialAuthContext: AuthContextType = {
  user: null,
  signup: async (name, email, password) => {
    return true;
  },
  signin: async (email, password) => {
    return true;
  },
  signout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await axiosInstance.get<UserResponse>(url.me);
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

  const signup = async (name: string, email: string, password: string) => {
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

  const signin = async (email: string, password: string) => {
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
