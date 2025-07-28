
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Brain, Clock, Users, Star, Zap, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import FeatureCard from "@/components/FeatureCard";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  const handleTemplateChoice = (templateName: string) => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please log in to choose a template");
      return;
    }
    toast.success(`${templateName} template selected!`);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      description: "Advanced AI creates contextually relevant questions based on your curriculum and requirements."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Generate complete question papers in minutes, not hours. Focus on teaching, not paperwork."
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Each question is carefully crafted to meet educational standards and assessment criteria."
    },
    {
      icon: Users,
      title: "Multi-Subject Support",
      description: "Works across all subjects - Science, Math, Literature, History, and more."
    }
  ];

  const templates = [
    {
      id: 1,
      title: "Science Mid-Term",
      subject: "Physics",
      questions: 25,
      duration: "2 hours",
      difficulty: "Medium",
      preview: "/question-paper.jpg"
    },
    {
      id: 2,
      title: "Mathematics Final",
      subject: "Mathematics", 
      questions: 30,
      duration: "3 hours",
      difficulty: "Hard",
      preview: "/question-paper1.jpg"
    },
    {
      id: 3,
      title: "Literature Quiz",
      subject: "English",
      questions: 20,
      duration: "1 hour",
      difficulty: "Easy",
      preview: "/question-paper.jpg"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Question Papers Generated" },
    { number: "5,000+", label: "Happy Educators" },
    { number: "50+", label: "Subjects Covered" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-accent/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-4">
              <img
                src="/vinathaal_icon.png"
                alt="Vinathaal Icon"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
              />
              <img
                src="/vinathaal-heading-black.png"
                alt="Vinathaal Heading"
                className="h-6 sm:h-8 lg:h-10 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/generator" className="text-text-primary hover:text-accent transition-colors">
                Generator
              </Link>
              <Link to="/mcq-generator" className="text-text-primary hover:text-accent transition-colors">
                MCQ Generator
              </Link>
              <Link to="/question-bank" className="text-text-primary hover:text-accent transition-colors">
                Question Bank
              </Link>
              <Link to="/pricing" className="text-text-primary hover:text-accent transition-colors">
                Pricing
              </Link>
              <Link to="/support" className="text-text-primary hover:text-accent transition-colors">
                Support
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-primary">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <Link to="/login">
                <Button variant="outline" size="sm" className="mr-2">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-primary">
                  Start
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/generator" className="text-text-primary hover:text-accent transition-colors py-2">
                Generator
              </Link>
              <Link to="/mcq-generator" className="text-text-primary hover:text-accent transition-colors py-2">
                MCQ Generator
              </Link>
              <Link to="/question-bank" className="text-text-primary hover:text-accent transition-colors py-2">
                Question Bank
              </Link>
              <Link to="/pricing" className="text-text-primary hover:text-accent transition-colors py-2">
                Pricing
              </Link>
              <Link to="/support" className="text-text-primary hover:text-accent transition-colors py-2">
                Support
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            <Badge className="mx-auto bg-accent/10 text-accent border-accent/20 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 5,000+ Educators
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Create Perfect Question Papers with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
              Transform your teaching with our AI-powered question paper generator. 
              Create professional, curriculum-aligned assessments in minutes, not hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/generator">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
                  Start Creating Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm sm:text-base text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Why Choose Vinathaal?
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
              Experience the future of question paper generation with our cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Popular Templates */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Popular Question Paper Templates
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
              Get started quickly with our professionally designed templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {templates.map((template) => (
              <Card key={template.id} className="bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src={template.preview}
                      alt={template.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle className="text-xl text-primary">{template.title}</CardTitle>
                  <CardDescription className="text-text-secondary">
                    {template.subject} • {template.questions} questions • {template.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-accent/20">
                      {template.difficulty}
                    </Badge>
                    <span className="text-sm text-text-secondary">
                      {template.questions} questions
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleTemplateChoice(template.title)}
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    Choose Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/templates">
              <Button variant="outline" size="lg" className="border-accent/20 hover:bg-accent/10">
                View All Templates
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-cta">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg sm:text-xl text-blue-200 mb-8 sm:mb-10">
            Join thousands of educators who have already discovered the power of AI-generated question papers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/generator">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
