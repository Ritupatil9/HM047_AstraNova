import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, BadgeCheck, AlertCircle, IndianRupee, Brain, Loader2 } from 'lucide-react';

const Loans = () => {
  const [loanAmount, setLoanAmount] = useState('500000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTerm, setLoanTerm] = useState('5');
  const [loanType, setLoanType] = useState('personal');
  const [monthlyIncome, setMonthlyIncome] = useState('50000');
  
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [eligibility, setEligibility] = useState<string | null>(null);

  // ML Prediction states
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [predictionFormData, setPredictionFormData] = useState({
    age: '35',
    gender: 'Male',
    marital_status: 'Married',
    education_level: "Bachelor's",
    annual_income: '500000',
    employment_status: 'Employed',
    credit_score: '720',
    debt_to_income_ratio: '0.3',
    num_of_open_accounts: '5',
    total_credit_limit: '500000',
    current_balance: '150000',
    delinquency_history: '0',
    public_records: '0',
    num_of_delinquencies: '0'
  });

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const months = parseFloat(loanTerm) * 12;
    const income = parseFloat(monthlyIncome);

    // EMI Calculation: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emiValue = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPaymentValue = emiValue * months;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(emiValue);
    setTotalInterest(totalInterestValue);
    setTotalPayment(totalPaymentValue);

    // Eligibility Check (EMI should not exceed 50% of monthly income)
    const emiToIncomeRatio = (emiValue / income) * 100;
    
    if (emiToIncomeRatio <= 40) {
      setEligibility('excellent');
    } else if (emiToIncomeRatio <= 50) {
      setEligibility('good');
    } else if (emiToIncomeRatio <= 60) {
      setEligibility('moderate');
    } else {
      setEligibility('poor');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const predictLoanApproval = async () => {
    setPredicting(true);
    setPrediction(null);

    try {
      const monthlyInc = parseFloat(predictionFormData.annual_income) / 12;
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 12 / 100;
      const months = parseFloat(loanTerm) * 12;
      const emiValue = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

      const requestData = {
        age: parseInt(predictionFormData.age),
        gender: predictionFormData.gender,
        marital_status: predictionFormData.marital_status,
        education_level: predictionFormData.education_level,
        annual_income: parseFloat(predictionFormData.annual_income),
        monthly_income: monthlyInc,
        employment_status: predictionFormData.employment_status,
        debt_to_income_ratio: parseFloat(predictionFormData.debt_to_income_ratio),
        credit_score: parseInt(predictionFormData.credit_score),
        loan_amount: parseFloat(loanAmount),
        loan_purpose: loanType === 'personal' ? 'Debt consolidation' : 
                      loanType === 'home' ? 'Home' :
                      loanType === 'car' ? 'Car' :
                      loanType === 'education' ? 'Education' : 'Business',
        interest_rate: parseFloat(interestRate),
        loan_term: parseInt(loanTerm) * 12,
        installment: emiValue,
        num_of_open_accounts: parseInt(predictionFormData.num_of_open_accounts),
        total_credit_limit: parseFloat(predictionFormData.total_credit_limit),
        current_balance: parseFloat(predictionFormData.current_balance),
        delinquency_history: parseInt(predictionFormData.delinquency_history),
        public_records: parseInt(predictionFormData.public_records),
        num_of_delinquencies: parseInt(predictionFormData.num_of_delinquencies)
      };

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction({
        error: 'Unable to connect to ML service. Please ensure the Python ML service is running on port 5000.'
      });
    } finally {
      setPredicting(false);
    }
  };

  const loanTypes = [
    { value: 'personal', label: 'Personal Loan', rate: '10.5-14.0%', maxAmount: '₹25 Lakhs' },
    { value: 'home', label: 'Home Loan', rate: '8.5-9.5%', maxAmount: '₹5 Crores' },
    { value: 'car', label: 'Car Loan', rate: '9.0-11.0%', maxAmount: '₹50 Lakhs' },
    { value: 'education', label: 'Education Loan', rate: '7.5-10.0%', maxAmount: '₹1 Crore' },
    { value: 'business', label: 'Business Loan', rate: '11.0-16.0%', maxAmount: '₹1 Crore' },
  ];

  const getEligibilityColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return '';
    }
  };

  const getEligibilityMessage = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'You have excellent loan eligibility! Your EMI-to-income ratio is healthy.';
      case 'good':
        return 'You have good loan eligibility. Your EMI is within acceptable limits.';
      case 'moderate':
        return 'Your eligibility is moderate. Consider reducing loan amount or extending tenure.';
      case 'poor':
        return 'Your EMI-to-income ratio is high. Please reconsider your loan parameters.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Loan Predictor</h1>
            <p className="text-gray-600">Calculate your EMI and check loan eligibility instantly</p>
          </div>

          <Tabs defaultValue="calculator" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl">
              <TabsTrigger value="calculator">
                <Calculator className="w-4 h-4 mr-2" />
                EMI Calculator
              </TabsTrigger>
              <TabsTrigger value="prediction">
                <Brain className="w-4 h-4 mr-2" />
                AI Prediction
              </TabsTrigger>
              <TabsTrigger value="comparison">
                <TrendingUp className="w-4 h-4 mr-2" />
                Loan Types
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Details</CardTitle>
                    <CardDescription>Enter your loan requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="loanType">Loan Type</Label>
                      <Select value={loanType} onValueChange={setLoanType}>
                        <SelectTrigger id="loanType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="loanAmount">Loan Amount</Label>
                        <span className="text-sm text-gray-600">{formatCurrency(parseFloat(loanAmount))}</span>
                      </div>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="Enter loan amount"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
                        <span className="text-sm text-gray-600">{interestRate}%</span>
                      </div>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Enter interest rate"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                        <span className="text-sm text-gray-600">{loanTerm} years</span>
                      </div>
                      <Input
                        id="loanTerm"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="Enter loan term"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="monthlyIncome">Monthly Income</Label>
                        <span className="text-sm text-gray-600">{formatCurrency(parseFloat(monthlyIncome))}</span>
                      </div>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        placeholder="Enter monthly income"
                      />
                    </div>

                    <Button onClick={calculateLoan} className="w-full" size="lg">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Loan
                    </Button>
                  </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                  {emi !== null && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle>Loan Summary</CardTitle>
                          <CardDescription>Your calculated EMI and payment breakdown</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                            <div className="text-sm font-medium mb-2">Monthly EMI</div>
                            <div className="text-4xl font-bold">{formatCurrency(emi)}</div>
                            <div className="text-sm opacity-90 mt-2">
                              For {parseFloat(loanTerm) * 12} months
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Principal Amount</div>
                              <div className="text-xl font-bold text-gray-900">
                                {formatCurrency(parseFloat(loanAmount))}
                              </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                              <div className="text-xl font-bold text-orange-600">
                                {formatCurrency(totalInterest!)}
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-600">Total Payment</span>
                              <span className="text-2xl font-bold text-gray-900">
                                {formatCurrency(totalPayment!)}
                              </span>
                            </div>
                            <Progress 
                              value={(parseFloat(loanAmount) / totalPayment!) * 100} 
                              className="h-2"
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>Principal: {((parseFloat(loanAmount) / totalPayment!) * 100).toFixed(1)}%</span>
                              <span>Interest: {((totalInterest! / totalPayment!) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {eligibility && (
                        <Card className={`border-2 ${getEligibilityColor(eligibility)}`}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              {eligibility === 'excellent' || eligibility === 'good' ? (
                                <BadgeCheck className="w-5 h-5" />
                              ) : (
                                <AlertCircle className="w-5 h-5" />
                              )}
                              Eligibility Status
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Alert>
                              <AlertDescription className="text-sm">
                                {getEligibilityMessage(eligibility)}
                              </AlertDescription>
                            </Alert>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span>EMI to Income Ratio</span>
                                <span className="font-semibold">
                                  {((emi / parseFloat(monthlyIncome)) * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress 
                                value={(emi / parseFloat(monthlyIncome)) * 100} 
                                className="h-2"
                              />
                              <div className="text-xs text-gray-500 mt-2">
                                Recommended: Below 50% for healthy finances
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}

                  {emi === null && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Calculator className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-center">
                          Enter your loan details and click "Calculate EMI" to see results
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prediction" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Prediction Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      AI Loan Approval Prediction
                    </CardTitle>
                    <CardDescription>
                      Our ML model predicts your loan approval probability based on 20,000+ real loan applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pred-age">Age</Label>
                        <Input
                          id="pred-age"
                          type="number"
                          value={predictionFormData.age}
                          onChange={(e) => setPredictionFormData({...predictionFormData, age: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pred-gender">Gender</Label>
                        <Select value={predictionFormData.gender} onValueChange={(v) => setPredictionFormData({...predictionFormData, gender: v})}>
                          <SelectTrigger id="pred-gender">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pred-marital">Marital Status</Label>
                        <Select value={predictionFormData.marital_status} onValueChange={(v) => setPredictionFormData({...predictionFormData, marital_status: v})}>
                          <SelectTrigger id="pred-marital">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                            <SelectItem value="Divorced">Divorced</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pred-education">Education</Label>
                        <Select value={predictionFormData.education_level} onValueChange={(v) => setPredictionFormData({...predictionFormData, education_level: v})}>
                          <SelectTrigger id="pred-education">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High School">High School</SelectItem>
                            <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                            <SelectItem value="Master's">Master's</SelectItem>
                            <SelectItem value="PhD">PhD</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pred-income">Annual Income (₹)</Label>
                      <Input
                        id="pred-income"
                        type="number"
                        value={predictionFormData.annual_income}
                        onChange={(e) => setPredictionFormData({...predictionFormData, annual_income: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pred-employment">Employment Status</Label>
                      <Select value={predictionFormData.employment_status} onValueChange={(v) => setPredictionFormData({...predictionFormData, employment_status: v})}>
                        <SelectTrigger id="pred-employment">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Employed">Employed</SelectItem>
                          <SelectItem value="Self-employed">Self-employed</SelectItem>
                          <SelectItem value="Unemployed">Unemployed</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pred-credit">Credit Score</Label>
                        <Input
                          id="pred-credit"
                          type="number"
                          value={predictionFormData.credit_score}
                          onChange={(e) => setPredictionFormData({...predictionFormData, credit_score: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pred-dti">Debt-to-Income Ratio</Label>
                        <Input
                          id="pred-dti"
                          type="number"
                          step="0.01"
                          value={predictionFormData.debt_to_income_ratio}
                          onChange={(e) => setPredictionFormData({...predictionFormData, debt_to_income_ratio: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pred-accounts">Open Accounts</Label>
                        <Input
                          id="pred-accounts"
                          type="number"
                          value={predictionFormData.num_of_open_accounts}
                          onChange={(e) => setPredictionFormData({...predictionFormData, num_of_open_accounts: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pred-delinq">Delinquencies</Label>
                        <Input
                          id="pred-delinq"
                          type="number"
                          value={predictionFormData.num_of_delinquencies}
                          onChange={(e) => setPredictionFormData({...predictionFormData, num_of_delinquencies: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pred-credit-limit">Total Credit Limit (₹)</Label>
                        <Input
                          id="pred-credit-limit"
                          type="number"
                          value={predictionFormData.total_credit_limit}
                          onChange={(e) => setPredictionFormData({...predictionFormData, total_credit_limit: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pred-balance">Current Balance (₹)</Label>
                        <Input
                          id="pred-balance"
                          type="number"
                          value={predictionFormData.current_balance}
                          onChange={(e) => setPredictionFormData({...predictionFormData, current_balance: e.target.value})}
                        />
                      </div>
                    </div>

                    <Button onClick={predictLoanApproval} className="w-full" size="lg" disabled={predicting}>
                      {predicting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          Predict Approval
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Prediction Results */}
                <div className="space-y-6">
                  {prediction && !prediction.error && (
                    <>
                      <Card className={`border-2 ${
                        prediction.risk_level === 'Low' ? 'border-green-200 bg-green-50' :
                        prediction.risk_level === 'Medium' ? 'border-blue-200 bg-blue-50' :
                        prediction.risk_level === 'Medium-High' ? 'border-yellow-200 bg-yellow-50' :
                        'border-red-200 bg-red-50'
                      }`}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {prediction.approved ? (
                              <BadgeCheck className="w-6 h-6 text-green-600" />
                            ) : (
                              <AlertCircle className="w-6 h-6 text-red-600" />
                            )}
                            {prediction.approved ? 'Likely to be Approved' : 'May Face Challenges'}
                          </CardTitle>
                          <CardDescription>{prediction.recommendation}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="bg-white p-6 rounded-lg">
                            <div className="text-sm text-gray-600 mb-2">Approval Probability</div>
                            <div className="text-5xl font-bold mb-4" style={{
                              color: prediction.approval_probability >= 80 ? '#10b981' :
                                     prediction.approval_probability >= 60 ? '#3b82f6' :
                                     prediction.approval_probability >= 40 ? '#f59e0b' : '#ef4444'
                            }}>
                              {prediction.approval_probability}%
                            </div>
                            <Progress value={prediction.approval_probability} className="h-3" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Risk Level</div>
                              <div className="text-xl font-bold">{prediction.risk_level}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Model Accuracy</div>
                              <div className="text-xl font-bold">{(prediction.model_accuracy * 100).toFixed(1)}%</div>
                            </div>
                          </div>

                          {prediction.suggestions && prediction.suggestions.length > 0 && (
                            <div className="bg-white p-4 rounded-lg">
                              <div className="font-semibold mb-3">Improvement Suggestions:</div>
                              <ul className="space-y-2">
                                {prediction.suggestions.map((suggestion: string, index: number) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span>{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">About This Prediction</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                          This prediction is generated by a Random Forest ML model trained on 20,000 real loan applications.
                          The model considers 20+ factors including credit score, income, employment status, and credit history
                          to estimate your approval probability. This is for informational purposes only.
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {prediction && prediction.error && (
                    <Card className="border-2 border-red-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="w-5 h-5" />
                          Service Unavailable
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Alert variant="destructive">
                          <AlertDescription>{prediction.error}</AlertDescription>
                        </Alert>
                        <div className="mt-4 text-sm text-gray-600 space-y-2">
                          <p><strong>To enable ML predictions:</strong></p>
                          <ol className="list-decimal list-inside space-y-1 ml-2">
                            <li>Navigate to the ml-service directory</li>
                            <li>Install dependencies: <code className="bg-gray-100 px-1 rounded">pip install -r requirements.txt</code></li>
                            <li>Train the model: <code className="bg-gray-100 px-1 rounded">python train_model.py</code></li>
                            <li>Start the service: <code className="bg-gray-100 px-1 rounded">python app.py</code></li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {!prediction && !predicting && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Brain className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-center">
                          Fill in your details and click "Predict Approval" to see AI-powered insights
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loanTypes.map((type) => (
                  <Card key={type.value} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                        <IndianRupee className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{type.label}</CardTitle>
                      <CardDescription>Competitive rates and flexible terms</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Interest Rate</div>
                        <div className="text-2xl font-bold text-blue-600">{type.rate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Maximum Amount</div>
                        <div className="text-lg font-semibold text-gray-900">{type.maxAmount}</div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setLoanType(type.value);
                          document.querySelector('[value="calculator"]')?.dispatchEvent(new Event('click', { bubbles: true }));
                        }}
                      >
                        Calculate Loan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Tips for Loan Approval</CardTitle>
                  <CardDescription>Improve your chances of getting approved</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Maintain Good Credit Score</div>
                        <div className="text-sm text-gray-600">A score above 750 improves approval chances significantly</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Stable Income Source</div>
                        <div className="text-sm text-gray-600">Demonstrate consistent income for at least 6 months</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Keep EMI Below 50% of Income</div>
                        <div className="text-sm text-gray-600">Lower EMI-to-income ratio shows better repayment capacity</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Reduce Existing Debts</div>
                        <div className="text-sm text-gray-600">Pay off existing loans before applying for a new one</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Loans;
