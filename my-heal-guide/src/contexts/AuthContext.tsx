import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. LISTEN TO AUTH STATE
  // This useEffect runs once when the app starts. It asks Firebase:
  // "Is there a user already logged in?"
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Done loading
    });
    return () => unsubscribe();
  }, []);

  // 2. LOGIN FUNCTION
  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  // 3. REGISTER FUNCTION
  const register = async (name: string, email: string, pass: string) => {
    // Create account
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    // Add their name to the profile
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // Force update local state to show the name immediately
      setUser({ ...userCredential.user, displayName: name });
    }
  };

  // 4. LOGOUT FUNCTION
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};