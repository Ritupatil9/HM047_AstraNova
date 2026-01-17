import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, DollarSign, CreditCard, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface PredictionResult {
  creditScore: number;
  loanEligibility: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  maxLoanAmount: number;
  interestRate: number;
  recommendations: string[];
  riskFactors: string[];
}

const AIPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    existingLoans: '',
    creditCardUsage: '',
    paymentHistory: 'ontime',
    employmentYears: '',
    age: '',
    existingCreditScore: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrediction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI prediction logic
    const income = parseFloat(formData.monthlyIncome) || 0;
    const existingLoans = parseFloat(formData.existingLoans) || 0;
    const creditUsage = parseFloat(formData.creditCardUsage) || 0;
    const currentScore = parseFloat(formData.existingCreditScore) || 650;
    const employmentYears = parseFloat(formData.employmentYears) || 0;
    
    // Calculate base score
    let predictedScore = currentScore;
    
    // Income factor
    if (income > 100000) predictedScore += 20;
    else if (income > 50000) predictedScore += 10;
    else if (income < 30000) predictedScore -= 10;
    
    // Debt-to-income ratio
    const debtToIncome = (existingLoans / income) * 100;
    if (debtToIncome > 40) predictedScore -= 30;
    else if (debtToIncome > 30) predictedScore -= 15;
    else if (debtToIncome < 20) predictedScore += 15;
    
    // Credit utilization
    if (creditUsage < 30) predictedScore += 20;
    else if (creditUsage > 70) predictedScore -= 25;
    
    // Payment history
    if (formData.paymentHistory === 'ontime') predictedScore += 30;
    else if (formData.paymentHistory === 'occasional') predictedScore -= 15;
    else predictedScore -= 40;
    
    // Employment stability
    if (employmentYears > 5) predictedScore += 15;
    else if (employmentYears < 1) predictedScore -= 10;
    
    // Cap the score
    predictedScore = Math.max(300, Math.min(850, predictedScore));
    
    // Determine eligibility
    let eligibility: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    if (predictedScore >= 750) eligibility = 'Excellent';
    else if (predictedScore >= 700) eligibility = 'Good';
    else if (predictedScore >= 650) eligibility = 'Fair';
    else eligibility = 'Poor';
    
    // Calculate max loan amount (simple formula)
    const maxLoan = income * 12 * 3; // 3x annual income
    
    // Interest rate
    let interestRate;
    if (predictedScore >= 750) interestRate = 6.5;
    else if (predictedScore >= 700) interestRate = 8.5;
    else if (predictedScore >= 650) interestRate = 11.0;
    else interestRate = 14.5;
    
    // Generate recommendations
    const recommendations: string[] = [];
    const riskFactors: string[] = [];
    
    if (creditUsage > 50) {
      recommendations.push('Reduce credit card utilization below 30%');
      riskFactors.push('High credit card utilization');
    }
    if (debtToIncome > 30) {
      recommendations.push('Lower debt-to-income ratio by paying off existing loans');
      riskFactors.push('High debt-to-income ratio');
    }
    if (formData.paymentHistory !== 'ontime') {
      recommendations.push('Maintain consistent on-time payments for 6+ months');
      riskFactors.push('Payment history concerns');
    }
    if (employmentYears < 2) {
      recommendations.push('Build employment stability (2+ years preferred)');
      riskFactors.push('Limited employment history');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Maintain your excellent financial habits');
      recommendations.push('Consider diversifying your credit mix');
    }
    
    if (riskFactors.length === 0) {
      riskFactors.push('No significant risk factors detected');
    }
    
    setPrediction({
      creditScore: Math.round(predictedScore),
      loanEligibility: eligibility,
      maxLoanAmount: maxLoan,
      interestRate,
      recommendations,
      riskFactors,
    });
    
    setLoading(false);
  };

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-display font-bold text-foreground">AI Credit Prediction</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Get AI-powered predictions for your credit score and loan eligibility
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Financial Details</CardTitle>
              <CardDescription>
                Provide accurate information for better predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculatePrediction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="50000"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingLoans">Total Existing Loans (₹)</Label>
                  <Input
                    id="existingLoans"
                    type="number"
                    placeholder="200000"
                    value={formData.existingLoans}
                    onChange={(e) => handleInputChange('existingLoans', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditCardUsage">Credit Card Utilization (%)</Label>
                  <Input
                    id="creditCardUsage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="30"
                    value={formData.creditCardUsage}
                    onChange={(e) => handleInputChange('creditCardUsage', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentHistory">Payment History</Label>
                  <Select
                    value={formData.paymentHistory}
                    onValueChange={(value) => handleInputChange('paymentHistory', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ontime">Always On-Time</SelectItem>
                      <SelectItem value="occasional">Occasional Delays</SelectItem>
                      <SelectItem value="frequent">Frequent Delays</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentYears">Years in Current Employment</Label>
                  <Input
                    id="employmentYears"
                    type="number"
                    step="0.5"
                    placeholder="3"
                    value={formData.employmentYears}
                    onChange={(e) => handleInputChange('employmentYears', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="30"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingCreditScore">Current Credit Score (if known)</Label>
                  <Input
                    id="existingCreditScore"
                    type="number"
                    min="300"
                    max="850"
                    placeholder="720"
                    value={formData.existingCreditScore}
                    onChange={(e) => handleInputChange('existingCreditScore', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Generate AI Prediction
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {!prediction && !loading && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Brain className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI Prediction Results</h3>
                  <p className="text-muted-foreground">
                    Fill in your financial details and click "Generate AI Prediction" to see your results
                  </p>
                </CardContent>
              </Card>
            )}

            {loading && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI Model Processing...</h3>
                  <p className="text-muted-foreground">Analyzing your financial profile</p>
                </CardContent>
              </Card>
            )}

            {prediction && (
              <>
                <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Predicted Credit Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getScoreColor(prediction.creditScore)} mb-2`}>
                        {prediction.creditScore}
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">out of 850</div>
                      <Progress value={(prediction.creditScore / 850) * 100} className="h-3" />
                      <div className={`mt-4 text-lg font-semibold ${getEligibilityColor(prediction.loanEligibility)}`}>
                        {prediction.loanEligibility} Credit Rating
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Loan Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                      <span className="text-sm text-muted-foreground">Maximum Loan Amount</span>
                      <span className="text-lg font-bold text-foreground">
                        ₹{(prediction.maxLoanAmount / 100000).toFixed(2)}L
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                      <span className="text-sm text-muted-foreground">Expected Interest Rate</span>
                      <span className="text-lg font-bold text-foreground">
                        {prediction.interestRate}% p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Alert variant={prediction.riskFactors[0] === 'No significant risk factors detected' ? 'default' : 'destructive'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-2">Risk Factors:</div>
                    <ul className="space-y-1">
                      {prediction.riskFactors.map((risk, idx) => (
                        <li key={idx} className="text-sm">• {risk}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIPrediction;
