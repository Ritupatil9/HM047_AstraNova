import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle, ArrowLeft, Info } from "lucide-react";

interface CreditScoreResult {
  score: number;
  category: string;
  factors: any[];
  summary: string;
  improvements: any[];
  calculatedAt: string;
}

export default function CreditScorePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"confirmation" | "input" | "result">("confirmation");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreditScoreResult | null>(null);
  const [customProfile, setCustomProfile] = useState({
    age: "",
    monthly_income: "",
    monthly_expenses: "",
    employment_type: "Salaried",
    existing_loan_amount: "",
    credit_utilization_percentage: "",
    payment_history_status: "Good",
  });

  const handleUseExistingProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/credit-score/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({ useExisting: true }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to calculate credit score");
      }

      setResult(data.data);
      setStep("result");
    } catch (err: any) {
      setError(err.message || "Failed to calculate credit score");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseCustomProfile = async () => {
    // Validate inputs
    if (
      !customProfile.age ||
      !customProfile.monthly_income ||
      !customProfile.monthly_expenses ||
      !customProfile.existing_loan_amount ||
      customProfile.credit_utilization_percentage === ""
    ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const profileData = {
        age: parseInt(customProfile.age),
        monthly_income: parseFloat(customProfile.monthly_income),
        monthly_expenses: parseFloat(customProfile.monthly_expenses),
        employment_type: customProfile.employment_type,
        existing_loan_amount: parseFloat(customProfile.existing_loan_amount),
        credit_utilization_percentage: parseFloat(customProfile.credit_utilization_percentage),
        payment_history_status: customProfile.payment_history_status,
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/credit-score/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({ useExisting: false, customProfile: profileData }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to calculate credit score");
      }

      setResult(data.data);
      setStep("result");
    } catch (err: any) {
      setError(err.message || "Failed to calculate credit score");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    else if (score >= 670) return "text-blue-600";
    else if (score >= 580) return "text-yellow-600";
    else return "text-red-600";
  };

  const getCreditCategoryBg = (category: string) => {
    switch (category) {
      case "Excellent":
        return "bg-green-100 text-green-800 border-green-300";
      case "Good":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Poor":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Check Your Credit Score</h1>
          <p className="text-lg text-muted-foreground">
            Get a detailed analysis of your creditworthiness and personalized improvement suggestions
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-500">{error}</AlertDescription>
            </Alert>
          )}

          {/* Confirmation Step - Use Existing Profile */}
          {step === "confirmation" && (
            <Card>
              <CardHeader>
                <CardTitle>Use Your Financial Profile</CardTitle>
                <CardDescription>
                  We'll analyze your stored financial profile to calculate your credit score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-blue-500/10 border-blue-500/20">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-500">
                    Your credit score is calculated using your income, expenses, loans, and payment history
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="font-semibold">Do you agree to use your stored financial profile?</h3>
                  <p className="text-sm text-muted-foreground">
                    This will provide the most accurate credit score based on your actual financial data
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={handleUseExistingProfile}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-11"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Yes, Proceed
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setStep("input")}
                      disabled={loading}
                      variant="outline"
                      className="flex-1 h-11"
                    >
                      No, Enter Custom Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Input Step - Custom Profile */}
          {step === "input" && (
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Financial Information</CardTitle>
                <CardDescription>
                  Provide custom financial data to calculate your credit score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Age</label>
                    <input
                      type="number"
                      placeholder="30"
                      value={customProfile.age}
                      onChange={(e) => setCustomProfile({ ...customProfile, age: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    />
                  </div>

                  {/* Monthly Income */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Monthly Income (₹)</label>
                    <input
                      type="number"
                      placeholder="50000"
                      value={customProfile.monthly_income}
                      onChange={(e) => setCustomProfile({ ...customProfile, monthly_income: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    />
                  </div>

                  {/* Monthly Expenses */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Monthly Expenses (₹)</label>
                    <input
                      type="number"
                      placeholder="15000"
                      value={customProfile.monthly_expenses}
                      onChange={(e) => setCustomProfile({ ...customProfile, monthly_expenses: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    />
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Employment Type</label>
                    <select
                      value={customProfile.employment_type}
                      onChange={(e) => setCustomProfile({ ...customProfile, employment_type: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    >
                      <option>Salaried</option>
                      <option>Self-Employed</option>
                      <option>Business Owner</option>
                      <option>Freelancer</option>
                    </select>
                  </div>

                  {/* Existing Loan Amount */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Existing Loan Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="200000"
                      value={customProfile.existing_loan_amount}
                      onChange={(e) => setCustomProfile({ ...customProfile, existing_loan_amount: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    />
                  </div>

                  {/* Credit Utilization */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Credit Utilization (%)</label>
                    <input
                      type="number"
                      placeholder="25"
                      min="0"
                      max="100"
                      value={customProfile.credit_utilization_percentage}
                      onChange={(e) => setCustomProfile({ ...customProfile, credit_utilization_percentage: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    />
                  </div>

                  {/* Payment History - Full Width */}
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Payment History Status</label>
                    <select
                      value={customProfile.payment_history_status}
                      onChange={(e) => setCustomProfile({ ...customProfile, payment_history_status: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                      <option>Poor</option>
                      <option>No History</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={handleUseCustomProfile}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-11"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Calculate Score
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setStep("confirmation")}
                    disabled={loading}
                    variant="outline"
                    className="flex-1 h-11"
                  >
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result Step */}
          {step === "result" && result && (
            <div className="space-y-6">
              {/* Credit Score Display */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle>Your Credit Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getCreditScoreColor(result.score)} mb-2`}>
                      {result.score}
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-full font-semibold border ${getCreditCategoryBg(result.category)}`}>
                      {result.category}
                    </div>
                  </div>

                  <p className="text-center text-muted-foreground">{result.summary}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-sm">
                    <div className="p-2 rounded-lg bg-white/50">
                      <div className="font-semibold">300-579</div>
                      <div className="text-xs text-muted-foreground">Poor</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50">
                      <div className="font-semibold">580-669</div>
                      <div className="text-xs text-muted-foreground">Fair</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50">
                      <div className="font-semibold">670-749</div>
                      <div className="text-xs text-muted-foreground">Good</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50">
                      <div className="font-semibold">750-850</div>
                      <div className="text-xs text-muted-foreground">Excellent</div>
                    </div>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200">
                      <div className="font-semibold text-blue-700">Your Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Score Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Credit Score Factors</CardTitle>
                  <CardDescription>How your financial profile affects your score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.factors.map((factor, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{factor.name}</h4>
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold ${factor.status === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                            {factor.status === 'positive' ? '✓ Positive' : '✗ Negative'}
                          </div>
                          <div className="text-xs text-muted-foreground">Weight: {factor.weight}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Improvement Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">How to Improve Your Score</CardTitle>
                  <CardDescription>Actionable recommendations based on your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.improvements.map((suggestion, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 px-2 py-1 rounded text-xs font-semibold ${
                          suggestion.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          suggestion.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {suggestion.priority.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                          <p className="text-sm font-medium text-blue-600 mt-2">→ {suggestion.action}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    setStep("confirmation");
                    setResult(null);
                    setError(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-11"
                >
                  Check Score Again
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="flex-1 h-11"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
