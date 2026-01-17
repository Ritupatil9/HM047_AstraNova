import { Bell, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">C</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">CreditUp</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/financial-profile")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Financial Profile
          </button>
          <button
            onClick={() => navigate("/loans")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Loans
          </button>
          <button
            onClick={() => navigate("/insights")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Insights
          </button>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Credit Cards
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Credit Score Updated</p>
                      <p className="text-xs text-muted-foreground">Your credit score has improved by 15 points! 🎉</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">EMI Payment Reminder</p>
                      <p className="text-xs text-muted-foreground">Your home loan EMI is due in 3 days - ₹25,000</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New Loan Offer Available</p>
                      <p className="text-xs text-muted-foreground">Pre-approved personal loan at 10.5% interest rate</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Credit Utilization Alert</p>
                      <p className="text-xs text-muted-foreground">You're using 65% of your credit limit. Keep it below 30% for better score.</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Financial Profile Updated</p>
                      <p className="text-xs text-muted-foreground">Your financial profile has been successfully updated.</p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {getInitials(user.displayName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.displayName || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/financial-profile")}
                  className="cursor-pointer"
                >
                  Financial Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!user && (
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary/90"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
