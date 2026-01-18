import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, TrendingUp, AlertCircle, ChevronRight } from "lucide-react";

interface SimulationResult {
  currentScore: number;
  projectedScore: number;
  improvement: number;
  timeframe: string;
}

export default function WhatIfSimulation() {
  const [currentScore, setCurrentScore] = useState(650);
  const [simulationParams, setSimulationParams] = useState({
    paymentHistory: 0, // -5 to +10
    creditUtilization: 0, // -10 to +30
    loanPaymentAmount: 0, // -5000 to +20000
    newCreditInquiry: false,
  });

  const [result, setResult] = useState<SimulationResult | null>(null);

  const calculateProjectedScore = () => {
    let adjustment = 0;

    // Payment history impact
    adjustment += simulationParams.paymentHistory * 15;

    // Credit utilization impact
    adjustment += simulationParams.creditUtilization * 2;

    // Loan payment impact (positive payment improves credit)
    adjustment += (simulationParams.loanPaymentAmount / 1000) * 0.5;

    // New credit inquiry impact
    if (simulationParams.newCreditInquiry) {
      adjustment -= 10;
    }

    const projectedScore = Math.min(
      850,
      Math.max(300, currentScore + adjustment)
    );

    const improvement = projectedScore - currentScore;
    const timeframe = improvement > 0 ? "3-6 months" : "2-4 weeks";

    setResult({
      currentScore,
      projectedScore: Math.round(projectedScore),
      improvement: Math.round(improvement),
      timeframe,
    });
  };

  const resetSimulation = () => {
    setSimulationParams({
      paymentHistory: 0,
      creditUtilization: 0,
      loanPaymentAmount: 0,
      newCreditInquiry: false,
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container flex-1 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            <span>Financial Scenario Planning</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            What-If Simulation
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Simulate different financial scenarios to see how your actions impact
            your credit score over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Simulation Controls */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Adjust Your Scenario</CardTitle>
                <CardDescription>
                  Modify different financial factors to see the impact on your score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Current Score */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Your Current Credit Score
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="300"
                      max="850"
                      value={currentScore}
                      onChange={(e) => setCurrentScore(parseInt(e.target.value) || 650)}
                      className="w-24 text-center"
                    />
                    <span className="text-2xl font-bold text-blue-600">
                      {currentScore}
                    </span>
                  </div>
                </div>

                {/* Payment History */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Payment History Impact: {simulationParams.paymentHistory > 0 ? "+" : ""}{simulationParams.paymentHistory}
                  </Label>
                  <p className="text-sm text-slate-500">
                    Make on-time payments to improve your score
                  </p>
                  <Slider
                    value={[simulationParams.paymentHistory]}
                    onValueChange={(value) =>
                      setSimulationParams({
                        ...simulationParams,
                        paymentHistory: value[0],
                      })
                    }
                    min={-5}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Missed Payments</span>
                    <span>Perfect Payments</span>
                  </div>
                </div>

                {/* Credit Utilization */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Credit Utilization Reduction: {simulationParams.creditUtilization > 0 ? "+" : ""}{simulationParams.creditUtilization}%
                  </Label>
                  <p className="text-sm text-slate-500">
                    Reduce your credit card balances relative to limits
                  </p>
                  <Slider
                    value={[simulationParams.creditUtilization]}
                    onValueChange={(value) =>
                      setSimulationParams({
                        ...simulationParams,
                        creditUtilization: value[0],
                      })
                    }
                    min={-10}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Higher Utilization</span>
                    <span>Lower Utilization</span>
                  </div>
                </div>

                {/* Loan Payment Amount */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Additional Loan Payments: ${simulationParams.loanPaymentAmount.toLocaleString()}
                  </Label>
                  <p className="text-sm text-slate-500">
                    Extra payments towards your existing loans
                  </p>
                  <Slider
                    value={[simulationParams.loanPaymentAmount]}
                    onValueChange={(value) =>
                      setSimulationParams({
                        ...simulationParams,
                        loanPaymentAmount: value[0],
                      })
                    }
                    min={-5000}
                    max={20000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>$0</span>
                    <span>$20,000</span>
                  </div>
                </div>

                {/* New Credit Inquiry */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    New Credit Inquiry
                  </Label>
                  <p className="text-sm text-slate-500">
                    Applying for new credit temporarily impacts your score
                  </p>
                  <Button
                    variant={
                      simulationParams.newCreditInquiry ? "default" : "outline"
                    }
                    onClick={() =>
                      setSimulationParams({
                        ...simulationParams,
                        newCreditInquiry: !simulationParams.newCreditInquiry,
                      })
                    }
                    className="w-full"
                  >
                    {simulationParams.newCreditInquiry
                      ? "Will Apply for New Credit"
                      : "No New Credit Application"}
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={calculateProjectedScore}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Calculate Impact
                  </Button>
                  <Button
                    onClick={resetSimulation}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div>
            {result ? (
              <Card className="sticky top-24 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
                <CardHeader>
                  <CardTitle className="text-xl">Projected Impact</CardTitle>
                  <CardDescription>Based on your scenario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score Comparison */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Current Score</p>
                      <p className="text-3xl font-bold text-slate-800">
                        {result.currentScore}
                      </p>
                    </div>
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                        style={{
                          width: `${((result.projectedScore - 300) / 550) * 100}%`,
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Projected Score</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {result.projectedScore}
                      </p>
                    </div>
                  </div>

                  {/* Improvement */}
                  <Alert
                    className={`border-0 ${
                      result.improvement >= 0
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <TrendingUp
                      className={`w-4 h-4 ${
                        result.improvement >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                    <AlertDescription
                      className={
                        result.improvement >= 0
                          ? "text-green-800"
                          : "text-red-800"
                      }
                    >
                      <strong>
                        {result.improvement >= 0 ? "+" : ""}
                        {result.improvement} points
                      </strong>{" "}
                      in {result.timeframe}
                    </AlertDescription>
                  </Alert>

                  {/* Insights */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-800">
                      Key Insights
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {result.improvement > 0 ? (
                        <>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                            Great! Your score will improve with these actions
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                            Focus on making timely payments
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                            Keep credit utilization below 30%
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 text-orange-600 flex-shrink-0" />
                            This scenario would negatively impact your score
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 text-orange-600 flex-shrink-0" />
                            Avoid new credit inquiries if possible
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-24 border-2 border-dashed border-slate-300">
                <CardContent className="pt-8">
                  <div className="text-center space-y-4">
                    <Brain className="w-12 h-12 text-slate-400 mx-auto" />
                    <p className="text-slate-600 font-medium">
                      Adjust your scenario parameters and calculate to see the
                      projected impact on your credit score.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
