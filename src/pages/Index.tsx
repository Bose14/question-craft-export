import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Upload, Download, Zap, User, LogOut, Brain, Settings, Image, FileKey, Share, Clock, BookOpen, ChevronDown, ArrowRight, Star } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import DashboardStats from "@/components/DashboardStats";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem("user");
      const authToken = localStorage.getItem("authToken");
      
      if (userData && authToken) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    // Check auth status on component mount
    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "authToken") {
        checkAuthStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleGeneratorClick = (path: string) => {
    const authToken = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    
    if (!user) {
      sessionStorage.setItem("redirectAfterLogin", path);
      navigate("/login");
      return;
    }
    
    // Double check authentication before allowing access
    if (!authToken || !userData) {
      sessionStorage.setItem("redirectAfterLogin", path);
      navigate("/login");
      return;
    }
    
    navigate(path);
  };

  const recentPapers = [
    { id: 1, subject: "MATRICES AND CALCULUS", university: "Anna University", date: "2025-01-15", marks: 100, sections: 3 },
    { id: 2, subject: "DATA STRUCTURES", university: "VTU", date: "2025-01-10", marks: 80, sections: 2 },
    { id: 3, subject: "DIGITAL ELECTRONICS", university: "Mumbai University", date: "2025-01-08", marks: 75, sections: 4 }
  ];

  const features = [
    { icon: <Upload className="w-6 h-6" />, title: "Upload Syllabus", description: "Upload your syllabus and let AI understand it" },
    { icon: <Zap className="w-6 h-6" />, title: "AI Generation", description: "Generate questions using AI based on your inputs" },
    { icon: <Download className="w-6 h-6" />, title: "Export Options", description: "Download papers in PDF or Word format" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* NAVIGATION */}
      <nav className="bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">QuestionCraft</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                <span>Generator</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/mcq-generator" className="flex items-center"><Brain className="w-4 h-4 mr-2" />MCQ Generator</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/generator" className="flex items-center"><Upload className="w-4 h-4 mr-2" />From Syllabus</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/generator" className="flex items-center"><FileText className="w-4 h-4 mr-2" />From Question Bank</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/support" className="text-muted-foreground hover:text-foreground">Support</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Hi, {user.name || user.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button>Sign Up</Button></Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Generate Question Papers with <span className="bg-gradient-primary bg-clip-text text-transparent">AI Precision</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Instantly create question papers with sections, difficulty levels & answer keys.
            {user && <span className="block mt-2 text-green-600 font-medium">Welcome back, {user.name || user.email}!</span>}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 bg-gradient-primary" onClick={() => handleGeneratorClick('/generator')}>
              <FileText className="w-5 h-5 mr-2" /> Start Generating
            </Button>
            <Button size="lg" variant="outline" onClick={() => handleGeneratorClick('/mcq-generator')}>
              <Brain className="w-5 h-5 mr-2" /> MCQ Generator
            </Button>
          </div>
        </div>
      </section>

      {/* Optional Stats and How It Works */}
      {!user && <DashboardStats />}
      {!user && <HowItWorks />}

      {/* Recent Papers */}
      {user && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Recently Created</h2>
              <Button variant="outline" onClick={() => navigate("/generator")}>Create New</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPapers.map(paper => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{paper.subject}</CardTitle>
                    <CardDescription>{paper.university}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Marks: {paper.marks}</span>
                      <span>Sections: {paper.sections}</span>
                    </div>
                    <div className="text-sm text-muted-foreground/80">
                      Created: {new Date(paper.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-20 bg-gradient-features">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-cta">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Question Paper Creation?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of educators who use AI for question generation.
          </p>
          <Button size="lg" className="px-8 py-3 bg-white text-primary hover:bg-white/90" onClick={() => handleGeneratorClick("/generator")}>
            Get Started for Free
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
