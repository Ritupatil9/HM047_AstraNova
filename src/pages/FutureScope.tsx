import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Bot,
  Building2,
  Brain,
  Bell,
  Banknote,
  FileCheck,
  Lock,
  Globe,
  Smartphone,
} from "lucide-react";

export default function FutureScope() {
  const futureFeatures = [
    {
      id: 1,
      title: "What-If Credit Simulation",
      description: "Simulate future financial decisions and instantly see how your credit score may change based on income increase, loan closure, or expense reduction.",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "AI-Driven Personalized Credit Coach",
      description: "An intelligent assistant that continuously analyzes your behavior and provides step-by-step guidance to improve your credit health.",
      icon: Bot,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      title: "Real Credit Bureau Integration",
      description: "Integration with official credit bureaus (CIBIL, Experian, Equifax) to fetch real-time credit scores instead of simulated data.",
      icon: Building2,
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      title: "Advanced Machine Learning Models",
      description: "Upgrade from rule-based logic to trained ML models for more accurate credit score prediction and eligibility analysis.",
      icon: Brain,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 5,
      title: "Automated Financial Alerts",
      description: "Smart notifications for EMI due dates, high credit utilization, missed payments, and score drops to keep you informed.",
      icon: Bell,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 6,
      title: "Bank & Loan Provider API Integration",
      description: "Direct integration with banks and NBFCs to show live loan offers, interest rates, and eligibility results in real-time.",
      icon: Banknote,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: 7,
      title: "Document Upload & Verification",
      description: "Upload income proofs, bank statements, and ID documents for enhanced credit assessment and faster loan processing.",
      icon: FileCheck,
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 8,
      title: "Blockchain-Based Credit History",
      description: "Secure and tamper-proof storage of credit score history using blockchain technology for maximum security and transparency.",
      icon: Lock,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: 9,
      title: "Multi-Language Support",
      description: "Support for multiple regional languages to make the platform accessible to a wider audience across India.",
      icon: Globe,
      color: "from-violet-500 to-violet-600",
    },
    {
      id: 10,
      title: "Mobile App Version",
      description: "A future mobile application to provide seamless access to credit tracking and loan tools on the go.",
      icon: Smartphone,
      color: "from-rose-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Future Roadmap
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore exciting features and enhancements planned for future versions of CreditUp.
            We're continuously innovating to provide you with the best financial intelligence platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {futureFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.id}
                className="group transition-all duration-300 hover:shadow-xl hover:scale-105 glass-card border border-slate-200/50"
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-sm font-bold flex-shrink-0">
                      {feature.id}
                    </span>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200/50">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Why These Features Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-700">🎯 Scalability</h3>
              <p className="text-sm text-slate-600">
                Building a platform that grows with your financial needs and adapts to market changes.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-700">🤖 AI Enhancements</h3>
              <p className="text-sm text-slate-600">
                Leveraging machine learning to provide smarter insights and more accurate predictions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-700">🔒 Security</h3>
              <p className="text-sm text-slate-600">
                Implementing blockchain and advanced encryption for maximum data protection.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
