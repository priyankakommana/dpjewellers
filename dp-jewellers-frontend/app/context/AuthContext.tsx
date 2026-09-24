"use client";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  user: any;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (t && t !== "undefined" && t !== "null") {
      setIsLoggedIn(true);
      setToken(t);
    }

    
    if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.warn("Invalid user in localStorage, clearing", savedUser);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = () => {
    const t = localStorage.getItem("token");
    if (t && t !== "undefined") {
      setIsLoggedIn(true);
      setToken(t);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);