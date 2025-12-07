import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('healthUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem('healthUsers') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = { email, password, name };
    users.push(newUser);
    localStorage.setItem('healthUsers', JSON.stringify(users));
    
    const userData = { email, name };
    localStorage.setItem('healthUser', JSON.stringify(userData));
    setUser(userData);
    
    toast({
      title: "Welcome!",
      description: "Your account has been created successfully.",
    });
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('healthUsers') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const userData = { email: foundUser.email, name: foundUser.name };
    localStorage.setItem('healthUser', JSON.stringify(userData));
    setUser(userData);
    
    toast({
      title: "Welcome back!",
      description: "You've successfully logged in.",
    });
  };

  const logout = () => {
    localStorage.removeItem('healthUser');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
