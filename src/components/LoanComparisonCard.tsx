import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

interface LoanOption {
  id: string;
  bankName: string;
  logo: string;
  interestRate: number;
  processingFee: string;
  maxTenure: number;
  rating: number;
  features: string[];
  isBestMatch?: boolean;
}

interface LoanComparisonCardProps {
  loan: LoanOption;
}

export const LoanComparisonCard = ({ loan }: LoanComparisonCardProps) => {
  return (
    <Card className={`glass-card card-hover relative overflow-hidden ${
      loan.isBestMatch ? 'ring-2 ring-secondary' : ''
    }`}>
      {loan.isBestMatch && (
        <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
          Best Match
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl font-bold text-primary">
              {loan.bankName.charAt(0)}
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">{loan.bankName}</h3>
              <div className="flex items-center gap-1 text-warning">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{loan.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Interest Rate</p>
            <p className="text-xl font-display font-bold text-secondary">{loan.interestRate}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Processing Fee</p>
            <p className="text-sm font-semibold text-foreground">{loan.processingFee}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Max Tenure</p>
            <p className="text-sm font-semibold text-foreground">{loan.maxTenure} months</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {loan.features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <Button className="w-full group" variant={loan.isBestMatch ? "default" : "outline"}>
          Apply Now
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};
