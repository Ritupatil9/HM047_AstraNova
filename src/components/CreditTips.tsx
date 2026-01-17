import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Clock, CreditCard } from "lucide-react";

const tips = [
  {
    icon: Clock,
    title: "Payment History",
    tip: "Pay bills on time to improve your score by up to 35%",
    impact: "+35 pts",
  },
  {
    icon: CreditCard,
    title: "Credit Utilization",
    tip: "Keep your credit usage below 30% of your limit",
    impact: "+20 pts",
  },
  {
    icon: TrendingUp,
    title: "Credit Mix",
    tip: "Maintain a healthy mix of credit types",
    impact: "+10 pts",
  },
];

export const CreditTips = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          Tips to Improve Your Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="flex items-start gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
              <tip.icon className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground text-sm">{tip.title}</h4>
                <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">
                  {tip.impact}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{tip.tip}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
