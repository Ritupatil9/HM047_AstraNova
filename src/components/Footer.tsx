import { Heart, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-12 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">C</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">CreditUp</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering your financial journey with smart credit management tools and AI-powered insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="/financial-profile" className="hover:text-foreground transition-colors">Financial Profile</a>
              </li>
              <li>
                <a href="/credit-score" className="hover:text-foreground transition-colors">Credit Score</a>
              </li>
              <li>
                <a href="/loans" className="hover:text-foreground transition-colors">Loans</a>
              </li>
              <li>
                <a href="/insights" className="hover:text-foreground transition-colors">Insights</a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">EMI Calculator</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">AI Loan Prediction</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Credit Tracking</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Financial Tips</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Loan Comparison</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/Ritupatil9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@creditup.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong> contact@creditup.com
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Support:</strong> Available 24/7
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} CreditUp. All rights reserved. Built with <Heart className="w-4 h-4 inline text-red-500" /> 
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
