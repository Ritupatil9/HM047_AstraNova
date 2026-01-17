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
    // Credit score
    if (this.includes(message, ['credit score', 'score', 'rating'])) {
      if (this.includes(message, ['category', 'range'])) {
        return "📊 **Score Categories:**\n300-349: Poor | 350-649: Fair | 650-749: Good | 750-799: Very Good | 800-850: Excellent";
      }
      if (this.includes(message, ['improve', 'increase', 'factor'])) {
        return "💡 **Improve Score:**\n✓ Pay on time (35%) ✓ Keep usage <30% (30%) ✓ Build history (15%) ✓ Mix types (10%) ✓ Avoid inquiries (10%)";
      }
      return "📊 Your score (300-850) shows creditworthiness. Check it on Dashboard!";
    }

    // EMI
    if (this.includes(message, ['emi', 'monthly payment', 'installment', 'loan payment'])) {
      if (this.includes(message, ['formula', 'calculate', 'how'])) {
        return "📐 **EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]**\nP=Principal | R=Monthly Rate | N=Months\nUse Loans → EMI Calculator!";
      }
      return "💰 EMI is monthly loan payment. Go to Loans section to calculate!";
    }

    // Loan eligibility
    if (this.includes(message, ['eligible', 'eligibility', 'qualify', 'approval'])) {
      return "✅ **Eligibility Factors:**\n• Credit Score (higher=better)\n• Income (EMI ≤ 40-50% of income)\n• Employment Stability\n• Payment History\nCheck in Dashboard!";
    }

    // Navigation
    if (this.includes(message, ['where', 'how to', 'navigate', 'access'])) {
      if (this.includes(message, ['score'])) return "🔍 Dashboard → Check Credit Score card";
      if (this.includes(message, ['emi'])) return "🔍 Loans → EMI Calculator";
      if (this.includes(message, ['profile'])) return "🔍 Navbar → Financial Profile";
      if (this.includes(message, ['insights'])) return "🔍 Navbar → Insights";
      return "🗺️ Dashboard | Profile | Loans | Insights | Future Scope";
    }

    // Terms
    if (this.includes(message, ['what is', 'define', 'meaning', 'explain'])) {
      const terms = {
        cibil: "Credit bureau tracking scores",
        principal: "Original borrowed amount",
        tenure: "Loan repayment period",
        rate: "Annual interest %",
        utilization: "% of credit limit used",
      };
      for (let [term, def] of Object.entries(terms)) {
        if (message.includes(term)) return `📚 **${term.toUpperCase()}:** ${def}`;
      }
      return "📚 Ask about: CIBIL, EMI, Principal, Tenure, Interest, Rate, etc.";
    }

    // Future
    if (this.includes(message, ['future', 'planned', 'upcoming', 'roadmap'])) {
      return "🚀 **10 Planned Features:**\n1. What-If Simulation 2. AI Coach 3. Real CIBIL 4. ML Models 5. Financial Alerts 6. Bank APIs 7. Document Upload 8. Blockchain 9. Multi-Language 10. Mobile App\n\nSee Future Scope in navbar!";
    }

    // Features
    if (this.includes(message, ['feature', 'capabilities', 'what can i do'])) {
      return "✨ **Features:**\n✓ Credit Score Calculator ✓ EMI Calculator ✓ Loan Eligibility ✓ Credit Tracking ✓ Financial Profile ✓ Insights ✓ Loans Section\n\nCheck Dashboard!";
    }

    // Help
    if (this.includes(message, ['hi', 'hello', 'help', 'assist'])) {
      return "👋 Hi! Ask about:\n• Credit scores\n• EMI & payments\n• Loan eligibility\n• Navigation help\n• Financial terms\n• Future features";
    }

    // Fallback
    return "❓ Ask about credit scores, EMI, loans, navigation, or features!";
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
