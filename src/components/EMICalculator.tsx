import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(24);

  const emiDetails = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <Calculator className="w-5 h-5 text-secondary" />
          EMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loan Amount */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-muted-foreground">Loan Amount</label>
            <span className="text-sm font-semibold text-foreground">{formatCurrency(loanAmount)}</span>
          </div>
          <Slider
            value={[loanAmount]}
            onValueChange={(value) => setLoanAmount(value[0])}
            min={50000}
            max={5000000}
            step={10000}
            className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-secondary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹50K</span>
            <span>₹50L</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-muted-foreground">Interest Rate</label>
            <span className="text-sm font-semibold text-foreground">{interestRate}%</span>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            min={5}
            max={25}
            step={0.5}
            className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-secondary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>25%</span>
          </div>
        </div>

        {/* Tenure */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-muted-foreground">Tenure (Months)</label>
            <span className="text-sm font-semibold text-foreground">{tenure} months</span>
          </div>
          <Slider
            value={[tenure]}
            onValueChange={(value) => setTenure(value[0])}
            min={6}
            max={84}
            step={6}
            className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-secondary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>6 mo</span>
            <span>84 mo</span>
          </div>
        </div>

        {/* Results */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Monthly EMI</span>
            <span className="text-2xl font-display font-bold text-secondary">
              {formatCurrency(emiDetails.emi)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Interest</span>
            <span className="font-medium text-foreground">{formatCurrency(emiDetails.totalInterest)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Payment</span>
            <span className="font-medium text-foreground">{formatCurrency(emiDetails.totalPayment)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
