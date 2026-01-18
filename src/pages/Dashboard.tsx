import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Zap,
  PieChart,
  Target,
  Brain,
  HelpCircle,
  Sparkles,
  Shield,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      id: "credit-score",
      title: "Check Credit Score",
      description: "Get your AI-powered credit score (300-850) with detailed analysis of financial factors",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      status: "available",
      action: () => navigate("/credit-score"),
    },
    {
      id: "loan-eligibility",
      title: "Loan Eligibility",
      description: "Check your eligibility for various loan products based on your profile",
      icon: Zap,
      color: "from-purple-500 to-purple-600",
      status: "available",
      action: () => navigate("/loans"),
    },
    {
      id: "emi-calculator",
      title: "EMI Calculator",
      description: "Calculate your monthly EMI with different loan amounts and tenure",
      icon: PieChart,
      color: "from-green-500 to-green-600",
      status: "available",
      action: () => navigate("/emi-calculator"),
    },
    {
      id: "credit-tracking",
      title: "Credit Tracking",
      description: "Track your credit score progress and improvements over time",
      icon: Target,
      color: "from-orange-500 to-orange-600",
      status: "available",
      action: () => navigate("/credit-tracking"),
    },
    {
      id: "what-if",
      title: "What-If Simulation",
      description: "Simulate financial scenarios to see how changes affect your score",
      icon: Brain,
      color: "from-pink-500 to-pink-600",
      status: "available",
      action: () => navigate("/what-if-simulation"),
    },
    {
      id: "financial-guidance",
      title: "Financial Guidance",
      description: "Get personalized recommendations to improve your financial health",
      icon: HelpCircle,
      color: "from-indigo-500 to-indigo-600",
      status: "available",
      action: () => navigate("/insights"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        {/* Page Header */}
        <div className="mb-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Financial Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to CreditUp
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your intelligent partner for financial health and credit management
          </p>
        </div>
        <div className="mb-16" id="features">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Explore Features</h2>
          </div>
        </div> 

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isAvailable = feature.status === "available";

            return (
              <Card
                key={feature.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  !isAvailable ? "opacity-75" : ""
                }`}
                onClick={() => isAvailable && feature.action()}
              >
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    {isAvailable ? (
                      <Button
                        className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg`}
                        onClick={(e) => {
                          e.stopPropagation();
                          feature.action();
                        }}
                      >
                        Try Now
                      </Button>
                    ) : (
                      <div className="w-full">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-muted-foreground bg-muted rounded-full">
                          Try Now
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Credit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-2">
                A three-digit score that indicates your creditworthiness
              </p>
              <p className="text-3xl font-bold text-blue-600">300-850</p>
              <p className="text-xs text-muted-foreground mt-2">
                Range used by financial institutions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What We Analyze</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Income Stability</li>
                <li>✓ Debt-to-Income Ratio</li>
                <li>✓ Loan Management</li>
                <li>✓ Credit Utilization</li>
                <li>✓ Payment History</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Score Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>Excellent:</span><span className="font-semibold">750+</span></li>
                <li className="flex justify-between"><span>Good:</span><span className="font-semibold">670-749</span></li>
                <li className="flex justify-between"><span>Fair:</span><span className="font-semibold">580-669</span></li>
                <li className="flex justify-between"><span>Poor:</span><span className="font-semibold">&lt;580</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}