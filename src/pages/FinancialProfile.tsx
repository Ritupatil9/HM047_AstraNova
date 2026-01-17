import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { FinancialProfileForm } from "@/components/FinancialProfileForm";
import { FinancialProfileDisplay } from "@/components/FinancialProfileDisplay";
import { useFinancialProfile, FinancialProfile } from "@/services/financialProfileApi";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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
  const loadProfile = async () => {
    if (authLoading || !user || loading) return;

    setLoading(true);
    setError(null);
    try {
      const fetchedProfile = await fetchProfile();
      setProfile(fetchedProfile);
    } catch (err: any) {
      // Profile not found is not an error - it's a normal state
      if (err.message.includes("not found") || err.status === 404) {
        setProfile(null);
      } else {
        setError(err.message || "Failed to load financial profile");
      }
    } finally {
      setLoading(false);
    }
  };

  // Load profile when component mounts
  useEffect(() => {
    if (authLoading || !user || hasAttemptedFetch) return;
    setHasAttemptedFetch(true);
    loadProfile();
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Financial Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your financial information used for AI analysis, loan eligibility, and
            personalized guidance
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-500">{error}</AlertDescription>
          </Alert>
        )}

        {/* Profile Display or Form */}
        <div className="max-w-4xl mx-auto">
          {!profile ? (
            // No profile exists - show creation form
            <div className="space-y-4">
              <FinancialProfileForm
                onSuccess={(createdProfile) => {
                  setProfile(createdProfile);
                  // Redirect to home page after creating profile
                  setTimeout(() => navigate("/", { replace: true }), 500);
                  setError(null);
                }}
              />
              <p className="text-sm text-muted-foreground text-center">
                Create your financial profile to get personalized insights and recommendations
              </p>
            </div>
          ) : isEditing ? (
            // Editing mode - show form with existing data
            <div className="space-y-4">
              <FinancialProfileForm
                initialData={profile}
                isEdit={true}
                onSuccess={(updatedProfile) => {
                  setProfile(updatedProfile);
                  setIsEditing(false);
                  setError(null);
                }}
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            // Display mode - show profile data
            <div className="space-y-4">
              <FinancialProfileDisplay profile={profile} />
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        {/* Information Box */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">About Your Financial Profile</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              ✓ Your data is securely stored in encrypted Firebase database
            </li>
            <li>
              ✓ Only you can access your financial profile
            </li>
            <li>
              ✓ This profile is used as the base for AI analysis, EMI calculation, loan
              eligibility, and financial guidance
            </li>
            <li>
              ✓ Update your profile anytime as your financial situation changes
            </li>
            <li>
              ✓ All calculations and recommendations are powered by backend AI/ML models
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
