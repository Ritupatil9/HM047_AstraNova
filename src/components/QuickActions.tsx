import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, FileText, PiggyBank, Shield, ArrowRight } from "lucide-react";

const actions = [
  {
    icon: CreditCard,
    title: "Check Credit Score",
    description: "Free, instant credit check",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: FileText,
    title: "View Credit Report",
    description: "Detailed credit analysis",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: PiggyBank,
    title: "Compare Loans",
    description: "Find best rates",
    color: "bg-success/10 text-success",
  },
  {
    icon: Shield,
    title: "Credit Protection",
    description: "Monitor & alerts",
    color: "bg-warning/10 text-warning",
  },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Card 
          key={index} 
          className="glass-card card-hover cursor-pointer group"
        >
          <CardContent className="p-4">
            <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
              <action.icon className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1">{action.title}</h3>
            <p className="text-xs text-muted-foreground">{action.description}</p>
            <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:translate-x-1 group-hover:text-secondary transition-all" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
