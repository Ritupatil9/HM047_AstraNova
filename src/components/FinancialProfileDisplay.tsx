import { FinancialProfile } from "@/services/financialProfileApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Home, Briefcase, Zap, CreditCard } from "lucide-react";

interface FinancialProfileDisplayProps {
  profile: FinancialProfile;
}

/**
 * Financial Profile Display Component
 * 
 * Responsibility: Display profile data received from backend
 * Frontend ONLY handles:
 * - Rendering profile data
 * - UI presentation
 * - Formatting for display
 * 
 * No business logic, no calculations, no validation
 * All data comes from backend and is displayed as-is
 */
export const FinancialProfileDisplay: React.FC<FinancialProfileDisplayProps> = ({
  profile,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getPaymentHistoryColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      case "Poor":
        return "bg-red-100 text-red-800";
      case "No History":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEmploymentTypeIcon = (type: string) => {
    switch (type) {
      case "Salaried":
        return <Briefcase className="w-4 h-4" />;
      case "Self-Employed":
        return <TrendingUp className="w-4 h-4" />;
      case "Freelancer":
        return <Wallet className="w-4 h-4" />;
      case "Business Owner":
        return <Home className="w-4 h-4" />;
      case "Retired":
        return <Zap className="w-4 h-4" />;
      case "Student":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const monthlyNetIncome = profile.monthly_income - profile.monthly_expenses;
  const savingsRatio = profile.monthly_income > 0 
    ? ((monthlyNetIncome / profile.monthly_income) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Financial Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="text-2xl font-bold">{profile.age} years</p>
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Employment Type</p>
              <div className="flex items-center gap-2">
                {getEmploymentTypeIcon(profile.employment_type)}
                <p className="text-lg font-semibold">{profile.employment_type}</p>
              </div>
            </div>
          </div>

          <hr />

          {/* Income & Expenses Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Income & Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Monthly Income */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="text-2xl font-bold text-green-700">
                    {formatCurrency(profile.monthly_income)}
                  </p>
                </CardContent>
              </Card>

              {/* Monthly Expenses */}
              <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                  <p className="text-2xl font-bold text-red-700">
                    {formatCurrency(profile.monthly_expenses)}
                  </p>
                </CardContent>
              </Card>

              {/* Net Income */}
              <Card className={`bg-gradient-to-br ${
                monthlyNetIncome >= 0
                  ? "from-blue-50 to-blue-100/50 border-blue-200"
                  : "from-orange-50 to-orange-100/50 border-orange-200"
              }`}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Monthly Net Income</p>
                  <p className={`text-2xl font-bold ${
                    monthlyNetIncome >= 0 ? "text-blue-700" : "text-orange-700"
                  }`}>
                    {formatCurrency(monthlyNetIncome)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Savings Ratio: {savingsRatio}%
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <hr />

          {/* Loan & Credit Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Loan & Credit Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Existing Loan Amount */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Existing Loan Amount</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(profile.existing_loan_amount)}
                  </p>
                </CardContent>
              </Card>

              {/* Credit Utilization */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Credit Utilization</p>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold">
                      {profile.credit_utilization_percentage}%
                    </p>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            profile.credit_utilization_percentage <= 30
                              ? "bg-green-500"
                              : profile.credit_utilization_percentage <= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${profile.credit_utilization_percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <hr />

          {/* Payment History */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Payment History Status</p>
            <Badge className={`${getPaymentHistoryColor(profile.payment_history_status)}`}>
              {profile.payment_history_status}
            </Badge>
          </div>

          {/* Metadata */}
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>
              <p>Created: {new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p>Last Updated: {new Date(profile.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            💡 This financial profile is the base input for all AI analysis, EMI calculations,
            loan eligibility checks, and financial guidance features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
