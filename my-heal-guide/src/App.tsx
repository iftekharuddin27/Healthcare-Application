import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import { NavigationBar } from "@capgo/capacitor-navigation-bar";
import { Capacitor } from "@capacitor/core";

// Pages
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import Medicines from "./pages/Medicines";
import Cart from "./pages/Cart";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Tests from "./pages/Tests";
import BookTest from "./pages/BookTest";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// New Component
import { BottomNav } from "./components/BottomNav";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const App = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      NavigationBar.setNavigationBarColor({ color: '#0e1115' });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
                  <Route path="/book-appointment/:id" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
                  <Route path="/medicines" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/articles" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
                  <Route path="/article/:id" element={<ProtectedRoute><Article /></ProtectedRoute>} />
                  <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
                  <Route path="/book-test/:id" element={<ProtectedRoute><BookTest /></ProtectedRoute>} />
                  <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                
                <BottomNav />
                
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;