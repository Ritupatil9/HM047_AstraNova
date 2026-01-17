import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", score: 680 },
  { month: "Feb", score: 695 },
  { month: "Mar", score: 685 },
  { month: "Apr", score: 710 },
  { month: "May", score: 725 },
  { month: "Jun", score: 742 },
];

export const CreditTrendsChart = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-display text-lg">Credit Score Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(220, 15%, 45%)', fontSize: 12 }}
              />
              <YAxis 
                domain={[600, 800]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(220, 15%, 45%)', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(210, 20%, 88%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px hsl(220 30% 15% / 0.08)',
                }}
                labelStyle={{ color: 'hsl(220, 30%, 15%)' }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(170, 60%, 45%)"
                strokeWidth={3}
                fill="url(#scoreGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
