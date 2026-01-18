import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  Calculator, 
  CreditCard, 
  PiggyBank, 
  AlertCircle, 
  CheckCircle, 
  Lightbulb,
  BookOpen,
  Target,
  Shield
} from "lucide-react";

const Insights = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Lightbulb className="w-10 h-10 text-yellow-500" />
              Financial Insights
            </h1>
            <p className="text-gray-600 text-lg">
              Essential knowledge to help you make smarter financial decisions
            </p>
          </div>

          <Tabs defaultValue="credit-score" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-4xl">
              <TabsTrigger value="credit-score">
                <TrendingUp className="w-4 h-4 mr-2" />
                Credit Score
              </TabsTrigger>
              <TabsTrigger value="emi">
                <Calculator className="w-4 h-4 mr-2" />
                EMI Basics
              </TabsTrigger>
              <TabsTrigger value="loans">
                <PiggyBank className="w-4 h-4 mr-2" />
                Loans
              </TabsTrigger>
              <TabsTrigger value="tips">
                <Shield className="w-4 h-4 mr-2" />
                Smart Tips
              </TabsTrigger>
            </TabsList>

            {/* Credit Score Tab */}
            <TabsContent value="credit-score" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    What is a Credit Score?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    A credit score is a three-digit number that represents your creditworthiness. In India, it typically ranges from <strong>300 to 900</strong>. 
                    Lenders use this score to determine whether to approve your loan application and at what interest rate.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <Card className="border-2 border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-700">Excellent (750-900)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-green-600">
                          Best interest rates, instant loan approvals, premium credit cards
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-700">Good (700-749)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-600">
                          Competitive rates, good approval chances, decent card offers
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-yellow-200 bg-yellow-50">
                      <CardHeader>
                        <CardTitle className="text-lg text-yellow-700">Fair (650-699)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-yellow-600">
                          Moderate approval chances, higher interest rates possible
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-red-200 bg-red-50">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-700">Poor (300-649)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-red-600">
                          Limited options, rejections likely, very high interest rates
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    What Affects Your Credit Score?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Payment History (35%)</h4>
                        <p className="text-sm text-gray-600">
                          Always pay your bills on time. Even one missed payment can significantly impact your score.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Credit Utilization (30%)</h4>
                        <p className="text-sm text-gray-600">
                          Keep credit card usage below 30% of your limit. Lower is better!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Credit History Length (15%)</h4>
                        <p className="text-sm text-gray-600">
                          Older accounts are beneficial. Keep your oldest credit card active.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Credit Mix (10%)</h4>
                        <p className="text-sm text-gray-600">
                          Having different types of credit (cards, loans) shows you can manage various debts.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">New Credit (10%)</h4>
                        <p className="text-sm text-gray-600">
                          Avoid applying for multiple credit cards or loans at once.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* EMI Tab */}
            <TabsContent value="emi" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Understanding EMI
                  </CardTitle>
                  <CardDescription>
                    EMI stands for Equated Monthly Installment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    EMI is the fixed amount you pay every month to repay a loan. It includes both the principal amount and the interest charged by the lender.
                  </p>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>EMI Formula:</strong> EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
                      <br />
                      Where: P = Principal, R = Monthly Interest Rate, N = Number of months
                    </AlertDescription>
                  </Alert>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Example Calculation</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Loan Amount:</strong> ₹5,00,000</p>
                      <p><strong>Interest Rate:</strong> 10% per year</p>
                      <p><strong>Tenure:</strong> 5 years (60 months)</p>
                      <p className="text-lg font-bold text-blue-600 mt-4">
                        Monthly EMI: ₹10,624
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Interest Paid: ₹1,37,440 | Total Amount: ₹6,37,440
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key EMI Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Lower EMI = Longer Tenure</h4>
                      <p className="text-sm text-gray-600">
                        You can reduce your EMI by extending the loan tenure, but you'll pay more interest overall.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Prepayment Benefits</h4>
                      <p className="text-sm text-gray-600">
                        Making prepayments can significantly reduce your interest burden and help you close the loan faster.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-900">EMI-to-Income Ratio</h4>
                      <p className="text-sm text-gray-600">
                        Keep your total EMIs below 40-50% of your monthly income for financial stability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Loans Tab */}
            <TabsContent value="loans" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="w-5 h-5" />
                    Types of Loans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">🏠 Home Loan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p><strong>Interest Rate:</strong> 8.5% - 9.5%</p>
                        <p><strong>Tenure:</strong> Up to 30 years</p>
                        <p><strong>Tax Benefits:</strong> Yes (₹2L principal + ₹2L interest)</p>
                        <p className="text-gray-600">Lowest interest rates, longest tenure available</p>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">🚗 Car Loan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p><strong>Interest Rate:</strong> 9% - 11%</p>
                        <p><strong>Tenure:</strong> Up to 7 years</p>
                        <p><strong>Down Payment:</strong> 10-20%</p>
                        <p className="text-gray-600">Moderate rates, vehicle is collateral</p>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">👤 Personal Loan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p><strong>Interest Rate:</strong> 10.5% - 24%</p>
                        <p><strong>Tenure:</strong> Up to 5 years</p>
                        <p><strong>No Collateral:</strong> Unsecured loan</p>
                        <p className="text-gray-600">Quick approval, higher interest rates</p>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">🎓 Education Loan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p><strong>Interest Rate:</strong> 7.5% - 15%</p>
                        <p><strong>Tenure:</strong> Up to 15 years</p>
                        <p><strong>Moratorium:</strong> Course period + 6-12 months</p>
                        <p className="text-gray-600">Tax deductible interest, flexible repayment</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Before Taking a Loan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Compare Interest Rates:</strong> Even 0.5% difference can save lakhs over the loan tenure
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Check Processing Fees:</strong> Can range from 0.5% to 2% of loan amount
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Read Fine Print:</strong> Understand prepayment charges, late payment fees, and foreclosure terms
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Maintain Good Credit Score:</strong> Score above 750 gets you better rates and faster approvals
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Smart Tips Tab */}
            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Smart Financial Tips
                  </CardTitle>
                  <CardDescription>
                    Expert advice for better financial health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-500" />
                        Credit Card Best Practices
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Pay full balance every month to avoid interest charges (18-48% p.a.)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Keep credit utilization below 30% across all cards
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Never withdraw cash from credit cards (extremely high charges)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Set up auto-pay for at least minimum due to avoid late fees
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        Improve Your Credit Score
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Check your credit report annually for errors (free from CIBIL, Experian)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Maintain at least 2-3 years of credit history
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Don't close old credit cards (reduces average account age)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          Limit hard inquiries (each loan/card application reduces score by 5-10 points)
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        Common Mistakes to Avoid
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          Paying only minimum due on credit cards (debt trap!)
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          Taking personal loans for lifestyle expenses
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          Maxing out credit cards regularly
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          Missing EMI payments (affects score for 7 years!)
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          Becoming loan guarantor without understanding risks
                        </li>
                      </ul>
                    </div>

                    <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Pro Tip:</strong> The 50-30-20 rule is ideal for managing finances: 
                        50% needs, 30% wants, 20% savings/debt repayment. Following this ensures you never overburden yourself with EMIs.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Insights;
