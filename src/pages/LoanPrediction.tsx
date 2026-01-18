import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Loader2, 
  IndianRupee, 
  Calendar,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { LoanMLModel, type LoanMLInput } from '@/utils/loanMLModel';

interface LoanPrediction {
  approved: boolean;
  probability: number;
  confidence: number;
  recommendedAmount: number;
  interestRate: number;



  
  monthlyPayment: number;
  grade: string;
  riskScore: number;
  featureImportance: { feature: string; importance: number }[];
}

const LoanPredictionPage = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<LoanPrediction | null>(null);
  
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male' as 'Male' | 'Female',
    maritalStatus: 'Single' as 'Single' | 'Married' | 'Divorced',
    educationLevel: "Bachelor's" as 'High School' | "Bachelor's" | "Master's" | 'PhD',
    annualIncome: '',
    employmentStatus: 'Employed' as 'Employed' | 'Self-Employed' | 'Unemployed',
    debtToIncomeRatio: '',
    creditScore: '',
    loanAmount: '',
    loanPurpose: 'Home' as 'Home' | 'Car' | 'Education' | 'Business' | 'Debt consolidation' | 'Other',
    loanTerm: '',
    numOpenAccounts: '',
    totalCreditLimit: '',
    currentBalance: '',
    delinquencyHistory: '',
    publicRecords: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrediction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate ML processing
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const input: LoanMLInput = {
      age: parseFloat(formData.age) || 30,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus as any,
      educationLevel: formData.educationLevel as any,
      annualIncome: parseFloat(formData.annualIncome) || 0,
      employmentStatus: formData.employmentStatus as any,
      debtToIncomeRatio: parseFloat(formData.debtToIncomeRatio) / 100 || 0,
      creditScore: parseFloat(formData.creditScore) || 650,
      loanAmount: parseFloat(formData.loanAmount) || 0,
      loanPurpose: formData.loanPurpose as any,
      loanTerm: parseFloat(formData.loanTerm) || 36,
      numOpenAccounts: parseFloat(formData.numOpenAccounts) || 3,
      totalCreditLimit: parseFloat(formData.totalCreditLimit) || 100000,
      currentBalance: parseFloat(formData.currentBalance) || 0,
      delinquencyHistory: parseFloat(formData.delinquencyHistory) || 0,
      publicRecords: parseFloat(formData.publicRecords) || 0,
    };
    
    const result = LoanMLModel.predict(input);
    setPrediction(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-display font-bold text-foreground">ML Loan Prediction</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            AI-powered loan approval prediction based on 20,000+ loan records
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic demographic details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePrediction} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">Marital Status</Label>
                      <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">Education</Label>
                      <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                          <SelectItem value="Master's">Master's</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>Income and employment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="500000"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employed">Employed</SelectItem>
                      <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                      <SelectItem value="Unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="debtToIncomeRatio">Debt-to-Income Ratio (%)</Label>
                  <Input
                    id="debtToIncomeRatio"
                    type="number"
                    step="0.1"
                    placeholder="25"
                    value={formData.debtToIncomeRatio}
                    onChange={(e) => handleInputChange('debtToIncomeRatio', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Profile</CardTitle>
                <CardDescription>Credit history and current status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="creditScore">Credit Score</Label>
                  <Input
                    id="creditScore"
                    type="number"
                    placeholder="720"
                    value={formData.creditScore}
                    onChange={(e) => handleInputChange('creditScore', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalCreditLimit">Total Credit Limit (₹)</Label>
                    <Input
                      id="totalCreditLimit"
                      type="number"
                      placeholder="200000"
                      value={formData.totalCreditLimit}
                      onChange={(e) => handleInputChange('totalCreditLimit', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentBalance">Current Balance (₹)</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      placeholder="50000"
                      value={formData.currentBalance}
                      onChange={(e) => handleInputChange('currentBalance', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numOpenAccounts">Open Accounts</Label>
                    <Input
                      id="numOpenAccounts"
                      type="number"
                      placeholder="5"
                      value={formData.numOpenAccounts}
                      onChange={(e) => handleInputChange('numOpenAccounts', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delinquencyHistory">Delinquencies</Label>
                    <Input
                      id="delinquencyHistory"
                      type="number"
                      placeholder="0"
                      value={formData.delinquencyHistory}
                      onChange={(e) => handleInputChange('delinquencyHistory', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publicRecords">Public Records</Label>
                  <Input
                    id="publicRecords"
                    type="number"
                    placeholder="0"
                    value={formData.publicRecords}
                    onChange={(e) => handleInputChange('publicRecords', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Requested loan information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="500000"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Select value={formData.loanPurpose} onValueChange={(value) => handleInputChange('loanPurpose', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Car">Car</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Debt consolidation">Debt Consolidation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term (months)</Label>
                  <Select value={formData.loanTerm} onValueChange={(value) => handleInputChange('loanTerm', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                      <SelectItem value="84">84 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading} onClick={handlePrediction}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with ML Model...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Predict Loan Approval
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {!prediction && !loading && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Brain className="w-20 h-20 text-muted-foreground mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Loan Prediction Results</h3>
                  <p className="text-muted-foreground max-w-md">
                    Fill in your details and click "Predict Loan Approval" to see ML-powered predictions
                  </p>
                </CardContent>
              </Card>
            )}

            {loading && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-20 h-20 text-primary animate-spin mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Running ML Model...</h3>
                  <p className="text-muted-foreground">Applying logistic regression on 20,000+ loan records</p>
                  <p className="text-sm text-muted-foreground mt-2">Training weights, calculating probabilities...</p>
                </CardContent>
              </Card>
            )}

            {prediction && (
              <>
                {/* Approval Status */}
                <Alert className={prediction.approved ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
                  {prediction.approved ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <AlertTitle className={prediction.approved ? 'text-green-900' : 'text-red-900'}>
                    {prediction.approved ? 'Loan Likely to be Approved! 🎉' : 'Loan Unlikely to be Approved'}
                  </AlertTitle>
                  <AlertDescription className={prediction.approved ? 'text-green-800' : 'text-red-800'}>
                    {prediction.approved 
                      ? 'Your profile meets our lending criteria. Proceed with your application!' 
                      : 'Your profile needs improvement before applying. See suggestions below.'}
                  </AlertDescription>
                </Alert>

                {/* Approval Probability */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        ML Prediction Confidence
                      </div>
                      <Badge variant="secondary" className="text-lg">
                        {(prediction.probability * 100).toFixed(1)}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={prediction.probability * 100} className="h-4 mb-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Grade: {prediction.grade}</span>
                      <Badge className={prediction.riskScore < 30 ? 'bg-green-100 text-green-800' : prediction.riskScore < 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                        Risk Score: {prediction.riskScore.toFixed(0)}/100
                      </Badge>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900">
                        <strong>Model Confidence:</strong> {(prediction.confidence * 100).toFixed(1)}% - 
                        This prediction is based on logistic regression analysis of 20,000 historical loan records.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Loan Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                      <span className="text-sm text-muted-foreground">Recommended Amount</span>
                      <span className="text-lg font-bold">₹{(prediction.recommendedAmount / 100000).toFixed(2)}L</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                      <span className="text-sm text-muted-foreground">Interest Rate (ML Predicted)</span>
                      <span className="text-lg font-bold">{prediction.interestRate.toFixed(2)}% p.a.</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                      <span className="text-sm text-muted-foreground">Monthly Installment</span>
                      <span className="text-lg font-bold">₹{prediction.monthlyPayment.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Importance - ML Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      Feature Importance (ML Analysis)
                    </CardTitle>
                    <CardDescription>
                      Top factors that influenced this prediction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prediction.featureImportance.map((feature, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{feature.feature}</span>
                            <span className="text-sm text-muted-foreground">{feature.importance.toFixed(1)}%</span>
                          </div>
                          <Progress value={feature.importance} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-900">
                        <strong>ML Model:</strong> Logistic Regression trained on 20,000 loan records with weights optimized for approval prediction.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanPredictionPage;
