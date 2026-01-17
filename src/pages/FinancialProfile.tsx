import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { FinancialProfileForm } from "@/components/FinancialProfileForm";
import { FinancialProfileDisplay } from "@/components/FinancialProfileDisplay";
import { useFinancialProfile, FinancialProfile } from "@/services/financialProfileApi";
import { Loader2, AlertCircle, Shield, Lock, Brain, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Add animations to global styles
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }

  .animate-shake {
    animation: shake 0.3s ease-in-out;
  }

  .delay-1000 {
    animation-delay: 1s;
  }

  .delay-500 {
    animation-delay: 0.5s;
  }
`;

/**
 * Financial Profile Page
 * 
 * Architecture:
 * - Frontend ONLY handles UI rendering and user interaction
 * - All data operations go through API service
 * - Backend owns all business logic and validation
 * - No financial calculations or business logic here
 * 
 * This page:
 * 1. Fetches profile from backend on mount
 * 2. Shows form if no profile exists
 * 3. Shows display if profile exists
 * 4. Allows editing existing profile
 */
export default function FinancialProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { fetchProfile } = useFinancialProfile();

  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  // Fetch profile only when user requests to edit
  const loadProfile = useCallback(async () => {
    if (authLoading || !user || loading) return;

    setLoading(true);
    setError(null);
    try {
      const fetchedProfile = await fetchProfile();
      setProfile(fetchedProfile);
    } catch (err: unknown) {
      // Profile not found is not an error - it's a normal state
      const error = err as { message?: string; status?: number };
      if (error.message?.includes("not found") || error.status === 404) {
        setProfile(null);
      } else {
        setError(error.message || "Failed to load financial profile");
      }
    } finally {
      setLoading(false);
    }
  }, [authLoading, user, loading, fetchProfile]);

  // Load profile when component mounts
  useEffect(() => {
    if (authLoading || !user || hasAttemptedFetch) return;
    setHasAttemptedFetch(true);
    loadProfile();
  }, [user, authLoading, hasAttemptedFetch, loadProfile]);

  if (authLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-20">
            <Loader2 className="w-16 h-16 text-blue-500" />
          </div>
          <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
        </div>
        <p className="mt-4 text-sm text-slate-600 animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <main className="container py-12 relative z-10">
        {/* Page Header with Animation */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Financial Profile Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            Your Financial Profile
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Manage your financial information used for AI analysis, loan eligibility, and personalized guidance
          </p>
        </div>

        {/* Error Display with Enhanced Styling */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 animate-shake">
            <Alert className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 shadow-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-700 font-medium ml-2">
                {error}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Profile Display or Form */}
        <div className="max-w-4xl mx-auto">
          {!profile ? (
            // No profile exists - show creation form with beautiful card
            <div className="space-y-6 animate-slide-up">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Your Profile</h2>
                  <p className="text-slate-600">Let's set up your financial profile to get started</p>
                </div>
                <FinancialProfileForm
                  onSuccess={(createdProfile) => {
                    setProfile(createdProfile);
                    setTimeout(() => navigate("/", { replace: true }), 500);
                    setError(null);
                  }}
                />
              </div>
              <p className="text-sm text-slate-500 text-center flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Your data is encrypted and secure
              </p>
            </div>
          ) : isEditing ? (
            // Editing mode - show form with existing data
            <div className="space-y-6 animate-slide-up">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Update Your Profile</h2>
                  <p className="text-slate-600">Keep your financial information up to date</p>
                </div>
                <FinancialProfileForm
                  initialData={profile}
                  isEdit={true}
                  onSuccess={(updatedProfile) => {
                    setProfile(updatedProfile);
                    setIsEditing(false);
                    setError(null);
                  }}
                />
              </div>
              <Button
                variant="outline"
                className="w-full h-12 border-2 hover:bg-slate-50 transition-all duration-300 font-medium"
                onClick={() => setIsEditing(false)}
              >
                Cancel Editing
              </Button>
            </div>
          ) : (
            // Display mode - show profile data
            <div className="space-y-6 animate-slide-up">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Profile Active</h2>
                      <p className="text-blue-100 text-sm">Your financial profile is set up and running</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <FinancialProfileDisplay profile={profile} />
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        {/* Information Box with Enhanced Design */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
              <h3 className="font-bold text-white text-xl flex items-center gap-2">
                <Brain className="w-6 h-6" />
                About Your Financial Profile
              </h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 group hover:bg-blue-50/50 p-4 rounded-2xl transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Secure Storage</h4>
                    <p className="text-sm text-slate-600">Your data is encrypted and stored securely in Firebase</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-indigo-50/50 p-4 rounded-2xl transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Private & Confidential</h4>
                    <p className="text-sm text-slate-600">Only you can access your financial profile</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-purple-50/50 p-4 rounded-2xl transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">AI-Powered Analysis</h4>
                    <p className="text-sm text-slate-600">Used for loan eligibility and personalized financial guidance</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-green-50/50 p-4 rounded-2xl transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Always Up-to-Date</h4>
                    <p className="text-sm text-slate-600">Update your profile anytime as your situation changes</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                <p className="text-sm text-amber-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  All calculations and recommendations are powered by advanced backend AI/ML models
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
    </>
  );
}
