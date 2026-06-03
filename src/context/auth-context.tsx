"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
  jobTitle: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (name: string, email: string, jobTitle: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem("portfolio-saas-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate a brief API call for auth
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Create a mock user
    const mockUser: User = {
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email: email,
      jobTitle: "Founder & CEO",
    };
    
    setUser(mockUser);
    localStorage.setItem("portfolio-saas-user", JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("portfolio-saas-user");
    router.push("/login");
  };

  const updateUser = (name: string, email: string, jobTitle: string) => {
    const updatedUser = { name, email, jobTitle };
    setUser(updatedUser);
    localStorage.setItem("portfolio-saas-user", JSON.stringify(updatedUser));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
