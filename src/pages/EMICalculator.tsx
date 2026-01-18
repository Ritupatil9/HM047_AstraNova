import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  ArrowLeft,
  Calculator,
  TrendingUp,
  Zap,
  PieChart,
  AlertCircle,
} from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EMICalculation {
  calculation: {
    principal: number;
    annualInterestRate: number;
    tenureMonths: number;
    tenureYears: number;
    monthlyEMI: number;
    totalInterest: number;
    totalRepayment: number;
  };
  breakup: {
    principal: number;
    interest: number;
    principalPercentage: number;
    interestPercentage: number;
  };
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function EMICalculatorPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    principal: "1000000",
    annualRate: "8.5",
    tenure: "60",
    tenureUnit: "months",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EMICalculation | null>(null);
  const [activeTab, setActiveTab] = useState("summary");

  // Auto-calculate on input change
  useEffect(() => {
    const calculateEMI = async () => {
      if (!inputs.principal || !inputs.annualRate || !inputs.tenure) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/emi/calculate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              principal: parseFloat(inputs.principal),
              annualRate: parseFloat(inputs.annualRate),
              tenure: parseFloat(inputs.tenure),
              tenureUnit: inputs.tenureUnit,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to calculate EMI");
        }

        const data = await response.json();
        setResult(data.data);
      } catch (err) {
        console.error("Error calculating EMI:", err);
        setError(err instanceof Error ? err.message : "Calculation failed");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(calculateEMI, 500);
    return () => clearTimeout(timer);
  }, [inputs]);

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(value);
  };

  const pieData =
    result && result.breakup
      ? [
          {
            name: "Principal",
            value: Math.round(result.breakup.principalPercentage),
            color: "#3b82f6",
          },
          {
            name: "Interest",
            value: Math.round(result.breakup.interestPercentage),
            color: "#ef4444",
          },
        ]
      : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        {/* Header Section */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">EMI Calculator</h1>
            <p className="text-muted-foreground text-lg">
              Calculate your monthly EMI, view amortization schedule, and plan your loan repayment
            </p>
          </div>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Section */}
          <Card className="lg:col-span-1 shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Loan Details
              </CardTitle>
              <CardDescription>Enter your loan information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Principal Amount */}
              <div className="space-y-2">
                <Label className="font-semibold">Loan Amount (₹)</Label>
                <Input
                  type="number"
                  placeholder="Enter loan amount"
                  value={inputs.principal}
                  onChange={(e) => handleInputChange("principal", e.target.value)}
                  min="10000"
                  step="10000"
                  className="text-lg border-2"
                />
                <p className="text-xs text-muted-foreground">
                  {inputs.principal && formatCurrency(parseFloat(inputs.principal))}
                </p>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label className="font-semibold">Annual Interest Rate (%)</Label>
                <Input
                  type="number"
                  placeholder="Enter interest rate"
                  value={inputs.annualRate}
                  onChange={(e) => handleInputChange("annualRate", e.target.value)}
                  min="0"
                  max="50"
                  step="0.1"
                  className="text-lg border-2"
                />
                <p className="text-xs text-muted-foreground">
                  {inputs.annualRate && `${parseFloat(inputs.annualRate).toFixed(2)}% per annum`}
                </p>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Loan Tenure</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter tenure"
                      value={inputs.tenure}
                      onChange={(e) => handleInputChange("tenure", e.target.value)}
                      min="1"
                      step="1"
                      className="text-lg border-2 flex-1"
                    />
                    <select
                      value={inputs.tenureUnit}
                      onChange={(e) => handleInputChange("tenureUnit", e.target.value)}
                      className="px-3 border-2 rounded-md bg-background text-sm font-medium cursor-pointer"
                    >
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {inputs.tenure &&
                      `${parseFloat(inputs.tenure)} ${
                        inputs.tenureUnit === "years"
                          ? "years"
                          : parseFloat(inputs.tenure) === 1
                            ? "month"
                            : "months"
                      }`}
                  </p>
                </div>
              </div>

              {/* Quick Summary Cards */}
              {result && (
                <div className="space-y-3 pt-4 border-t-2">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-900 font-medium">Monthly EMI</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(result.calculation.monthlyEMI)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900 font-medium">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.calculation.totalRepayment)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-900 font-medium">Total Interest</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(result.calculation.totalInterest)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            {result && (
              <Card className="shadow-lg border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Loan Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(result.calculation.principal)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-bold text-lg">
                          {result.calculation.annualInterestRate.toFixed(2)}% p.a.
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Tenure</span>
                        <span className="font-bold text-lg">
                          {result.calculation.tenureMonths} months (
                          {result.calculation.tenureYears.toFixed(1)} years)
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b bg-blue-50 px-3 py-2 rounded">
                        <span className="text-blue-900 font-medium">Monthly EMI</span>
                        <span className="font-bold text-lg text-blue-600">
                          {formatCurrency(result.calculation.monthlyEMI)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b bg-orange-50 px-3 py-2 rounded">
                        <span className="text-orange-900 font-medium">Total Interest</span>
                        <span className="font-bold text-lg text-orange-600">
                          {formatCurrency(result.calculation.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b bg-green-50 px-3 py-2 rounded">
                        <span className="text-green-900 font-medium">Total Repayment</span>
                        <span className="font-bold text-lg text-green-600">
                          {formatCurrency(result.calculation.totalRepayment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pie Chart - Principal vs Interest */}
            {result && (
              <Card className="shadow-lg border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Principal vs Interest Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Chart */}
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <p className="text-sm font-medium text-blue-900">Principal</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(result.breakup.principal)}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          {result.breakup.principalPercentage.toFixed(1)}% of total
                        </p>
                      </div>

                      <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <p className="text-sm font-medium text-red-900">Interest</p>
                        </div>
                        <p className="text-2xl font-bold text-red-600">
                          {formatCurrency(result.breakup.interest)}
                        </p>
                        <p className="text-xs text-red-700 mt-1">
                          {result.breakup.interestPercentage.toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Amortization Schedule */}
        {result && (
          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Amortization Schedule
              </CardTitle>
              <CardDescription>
                Month-by-month breakdown of your EMI payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2">
                      <TableHead className="font-bold">Month</TableHead>
                      <TableHead className="text-right font-bold">EMI (₹)</TableHead>
                      <TableHead className="text-right font-bold">Principal (₹)</TableHead>
                      <TableHead className="text-right font-bold">Interest (₹)</TableHead>
                      <TableHead className="text-right font-bold">Balance (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.amortizationSchedule.map((row, index) => (
                      <TableRow
                        key={index}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          row.balance === 0 ? "bg-green-50" : ""
                        }`}
                      >
                        <TableCell className="font-medium">
                          {row.month}
                          {row.balance === 0 && (
                            <span className="text-xs ml-2 bg-green-200 text-green-800 px-2 py-1 rounded">
                              Paid
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(row.emi)}
                        </TableCell>
                        <TableCell className="text-right text-blue-600 font-medium">
                          {formatCurrency(row.principal)}
                        </TableCell>
                        <TableCell className="text-right text-red-600 font-medium">
                          {formatCurrency(row.interest)}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatCurrency(row.balance)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total EMI Paid</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(
                      result.amortizationSchedule.reduce((sum, row) => sum + row.emi, 0)
                    )}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Principal Paid</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(
                      result.amortizationSchedule.reduce((sum, row) => sum + row.principal, 0)
                    )}
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest Paid</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(
                      result.amortizationSchedule.reduce((sum, row) => sum + row.interest, 0)
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
