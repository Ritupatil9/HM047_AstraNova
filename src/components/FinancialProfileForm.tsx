import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFinancialProfile, FinancialProfile } from "@/services/financialProfileApi";
import { useAuth } from "@/contexts/AuthContext";

interface FinancialProfileFormProps {
  initialData?: Partial<FinancialProfile>;
  isEdit?: boolean;
  onSuccess?: (profile: FinancialProfile) => void;
}

const EMPLOYMENT_TYPES = [
  "Salaried",
  "Self-Employed",
  "Freelancer",
  "Business Owner",
  "Retired",
  "Student",
];

const PAYMENT_HISTORY_STATUSES = [
  "Excellent",
  "Good",
  "Fair",
  "Poor",
  "No History",
];

/**
 * Financial Profile Form Component
 * 
 * Responsibility: Collect user input and display form UI
 * Frontend ONLY handles:
 * - Form rendering
 * - User input collection
 * - API calls via service
 * - Success/error state display
 * 
 * Backend OWNS:
 * - Data validation
 * - Business logic
 * - Authorization
 * - Persistence
 */
export const FinancialProfileForm: React.FC<FinancialProfileFormProps> = ({
  initialData,
  isEdit = false,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { createProfile, updateProfile } = useFinancialProfile();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    age: initialData?.age || "",
    monthly_income: initialData?.monthly_income || "",
    monthly_expenses: initialData?.monthly_expenses || "",
    employment_type: initialData?.employment_type || "",
    existing_loan_amount: initialData?.existing_loan_amount || "",
    credit_utilization_percentage: initialData?.credit_utilization_percentage || "",
    payment_history_status: initialData?.payment_history_status || "",
  });

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Convert string values to numbers
      const profileData = {
        age: parseInt(formData.age as string),
        monthly_income: parseFloat(formData.monthly_income as string),
        monthly_expenses: parseFloat(formData.monthly_expenses as string),
        employment_type: formData.employment_type,
        existing_loan_amount: parseFloat(formData.existing_loan_amount as string),
        credit_utilization_percentage: parseFloat(
          formData.credit_utilization_percentage as string
        ),
        payment_history_status: formData.payment_history_status,
      };

      let result: FinancialProfile;

      if (isEdit) {
        // Update existing profile
        result = await updateProfile(profileData);
      } else {
        // Create new profile
        result = await createProfile(profileData);
      }

      setSuccess(true);
      setFormData({
        age: "",
        monthly_income: "",
        monthly_expenses: "",
        employment_type: "",
        existing_loan_amount: "",
        credit_utilization_percentage: "",
        payment_history_status: "",
      });

      if (onSuccess) {
        onSuccess(result);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save financial profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {isEdit ? "Update Financial Profile" : "Create Financial Profile"}
        </CardTitle>
        <CardDescription>
          {isEdit
            ? "Update your financial information"
            : "Enter your financial details to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert className="bg-red-500/10 border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-500">{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="bg-green-500/10 border-green-500/20">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-500">
                {isEdit
                  ? "Financial profile updated successfully!"
                  : "Financial profile created successfully!"}
              </AlertDescription>
            </Alert>
          )}

          {/* Age */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Age</label>
            <Input
              type="number"
              placeholder="28"
              min="18"
              max="100"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">Between 18 and 100 years</p>
          </div>

          {/* Monthly Income */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Income (₹)</label>
            <Input
              type="number"
              placeholder="75000"
              min="0"
              value={formData.monthly_income}
              onChange={(e) => handleInputChange("monthly_income", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Monthly Expenses */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Expenses (₹)</label>
            <Input
              type="number"
              placeholder="40000"
              min="0"
              value={formData.monthly_expenses}
              onChange={(e) => handleInputChange("monthly_expenses", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Employment Type</label>
            <Select
              value={formData.employment_type}
              onValueChange={(value) => handleInputChange("employment_type", value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Existing Loan Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Existing Loan Amount (₹)</label>
            <Input
              type="number"
              placeholder="500000"
              min="0"
              value={formData.existing_loan_amount}
              onChange={(e) =>
                handleInputChange("existing_loan_amount", e.target.value)
              }
              disabled={loading}
            />
          </div>

          {/* Credit Utilization Percentage */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Credit Utilization Percentage (%)
            </label>
            <Input
              type="number"
              placeholder="45"
              min="0"
              max="100"
              value={formData.credit_utilization_percentage}
              onChange={(e) =>
                handleInputChange("credit_utilization_percentage", e.target.value)
              }
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">Between 0 and 100</p>
          </div>

          {/* Payment History Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment History Status</label>
            <Select
              value={formData.payment_history_status}
              onValueChange={(value) =>
                handleInputChange("payment_history_status", value)
              }
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment history" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_HISTORY_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEdit ? "Update Profile" : "Create Profile"
            )}
          </Button>

          {/* Helper Text */}
          <p className="text-xs text-muted-foreground text-center">
            {isEdit
              ? "Your data is securely stored and never shared"
              : "This information helps us provide personalized financial guidance"}
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
