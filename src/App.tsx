import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Chatbot } from "@/components/Chatbot";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreditScore from "./pages/CreditScore";
import CreditTracking from "./pages/CreditTracking";
import EMICalculator from "./pages/EMICalculator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FinancialProfile from "./pages/FinancialProfile";
import Loans from "./pages/Loans";
import Insights from "./pages/Insights";
import FutureScope from "./pages/FutureScope";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financial-profile"
              element={
                <ProtectedRoute>
                  <FinancialProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/credit-score"
              element={
                <ProtectedRoute>
                  <CreditScore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/credit-tracking"
              element={
                <ProtectedRoute>
                  <CreditTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/emi-calculator"
              element={
                <ProtectedRoute>
                  <EMICalculator />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/loans"
              element={
                <ProtectedRoute>
                  <Loans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <ProtectedRoute>
                  <Insights />
                </ProtectedRoute>
              }
            />
            <Route
              path="/future-scope"
              element={
                <ProtectedRoute>
                  <FutureScope />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
