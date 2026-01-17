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
import { Wallet, TrendingUp, CreditCard, PiggyBank, Sparkles, Award, Target } from "lucide-react";

// Add animations to global styles
const styles = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-30px, 30px) rotate(-120deg); }
    66% { transform: translate(20px, -20px) rotate(-240deg); }
  }

  @keyframes float-slow {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.1); }
  }

  @keyframes fade-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-right {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fade-left {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .animate-float {
    animation: float 20s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 25s ease-in-out infinite;
  }

  .animate-float-slow {
    animation: float-slow 30s ease-in-out infinite;
  }

  .animate-fade-down {
    animation: fade-down 0.6s ease-out;
  }

  .animate-fade-up {
    animation: fade-up 0.6s ease-out;
  }

  .animate-fade-right {
    animation: fade-right 0.6s ease-out;
  }

  .animate-fade-left {
    animation: fade-left 0.6s ease-out;
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }

  .delay-100 {
    animation-delay: 0.1s;
  }

  .delay-200 {
    animation-delay: 0.2s;
  }

  .delay-300 {
    animation-delay: 0.3s;
  }

  .delay-400 {
    animation-delay: 0.4s;
  }

  .delay-500 {
    animation-delay: 0.5s;
  }

  .delay-75 {
    animation-delay: 0.075s;
  }

  .delay-150 {
    animation-delay: 0.15s;
  }
`;

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
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float-slow" />
      </div>

      <Header />
      
      <main className="container py-8 space-y-8 relative z-10">
        {/* Welcome Section with Enhanced Design */}
        <div className="animate-fade-down">
          <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center animate-pulse-slow">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-600">Your Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Welcome back, <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{(typeof window !== 'undefined' && window.localStorage.getItem('displayName')) || 'Priya'}</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-slate-600 text-lg">
                  Your credit health is improving. Keep up the good work!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with Animation */}
        <div className="animate-fade-up delay-100">
          <QuickActions />
        </div>

        {/* Main Dashboard Grid with Staggered Animation */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Credit Score */}
          <div className="lg:col-span-1 space-y-6 animate-fade-right delay-200">
            <Card className="bg-white/80 backdrop-blur-xl border-white/40 shadow-xl rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Your Credit Score
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-8 relative z-10">
                <CreditScoreGauge score={742} />
              </CardContent>
            </Card>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <CreditTips />
            </div>
          </div>

          {/* Right Column - Stats & Charts */}
          <div className="lg:col-span-2 space-y-6 animate-fade-left delay-300">
            {/* Stats Grid with Hover Effects */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <StatCard
                  title="Credit Limit"
                  value="₹5.2L"
                  icon={Wallet}
                  trend={{ value: 12, isPositive: true }}
                />
              </div>
              <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 delay-75">
                <StatCard
                  title="Utilization"
                  value="28%"
                  subtitle="Good standing"
                  icon={CreditCard}
                />
              </div>
              <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 delay-150">
                <StatCard
                  title="Active Loans"
                  value="2"
                  icon={PiggyBank}
                />
              </div>
              <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 delay-200">
                <StatCard
                  title="Score Change"
                  value="+62"
                  subtitle="Last 6 months"
                  icon={TrendingUp}
                  trend={{ value: 8.5, isPositive: true }}
                />
              </div>
            </div>

            {/* Charts Row with Enhanced Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="transform hover:scale-[1.02] transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-xl border-white/40 shadow-xl rounded-3xl overflow-hidden h-full">
                  <CreditTrendsChart />
                </div>
              </div>
              <div className="transform hover:scale-[1.02] transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-xl border-white/40 shadow-xl rounded-3xl overflow-hidden h-full">
                  <EMICalculator />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Section with Enhanced Design */}
        <div className="space-y-6 animate-fade-up delay-400">
          <div className="bg-gradient-to-r from-white/80 to-indigo-50/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 md:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
                    Loan Options
                  </h2>
                  <p className="text-slate-600 mt-1">Personalized recommendations based on your profile</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700">85% Match</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 transform hover:scale-[1.02] transition-all duration-300">
              <LoanEligibilityCard
                eligibilityScore={85}
                factors={eligibilityFactors}
                maxLoanAmount={1500000}
              />
            </div>
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-4">
              {loanOptions.map((loan, index) => (
                <div 
                  key={loan.id} 
                  className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <LoanComparisonCard loan={loan} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Metrics Section */}
        <div className="animate-fade-up delay-500">
          <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-xl rounded-3xl shadow-xl border border-green-200/40 p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Your Financial Journey</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Keep Building Your Credit</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/60 backdrop-blur rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">+62</div>
                <div className="text-sm text-slate-600">Score Improvement</div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 delay-75">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">85%</div>
                <div className="text-sm text-slate-600">Loan Eligibility</div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 delay-150">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">Good</div>
                <div className="text-sm text-slate-600">Credit Health</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-white/20 mt-16 py-8 bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-xl relative z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm text-slate-600 font-medium">
                © 2024 CreditWise. Empowering your financial journey.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Secure & Encrypted</span>
              <span>•</span>
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </footer>


    </div>
    </>
  );
};

export default Index;