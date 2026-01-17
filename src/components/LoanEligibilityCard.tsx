import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface EligibilityFactor {
  name: string;
  status: "pass" | "fail" | "warning";
  detail: string;
}

interface LoanEligibilityCardProps {
  eligibilityScore: number;
  factors: EligibilityFactor[];
  maxLoanAmount: number;
}

export const LoanEligibilityCard = ({ 
  eligibilityScore, 
  factors, 
  maxLoanAmount 
}: LoanEligibilityCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: EligibilityFactor["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-display text-lg">Loan Eligibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Eligibility Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm text-muted-foreground">Eligibility Score</span>
            <span className="text-2xl font-display font-bold text-foreground">{eligibilityScore}%</span>
          </div>
          <Progress 
            value={eligibilityScore} 
            className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-secondary [&>div]:to-primary"
          />
        </div>

        {/* Max Loan Amount */}
        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
          <p className="text-sm text-muted-foreground">Maximum Eligible Amount</p>
          <p className="text-3xl font-display font-bold text-secondary mt-1">
            {formatCurrency(maxLoanAmount)}
          </p>
        </div>

        {/* Factors */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Eligibility Factors</p>
          {factors.map((factor, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
            >
              {getStatusIcon(factor.status)}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{factor.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{factor.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
