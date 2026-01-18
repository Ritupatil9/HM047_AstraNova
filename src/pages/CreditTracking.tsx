import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, TrendingUp, Zap, Target, CheckCircle, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, AreaChart } from "recharts";
import { useNavigate } from "react-router-dom";

interface CreditScoreHistory {
  score: number;
  month: string;
  year: number;
  monthYear: string;
  category: string;
  name?: string;
  fullName?: string;
}

export default function CreditTrackingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CreditScoreHistory[]>([]);
  const [stats, setStats] = useState({
    latestScore: 0,
    average: 0,
    highest: 0,
    lowest: 0,
    trend: 0,
  });

  useEffect(() => {
    const fetchCreditScoreHistory = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/credit-score/history`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await user.getIdToken()}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch credit score history");
        }

        const data = await response.json();
        const historyData = data.data.history;

        // Format data for chart
        const formattedData = historyData.map((item: CreditScoreHistory) => ({
          ...item,
          name: `${item.month}/${item.year}`,
          fullName: getMonthName(parseInt(item.month)) + " " + item.year,
        }));

        setHistory(formattedData);

        // Calculate statistics
        if (formattedData.length > 0) {
          const scores = formattedData.map((item: CreditScoreHistory) => item.score);
          const latestScore = scores[scores.length - 1];
          const average = Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length);
          const highest = Math.max(...scores);
          const lowest = Math.min(...scores);
          const trend = scores.length > 1 ? latestScore - scores[scores.length - 2] : 0;

          setStats({
            latestScore,
            average,
            highest,
            lowest,
            trend,
          });
        }
      } catch (err) {
        console.error("Error fetching history:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCreditScoreHistory();
  }, [user]);

  const getMonthName = (month: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1];
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Excellent":
        return "#10b981"; // green
      case "Good":
        return "#3b82f6"; // blue
      case "Fair":
        return "#f59e0b"; // amber
      case "Poor":
        return "#ef4444"; // red
      case "Very Poor":
        return "#7f1d1d"; // dark red
      default:
        return "#6b7280"; // gray
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "Excellent":
        return "🚀";
      case "Good":
        return "📈";
      case "Fair":
        return "📊";
      case "Poor":
        return "⚠️";
      case "Very Poor":
        return "🔴";
      default:
        return "📱";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading your credit tracking data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold tracking-tight">Credit Score Tracking</h1>
            <p className="text-muted-foreground text-lg">
              Monitor your credit score progress over time and track your financial journey
            </p>
          </div>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Latest Score */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-900">Latest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-600">{stats.latestScore}</p>
                  <p className="text-xs text-blue-700 mt-1">{history[history.length - 1]?.category}</p>
                </div>
                <div className="text-4xl">{getCategoryEmoji(history[history.length - 1]?.category)}</div>
              </div>
            </CardContent>
          </Card>

          {/* Average Score */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-900">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-600">{stats.average}</p>
                  <p className="text-xs text-green-700 mt-1">Overall Average</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </CardContent>
          </Card>

          {/* Highest Score */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-900">Highest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-purple-600">{stats.highest}</p>
                  <p className="text-xs text-purple-700 mt-1">Peak Performance</p>
                </div>
                <div className="text-4xl">⭐</div>
              </div>
            </CardContent>
          </Card>

          {/* Lowest Score */}
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-900">Lowest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-orange-600">{stats.lowest}</p>
                  <p className="text-xs text-orange-700 mt-1">Historical Low</p>
                </div>
                <div className="text-4xl">📉</div>
              </div>
            </CardContent>
          </Card>

          {/* Trend */}
          <Card className={`bg-gradient-to-br ${
            stats.trend >= 0
              ? "from-emerald-50 to-emerald-100 border-emerald-200"
              : "from-red-50 to-red-100 border-red-200"
          }`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                {stats.trend >= 0 ? "📈 Trend" : "📉 Trend"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-3xl font-bold ${
                    stats.trend >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {stats.trend >= 0 ? "+" : ""}{stats.trend}
                  </p>
                  <p className={`text-xs mt-1 ${
                    stats.trend >= 0 ? "text-emerald-700" : "text-red-700"
                  }`}>
                    Month-over-Month
                  </p>
                </div>
                <div className="text-2xl">{stats.trend >= 0 ? "✨" : "⚠️"}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="mb-8 shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Credit Score Trend Chart
            </CardTitle>
            <CardDescription>
              Your credit score journey over the past {history.length} month{history.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={history}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      stroke="#6b7280"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis
                      domain={[300, 850]}
                      stroke="#6b7280"
                      style={{ fontSize: "12px" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "2px solid #3b82f6",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      }}
                      formatter={(value: number) => [value, "Score"]}
                      labelFormatter={(label: string) => `Month: ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                      dot={{
                        fill: "#3b82f6",
                        r: 6,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 8,
                        strokeWidth: 2,
                        fill: "#3b82f6",
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                <p>No data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* History Table */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Monthly Credit Score History
            </CardTitle>
            <CardDescription>
              Detailed month-wise breakdown of your credit scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Month</th>
                      <th className="text-left py-3 px-4 font-semibold">Score</th>
                      <th className="text-left py-3 px-4 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 font-semibold">Change</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => {
                      const previousScore = index > 0 ? history[index - 1].score : item.score;
                      const change = item.score - previousScore;
                      const changePercentage = ((change / previousScore) * 100).toFixed(1);

                      return (
                        <tr
                          key={item.monthYear}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium">{item.fullName}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-lg font-bold text-primary">
                              {item.score}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{getCategoryEmoji(item.category)}</span>
                              <span
                                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                style={{ backgroundColor: getCategoryColor(item.category) }}
                              >
                                {item.category}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`font-medium ${
                              change > 0
                                ? "text-green-600"
                                : change < 0
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}>
                              {change > 0 ? "+" : ""}{change} ({changePercentage}%)
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {index === history.length - 1 ? (
                              <div className="flex items-center gap-2 text-green-600 font-medium">
                                <CheckCircle className="w-4 h-4" />
                                Latest
                              </div>
                            ) : (
                              <div className="text-gray-500">
                                {history.length - 1 - index} month{history.length - 1 - index !== 1 ? "s" : ""} ago
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <p>No history data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insights Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.trend > 0 ? (
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-semibold text-green-900">Great Progress!</p>
                  <p className="text-sm text-green-800">
                    Your credit score increased by {stats.trend} points this month. Keep up the good financial habits!
                  </p>
                </div>
              </div>
            ) : stats.trend < 0 ? (
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl">📌</div>
                <div>
                  <p className="font-semibold text-orange-900">Score Declined</p>
                  <p className="text-sm text-orange-800">
                    Your score decreased by {Math.abs(stats.trend)} points. Review your financial profile and identify areas for improvement.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl">📊</div>
                <div>
                  <p className="font-semibold text-blue-900">Score Stable</p>
                  <p className="text-sm text-blue-800">
                    Your credit score remains consistent. Focus on building positive financial habits to increase it further.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl">💡</div>
              <div>
                <p className="font-semibold text-purple-900">You're Doing Well!</p>
                <p className="text-sm text-purple-800">
                  You are actively tracking your credit score. Continue monitoring your financial profile regularly and make informed decisions to improve your creditworthiness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/credit-score")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            Calculate Your Latest Credit Score
          </Button>
        </div>
      </main>
    </div>
  );
}
