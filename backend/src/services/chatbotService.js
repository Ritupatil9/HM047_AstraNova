// Simplified Chatbot Service - Concise Responses

export class ChatbotService {
  constructor() {
    this.conversationHistory = [];
  }

  processMessage(userMessage) {
    const message = userMessage.toLowerCase().trim();
    this.conversationHistory.push({ user: message, timestamp: Date.now() });

    let response = this.detectIntentAndRespond(message);
    
    return {
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    };
  }

  detectIntentAndRespond(message) {
    // Check conditional/if-then questions FIRST
    const conditionalResponse = this.handleConditionalQuestions(message);
    if (conditionalResponse) return conditionalResponse;

    // Check scenario-based questions
    const scenarioResponse = this.handleScenarioQuestions(message);
    if (scenarioResponse) return scenarioResponse;

    // Credit score
    if (this.includes(message, ['credit score', 'score', 'rating'])) {
      if (this.includes(message, ['category', 'range'])) {
        return `📊 **Credit Score Categories & What They Mean:**

🔴 **300-349 (Poor):** Very difficult to get loans. High interest rates if approved. Focus on building payment history.

🟠 **350-649 (Fair):** Limited loan options. Higher interest rates. Work on improving payment history and reducing debt.

🟡 **650-749 (Good):** Good loan approval chances. Competitive interest rates. Maintain this by paying on time.

🟢 **750-799 (Very Good):** Excellent approval rates. Low interest rates. You're in a strong position!

🔵 **800-850 (Excellent):** Premium rates guaranteed. Lenders compete for you. Maintain perfect payment history.

💡 **Tip:** Your score updates monthly. Monitor it regularly on your Dashboard!`;
      }
      if (this.includes(message, ['improve', 'increase', 'factor', 'boost'])) {
        return `💡 **How to Improve Your Credit Score:**

**1. Payment History (35% weight)** 🎯
   • Pay all bills on time - even utility bills count
   • Set up automatic payments to never miss deadlines
   • If you've missed payments, get back on track immediately
   • Recent good behavior helps recover from past mistakes

**2. Credit Utilization (30% weight)** 💳
   • Keep credit card usage below 30% of your limit
   • Example: If limit is ₹1,00,000, use max ₹30,000
   • Lower utilization shows responsible credit management
   • Even 0% utilization is good (shows you control spending)

**3. Credit History Length (15% weight)** ⏰
   • Keep old accounts open - don't close them
   • Longer history = better track record
   • Account age matters - older accounts help more

**4. Credit Mix (10% weight)** 🔄
   • Have different types of credit (cards, loans, EMI)
   • Shows you can manage various credit types
   • Don't take unnecessary credit just for mix

**5. Hard Inquiries (10% weight)** 🔍
   • Avoid multiple loan/card applications in short time
   • Each inquiry slightly dips your score
   • Space out applications by 3-6 months

**Quick Wins:**
✅ Fix any payment delays immediately
✅ Pay credit card bills in full
✅ Request credit limit increase (no inquiry)
✅ Become authorized user on good credit account
✅ Monitor your score monthly for errors`;
      }
      return `📊 **Understanding Your Credit Score:**

Your credit score (ranging from 300-850) is a number that represents your creditworthiness - how likely you are to repay loans on time. 

**Why It Matters:**
• Determines loan approval chances
• Affects interest rates you get
• Used by landlords and employers
• Reflects your financial responsibility

**Where to Check:**
Go to your **Dashboard** and look at the **Credit Score Card** to see your current score, trend, and detailed breakdown.

**Key Insight:** Your score changes monthly based on your financial behavior. The better you manage credit, the higher your score grows!

Want to know the score ranges, how to improve it, or anything specific about scoring?`;
    }

    // EMI
    if (this.includes(message, ['emi', 'monthly payment', 'installment', 'loan payment', 'equated'])) {
      if (this.includes(message, ['formula', 'calculate', 'how', 'work'])) {
        return `📐 **EMI (Equated Monthly Installment) Calculation:**

**Formula:**
EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]

**Where:**
• **P** = Principal (loan amount you borrow)
• **R** = Monthly interest rate (Annual Rate ÷ 12)
• **N** = Number of months (loan tenure in months)

**Example:**
Loan: ₹5,00,000 | Rate: 8% annual | Tenure: 5 years (60 months)
• Monthly Rate = 8% ÷ 12 = 0.667%
• EMI ≈ ₹10,145/month
• Total paid ≈ ₹6,08,700

**Key Points:**
✓ Fixed EMI every month makes budgeting easy
✓ Higher rate or shorter tenure = Higher EMI
✓ Longer tenure = Lower EMI but more total interest

**Use Our EMI Calculator:**
Go to **Loans → EMI Calculator** to try different loan amounts, rates, and tenures!

**Pro Tip:** Calculate EMI before applying for loans to ensure it fits your budget (should be ≤40% of monthly income).`;
      }
      return `💰 **What is EMI?**

EMI stands for **Equated Monthly Installment** - it's the fixed amount you pay every month to repay a loan.

**Simple Example:**
If you borrow ₹5,00,000 for a car:
• You might pay ₹10,000 every month for 60 months
• That ₹10,000 is your EMI
• Part covers principal, part covers interest

**Why EMI?**
✓ Fixed monthly payment - easy budgeting
✓ Predictable - amount doesn't change
✓ Formal way to borrow large amounts
✓ Helps build credit history

**Types of Loans with EMI:**
• Home Loans (20-30 years)
• Car Loans (3-7 years)
• Personal Loans (1-5 years)
• Education Loans (after graduation)

**Calculate Your EMI:**
Head to **Loans → EMI Calculator** to see how much you'd pay for any loan!

Want to know the formula or how to calculate it manually?`;
    }

    // Loan eligibility
    if (this.includes(message, ['eligible', 'eligibility', 'qualify', 'approval', 'get loan', 'can i get'])) {
      return `✅ **Loan Eligibility - Complete Guide:**

**1. Credit Score (Most Important)** 🎯
   • 750+: Excellent - Almost certain approval, best rates
   • 700-749: Good - High approval chance, decent rates
   • 650-699: Fair - Possible approval, higher rates
   • Below 650: Difficult - May need co-applicant or collateral
   
   **Action:** Improve score first if low!

**2. Income & EMI Ratio** 💰
   • Lenders approve EMI ≤ 40-50% of monthly income
   • Example: If income is ₹50,000
     - Max EMI approved ≈ ₹20,000-25,000
   • Some banks are strict (30%), others flexible (60%)
   
   **Action:** Increase income or reduce other EMIs

**3. Employment Stability** 💼
   • Full-time job: Best for loans
   • Self-employed: Need 2-3 years income proof
   • Freelancer: Difficult - need consistent income proof
   • Student: Generally not eligible alone
   
   **Action:** Get stable job or consistent income proof

**4. Payment History** 📋
   • No defaults/late payments in last 3 years
   • Even one missed payment can hurt
   • Older missed payments matter less
   • Recent perfect payment record helps recovery
   
   **Action:** Build 12+ months of perfect payment history

**5. Existing Debt** 📊
   • High existing debt decreases eligibility
   • Reduce other loans/EMIs before applying
   • Include home EMI, car EMI, credit card dues
   
   **Action:** Pay off smaller debts first

**6. Age & Work Experience** 👤
   • Minimum 23 years (usually)
   • Minimum 2 years at current job (often required)
   • Retirement before age 65-70
   
   **Action:** You need stable employment history

**7. Income Proof Documents** 📄
   • Salary slips (last 6 months)
   • Income tax returns (2 years)
   • Employment letter
   • Bank statements
   
   **Action:** Organize documents before applying

**Quick Eligibility Check:**
✓ Score 700+?
✓ EMI won't exceed 40% income?
✓ Stable job with 2+ years?
✓ No recent payment defaults?
✓ Income proof ready?

**If YES to all:** You're likely eligible!
**If NO to any:** Work on that area first.

**Check Your Dashboard:** 
See your loan eligibility prediction based on your profile!`;
    }

    // Navigation
    if (this.includes(message, ['where', 'how to', 'navigate', 'access', 'find'])) {
      if (this.includes(message, ['score'])) return "🔍 **Credit Score Location:**\n\n→ **Dashboard** (main page)\n→ Look for **Credit Score Card** in the middle\n→ Shows: Current score, 30-day trend, Score breakdown\n→ Click for detailed analysis!\n\n💡 Tip: Your score updates monthly on this date.";
      if (this.includes(message, ['emi'])) return "🔍 **EMI Calculator Location:**\n\n→ Click **Loans** in the navigation menu\n→ Select **EMI Calculator** tab\n→ Enter: Loan Amount, Interest Rate, Tenure\n→ Get instant monthly payment & total cost!\n\n💡 Tip: Try different numbers to see impact on EMI.";
      if (this.includes(message, ['profile'])) return "🔍 **Financial Profile Location:**\n\n→ Click **Profile** in the navigation menu\n→ OR use **Navbar** → Financial Profile\n→ Fill details once, system remembers them\n→ Used for eligibility calculations\n\n💡 Tip: Update annually for accurate eligibility.";
      if (this.includes(message, ['insights', 'analysis'])) return "🔍 **Insights Location:**\n\n→ Click **Insights** in the navigation menu\n→ See your credit trends & analysis\n→ Get personalized recommendations\n→ Track improvements over time\n\n💡 Tip: Check monthly for progress!";
      return "🗺️ **App Navigation Guide:**\n\n📊 **Dashboard** - Main view, credit score, quick stats\n👤 **Profile** - Your financial information\n🏦 **Loans** - EMI calculator, predictions\n📈 **Insights** - Analysis & recommendations\n🚀 **Future Scope** - Upcoming features\n💬 **Chat** - Ask me anything!\n\nWhat section do you need help with?";
    }

    // Terms
    if (this.includes(message, ['what is', 'define', 'meaning', 'explain', 'how does'])) {
      const terms = {
        cibil: "📊 **CIBIL Score:**\nCredit Information Bureau India Limited score. A 4-digit number (300-900) representing your creditworthiness in India. Used by almost all lenders.\n\n• Similar to FICO score in US\n• Maintained by CIBIL database\n• Updated monthly based on credit activity\n• You're entitled to 1 free report yearly\n• Our app provides approximation based on factors",
        principal: "💰 **Principal:**\nThe original amount of money you borrow in a loan.\n\n• Example: You borrow ₹5,00,000 for a house\n• That ₹5,00,000 is the principal\n• Interest is charged ON this amount\n• As you pay EMI, principal decreases\n• Interest paid decreases as principal reduces",
        tenure: "⏰ **Tenure:**\nThe total time period to repay a loan in full.\n\n• Example: 5-year car loan = 60 months tenure\n• Longer tenure = Smaller EMI but more total interest\n• Shorter tenure = Higher EMI but less total interest\n• Common tenures: 3-5 years for car, 20-30 for home\n• Choosing tenure is important decision",
        rate: "📈 **Interest Rate:**\nThe percentage of principal charged as interest per year.\n\n• Example: 8% annual rate on ₹5,00,000 = ₹40,000/year\n• Higher credit score = Lower interest rate\n• Rates vary by loan type and lender\n• Can be fixed or floating\n• Even 1% difference matters over long tenure",
        utilization: "💳 **Credit Utilization:**\nPercentage of your credit limit that you're actually using.\n\n• Example: Credit limit = ₹1,00,000, Using = ₹30,000\n• Utilization = 30/100 = 30%\n• Lower is better (below 30% recommended)\n• High utilization (80%+) looks risky to lenders\n• Keep low even if you pay full monthly - matters for score",
        default: "⚠️ **Default:**\nWhen you fail to pay loan EMI or credit card dues on time.\n\n• Missing EMI by 30+ days = Default\n• Severely damages your credit score\n• Lenders mark account as 'Default'\n• Stays on record for 5-7 years\n• Makes future borrowing very difficult\n• Legal action possible after persistent default",
        collateral: "🏠 **Collateral:**\nAsset you pledge as security for a loan.\n\n• Example: House as collateral for home loan\n• If you can't repay, lender can seize asset\n• Reduces lender's risk, so rates are lower\n• Secured loans (with collateral) = Lower rates\n• Unsecured loans (without collateral) = Higher rates",
      };
      for (let [term, def] of Object.entries(terms)) {
        if (message.includes(term)) return def;
      }
      return "📚 **Common Financial Terms I Can Explain:**\n\n• CIBIL - Credit score\n• Principal - Loan amount\n• Tenure - Repayment period\n• Rate - Interest percentage\n• Utilization - Credit card usage %\n• Default - Missing payment\n• Collateral - Security for loan\n• EMI - Monthly payment\n\nAsk about any of these!";
    }

    // Future
    if (this.includes(message, ['future', 'planned', 'upcoming', 'roadmap', 'next'])) {
      return `🚀 **10 Exciting Planned Features:**

**1. What-If Scenario Simulator** 🎯
   Simulate how score changes with different actions
   "What if I pay down this debt?" - See impact instantly

**2. AI Financial Coach** 🤖
   Get personalized recommendations based on YOUR profile
   Smart suggestions for score improvement

**3. Real CIBIL Integration** 📊
   Pull actual CIBIL scores directly from bureau
   Real-time score, not just approximation

**4. Machine Learning Models** 🧠
   Predict future score trajectory
   Loan approval probability with better accuracy

**5. Smart Financial Alerts** 🔔
   Get notified of important credit events
   Payment reminders, score changes, opportunities

**6. Bank API Integration** 🏦
   Direct connection with bank accounts
   Auto-fetch transactions for better analysis

**7. Document Upload & Verification** 📄
   Upload income proofs, identity documents
   One-click loan applications to partner banks

**8. Blockchain Credit History** ⛓️
   Immutable credit record across lenders
   Portability of credit history

**9. Multi-Language Support** 🌍
   Use app in Hindi, Tamil, Telugu, and more
   Make financial literacy accessible to all

**10. Mobile App** 📱
   Native iOS & Android apps
   On-the-go credit management

**Coming Soon:** What-If Simulator & AI Coach!

Check **Future Scope** in navbar for more details!`;
    }

    // Features
    if (this.includes(message, ['feature', 'capabilities', 'what can i do', 'what does this do'])) {
      return `✨ **Your Credit Companion Features:**

**📊 Credit Score Analysis**
   • View your current credit score
   • See 30-day trend & historical graph
   • Understand score breakdown (what affects it)
   • Get score in easy-to-understand ranges

**💰 EMI Calculator**
   • Calculate monthly payment for any loan
   • Try different loan amounts, rates, tenures
   • See total cost & total interest
   • Budget planning made easy

**🏦 Loan Eligibility Checker**
   • Check if you qualify for loans
   • See estimated approval probability
   • Understand eligibility factors
   • Get tips to improve eligibility

**👤 Financial Profile**
   • Store your financial information securely
   • Income, expenses, employment details
   • Used for eligibility calculations
   • Private & encrypted

**📈 Credit Insights & Analysis**
   • Personalized recommendations
   • Trend analysis over time
   • Comparison with credit benchmarks
   • Tips to improve your score

**🏷️ Loan Comparison**
   • Compare different loan options
   • See pros/cons of each
   • Calculate total cost difference
   • Make informed decisions

**🎯 Credit Tracking**
   • Monitor your score journey
   • See improvements month-by-month
   • Track financial milestones
   • Stay motivated!

**💬 24/7 Chat Support**
   • Ask me anything about credit
   • Get instant answers
   • Learn financial concepts
   • Clear your doubts anytime

**🔐 Privacy & Security**
   • Your data is encrypted
   • Firebase security standards
   • No data sharing with third parties
   • Safe & secure platform

**Ready to use a feature?** Ask me where to find it!`;
    }

    // Help
    if (this.includes(message, ['hi', 'hello', 'help', 'assist', 'support', 'hey'])) {
      return `👋 **Welcome to Credit Companion!**

I'm your AI financial assistant. I can help you with:

**💡 Knowledge & Learning:**
   • Credit scores & how they work
   • EMI calculation & loans
   • Loan eligibility criteria
   • Financial terminology
   • Best practices for credit

**📍 Navigation Help:**
   • How to access features
   • Where to find specific tools
   • How to use calculators
   • Understanding your dashboard

**📊 Analysis & Tips:**
   • How to improve your score
   • What affects creditworthiness
   • Loan eligibility factors
   • Financial planning advice

**🚀 Information:**
   • Upcoming features
   • How the app works
   • General financial guidance

**What would you like to know?**

Try asking:
• "How can I improve my credit score?"
• "What is EMI?"
• "Am I eligible for a home loan?"
• "Where is the EMI calculator?"
• "What's planned next?"

Or just chat with me about anything credit-related! 😊`;
    }

    // Fallback
    return `❓ **I didn't quite understand that. Here's what I can help with:**

**Popular Topics:**
📊 Credit scores & scoring factors
💰 EMI calculation & loan payments
🏦 Loan eligibility & requirements
📍 Navigation & finding features
📚 Financial terms & definitions
🚀 Upcoming features & roadmap
💡 Tips to improve credit

**Try asking:**
• "How do I improve my credit score?"
• "What is EMI and how is it calculated?"
• "Am I eligible for a loan?"
• "Where's the EMI calculator?"
• "What features are coming soon?"

**Or just tell me what you need help with!** I'm here 24/7 to assist. 😊`;
  }

  includes(msg, keywords) {
    return keywords.some(kw => msg.includes(kw.toLowerCase()));
  }

  handleConditionalQuestions(message) {
    // Handle "if-then" style questions
    
    // If score increases
    if (this.includes(message, ['if my score', 'if i improve', 'if score increase', 'if score reach'])) {
      if (this.includes(message, ['750', 'very good', 'excellent'])) {
        return `✅ **If Score Reaches 750+:**\n• Loan approval nearly certain\n• Best interest rates available\n• Higher loan amounts approved\n• Faster processing times\n• Competitive offers from banks`;
      }
      if (this.includes(message, ['700'])) {
        return `✅ **If Score Reaches 700+:**\n• Good approval chances\n• Competitive interest rates\n• Reasonable loan amounts\n• Decent approval speed\n• Multiple lender options`;
      }
      return `✅ **Higher Score = Better Loans:**\n→ Higher approval odds\n→ Lower interest rates\n→ More loan amount available\n→ Faster approval process\n→ Better terms overall`;
    }

    // If they miss payment
    if (this.includes(message, ['if i miss', 'if payment late', 'if skip', 'if default', 'if don\'t pay'])) {
      return `⚠️ **If You Miss Payment:**\n• Score drops 50-100 points\n• Marked as "Late" on report\n• Stays 5-7 years on record\n• Future loans become difficult\n• Interest penalties apply\n\n💡 Set automatic payments!`;
    }

    // If EMI too high
    if (this.includes(message, ['if emi high', 'if exceed', 'if too much'])) {
      return `💰 **If EMI >40% Income:**\n• Lenders typically reject\n• Solution: Reduce loan amount\n• OR: Extend tenure\n• OR: Increase income\n• OR: Pay off other debts first`;
    }

    // If low score
    if (this.includes(message, ['if score low', 'if score below', 'if bad score', 'if poor score'])) {
      return `⚠️ **If Score Is Below 650:**\n• Loan approval difficult\n• Higher interest rates offered\n• Lower loan amounts\n• Longer waiting times\n\n🔧 **Fix:** Pay on time, reduce credit use`;
    }

    // If multiple applications
    if (this.includes(message, ['if i apply', 'if multiple', 'if many loan', 'if apply multiple'])) {
      return `📊 **Multiple Applications Impact:**\n• Each inquiry drops score 5-10 points\n• Looks risky to lenders\n• Score recovers in 3-6 months\n\n💡 Apply one at a time, wait 3 months`;
    }

    // If high utilization
    if (this.includes(message, ['if utilization', 'if use 80', 'if credit max', 'if high usage'])) {
      return `💳 **If Using 80%+ of Limit:**\n• Score drops significantly\n• Appears risky to lenders\n• Approval becomes difficult\n\n✅ **Fix:** Pay down to <30%`;
    }

    return null;
  }

  handleScenarioQuestions(message) {
    // Handle real-world scenario questions
    
    // Career change scenario
    if (this.includes(message, ['change job', 'new job', 'switch job', 'left job', 'changed job'])) {
      if (this.includes(message, ['loan', 'eligible', 'apply', 'get'])) {
        return `💼 **New Job - Loan Eligibility:**\n• Most banks need 2+ years at current job\n• <2 years = difficult approval\n• Some approve with offer letter\n• Avoid applying immediately\n\n💡 Wait 2 years OR provide offer letter`;
      }
      return `💼 **Job Change Impact:**\n• Affects employment stability\n• Recent change = harder approval\n• After 2 years = back to normal`;
    }

    // Salary increase
    if (this.includes(message, ['salary increase', 'got hike', 'earning more', 'salary raised'])) {
      if (this.includes(message, ['loan', 'eligible', 'borrow'])) {
        return `💰 **Salary Increase Benefits:**\n• Can borrow more (EMI limit ↑)\n• Better approval odds\n• Better interest rates\n\n📈 Update profile with new income!`;
      }
      return `💰 **Higher Salary Helps:**\n• Borrow larger amounts\n• Easier approvals\n• Faster processing`;
    }

    // Multiple debts
    if (this.includes(message, ['multiple debt', 'many loan', 'several emi', 'existing debt'])) {
      if (this.includes(message, ['apply', 'new', 'get'])) {
        return `📊 **With Existing Debts:**\n• Total EMI <40-50% income\n• New EMI adds to existing\n• High debt = harder approval\n\n💡 Pay off debts first`;
      }
      return `📊 **Multiple Debts Impact:**\n• Each reduces borrowing capacity\n• Affects eligibility negatively`;
    }

    // Self-employed
    if (this.includes(message, ['self employed', 'freelancer', 'business', 'startup', 'owner'])) {
      if (this.includes(message, ['loan', 'eligible', 'get'])) {
        return `🏢 **Self-Employed Eligibility:**\n• Need 2-3 years business proof\n• 2 years tax returns required\n• Stricter than salaried\n• Higher rates usual\n\n📄 Prepare documents early`;
      }
      return `🏢 **Self-Employed Challenges:**\n• Stricter requirements\n• More documentation needed\n• Longer approval process`;
    }

    // Trying to improve credit
    if (this.includes(message, ['want to', 'trying to', 'goal is']) && this.includes(message, ['improve', 'increase', 'build'])) {
      return `🎯 **3-Month Quick Win Plan:**\nWeek 1-4: Pay ALL bills on time\nWeek 5-8: Reduce credit use to <30%\nWeek 9-12: Request limit increase\n\n📈 Result: +30-50 points!`;
    }

    // First credit card
    if (this.includes(message, ['first card', 'get card', 'credit card', 'new to credit'])) {
      return `💳 **Build Credit Strategy:**\n1. Get basic card\n2. Use <10% monthly\n3. Pay FULL amount\n4. After 6m: increase limit\n5. After 1y: premium card\n\n✅ Strong score builder!`;
    }

    // Home loan
    if (this.includes(message, ['home loan', 'buy house', 'property', 'real estate', 'housing'])) {
      return `🏠 **Home Loan Prep:**\n• Score 750+ needed (1-2 years)\n• Stable job 2+ years\n• 2 years income proof\n• Low existing debt\n• 10-25% down payment ready\n\n📋 Start now!`;
    }

    return null;
  }

  includes(msg, keywords) {
    return keywords.some(kw => msg.includes(kw.toLowerCase()));
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  clearHistory() {
    this.conversationHistory = [];
    return { success: true, message: "History cleared" };
  }
}
