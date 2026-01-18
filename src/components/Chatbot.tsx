import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

// Local chatbot responses (fallback when backend is unavailable)
const getLocalResponse = (message: string): string => {
  const msg = message.toLowerCase().trim();

  if (msg.includes("credit score")) {
    if (msg.includes("category") || msg.includes("range")) {
      return "📊 **Score Categories:**\n300-349: Poor | 350-649: Fair | 650-749: Good | 750-799: Very Good | 800-850: Excellent";
    }
    if (msg.includes("improve") || msg.includes("factor")) {
      return "💡 **Improve Score:** Pay on time (35%) • Keep usage <30% (30%) • Build history (15%) • Mix types (10%) • Avoid inquiries (10%)";
    }
    return "📊 Your score (300-850) shows creditworthiness. Check Dashboard!";
  }

  if (msg.includes("emi") || msg.includes("payment")) {
    if (msg.includes("formula")) {
      return "📐 **EMI = [P×R×(1+R)^N]/[(1+R)^N-1]** | Use Loans → EMI Calculator!";
    }
    return "💰 EMI is monthly loan payment. Go to Loans section to calculate!";
  }

  if (msg.includes("eligible") || msg.includes("eligibility")) {
    return "✅ **Eligibility:** Credit Score (higher=better) • Income (EMI ≤ 40-50%) • Employment • Payment History";
  }

  if (msg.includes("where") || msg.includes("how to")) {
    if (msg.includes("score")) return "🔍 Dashboard → Check Credit Score";
    if (msg.includes("emi")) return "🔍 Navbar → Loans → EMI Calculator";
    if (msg.includes("profile")) return "🔍 Navbar → Financial Profile";
    return "🗺️ Dashboard | Profile | Loans | Insights | Future Scope";
  }

  if (msg.includes("what is") || msg.includes("define")) {
    if (msg.includes("cibil")) return "📚 **CIBIL:** Credit bureau tracking scores in India";
    if (msg.includes("principal")) return "📚 **Principal:** Original borrowed amount";
    if (msg.includes("tenure")) return "📚 **Tenure:** Loan repayment time period";
    return "📚 Ask about: CIBIL, EMI, Principal, Tenure, Interest, Rate";
  }

  if (msg.includes("future") || msg.includes("planned")) {
    return "🚀 10 Planned Features: What-If • AI Coach • Real CIBIL • ML Models • Alerts • Bank APIs • Docs • Blockchain • Languages • Mobile";
  }

  if (msg.includes("feature") || msg.includes("what can")) {
    return "✨ **Features:** Credit Score • EMI Calculator • Loan Eligibility • Credit Tracking • Insights • Loans Section";
  }

  if (msg.includes("hi") || msg.includes("hello") || msg.includes("help")) {
    return "👋 Ask about: Credit scores • EMI • Loans • Navigation • Terms • Future features";
  }

  return "❓ Ask about credit scores, EMI, loans, or features!";
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      text: "👋 Hi! Ask me about credit scores, EMI, loans, or features!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Try backend first
      const response = await fetch("http://localhost:5000/api/chatbot/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: data.response || getLocalResponse(userMessage.text),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Backend error");
      }
    } catch {
      // Fallback to local response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: getLocalResponse(userMessage.text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        title="Chat with CreditUp Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-80 h-96 shadow-2xl border border-slate-200/50 flex flex-col bg-white rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-sm">CreditUp Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={cn(
                      "max-w-xs px-3 py-2 rounded-lg text-xs",
                      msg.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-800 px-3 py-2 rounded-lg text-xs">
                    ✓ Processing...
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-slate-200 p-3 bg-slate-50 flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask something..."
              className="flex-1 h-8 text-xs"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
