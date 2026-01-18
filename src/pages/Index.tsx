import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { CreditScoreGauge } from "@/components/CreditScoreGauge";
import { StatCard } from "@/components/StatCard";
import { CreditTrendsChart } from "@/components/CreditTrendsChart";
import { EMICalculator } from "@/components/EMICalculator";
import { LoanEligibilityCard } from "@/components/LoanEligibilityCard";
import { LoanComparisonCard } from "@/components/LoanComparisonCard";
import { QuickActions } from "@/components/QuickActions";
import { CreditTips } from "@/components/CreditTips";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, CreditCard, PiggyBank } from "lucide-react";

const eligibilityFactors = [
  { name: "Credit Score", status: "pass" as const, detail: "Your score of 742 meets the minimum requirement" },
  { name: "Income Verification", status: "pass" as const, detail: "Monthly income of ₹75,000 verified" },
  { name: "Employment Stability", status: "warning" as const, detail: "Current employer for 8 months (12 months preferred)" },
  { name: "Debt-to-Income Ratio", status: "pass" as const, detail: "Your DTI of 28% is within acceptable limits" },
];

const loanOptions = [
  {
    id: "1",
    bankName: "HDFC Bank",
    logo: "H",
    interestRate: 10.5,
    processingFee: "0.5%",
    maxTenure: 60,
    rating: 4.8,
    features: ["No Prepayment Penalty", "Quick Disbursal", "Flexible EMI"],
    isBestMatch: true,
  },
  {
    id: "2",
    bankName: "ICICI Bank",
    logo: "I",
    interestRate: 10.75,
    processingFee: "1%",
    maxTenure: 72,
    rating: 4.6,
    features: ["Part Payment", "Balance Transfer", "Top-up Loan"],
  },
  {
    id: "3",
    bankName: "SBI",
    logo: "S",
    interestRate: 9.9,
    processingFee: "0.35%",
    maxTenure: 84,
    rating: 4.5,
    features: ["Low Interest", "Long Tenure", "Minimal Docs"],
  },
];

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="animate-fade-up">user?.displayName
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back, <span className="gradient-text">{(typeof window !== 'undefined' && window.localStorage.getItem('displayName')) || 'Priya'}</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Your credit health is improving. Keep up the good work!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-up-delay-1">
          <QuickActions />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 animate-fade-up-delay-2">
          {/* Left Column - Credit Score */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card pulse-glow">
              <CardHeader>
                <CardTitle className="font-display text-lg text-center">Your Credit Score</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <CreditScoreGauge score={742} />
              </CardContent>
            </Card>

            <CreditTips />
          </div>

          {/* Right Column - Stats & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Credit Limit"
                value="₹5.2L"
                icon={Wallet}
                trend={{ value: 12, isPositive: true }}
              />
              <StatCard
                title="Utilization"
                value="28%"
                subtitle="Good standing"
                icon={CreditCard}
              />
              <StatCard
                title="Active Loans"
                value="2"
                icon={PiggyBank}
              />
              <StatCard
                title="Score Change"
                value="+62"
                subtitle="Last 6 months"
                icon={TrendingUp}
                trend={{ value: 8.5, isPositive: true }}
              />
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <CreditTrendsChart />
              <EMICalculator />
            </div>
          </div>
        </div>

        {/* Loan Section */}
        <div className="space-y-6 animate-fade-up-delay-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Loan Options</h2>
              <p className="text-muted-foreground mt-1">Personalized recommendations based on your profile</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <LoanEligibilityCard
                eligibilityScore={85}
                factors={eligibilityFactors}
                maxLoanAmount={1500000}
              />
            </div>
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-4">
              {loanOptions.map((loan) => (
                <LoanComparisonCard key={loan.id} loan={loan} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8 bg-muted/30">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CreditUp. Empowering your financial journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
