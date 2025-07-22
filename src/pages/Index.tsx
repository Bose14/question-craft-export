
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Upload, Download, Zap, Users, Shield, Brain, Settings, Image, FileKey, Share, Clock, BookOpen, ChevronDown, ArrowRight, Star } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import DashboardStats from "@/components/DashboardStats";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  const recentPapers = [
    {
      id: 1,
      subject: "MATRICES AND CALCULUS",
      university: "Anna University",
      date: "2025-01-15",
      marks: 100,
      sections: 3
    },
    {
      id: 2,
      subject: "DATA STRUCTURES",
      university: "VTU",
      date: "2025-01-10",
      marks: 80,
      sections: 2
    },
    {
      id: 3,
      subject: "DIGITAL ELECTRONICS",
      university: "Mumbai University",
      date: "2025-01-08",
      marks: 75,
      sections: 4
    }
  ];

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Syllabus",
      description: "Simply upload your syllabus image and let AI understand the content"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Generation",
      description: "Our advanced AI generates relevant questions based on your requirements"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Options",
      description: "Download your question papers in PDF or Word format instantly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Vinathaal</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
               <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                  <span>Generator</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/mcq-generator" className="flex items-center">
                      <Brain className="w-4 h-4 mr-2" />
                      MCQ Generator
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/generator" className="flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Generator using Syllabus
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/generator" className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Generator using Question Bank
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
     <section className="min-h-screen py-20 flex items-center">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
      Generate Question Papers with{" "}
      <span className="bg-gradient-primary bg-clip-text text-transparent">
        AI Precision
      </span>
    </h1>
    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
      Create professional question papers instantly with customizable sections, difficulty levels, 
      and automated answer keys. Perfect for educators and institutions.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/generator">
        <Button size="lg" className="px-8 py-3 bg-gradient-primary hover:opacity-90">
          <FileText className="w-5 h-5 mr-2" />
          Start Generating
        </Button>
      </Link>
      <Link to="/mcq-generator">
        <Button size="lg" variant="outline" className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Brain className="w-5 h-5 mr-2" />
          MCQ Generator
        </Button>
      </Link>
    </div>
  </div>
</section>


      {/* Dashboard Stats Section */}
      <DashboardStats />

      {/* Popular Question Papers Section - Enhanced */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Question Paper Templates</h2>
            <p className="text-xl text-muted-foreground">Get started with these commonly used subjects and boost your productivity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                subject: "Mathematics", 
                topic: "Calculus & Linear Algebra", 
                difficulty: "Medium", 
                duration: "3 Hours",
                questions: 15,
                rating: 4.8,
                downloads: "2.1k",
                preview: "/placeholder.svg"
              },
              { 
                subject: "Computer Science", 
                topic: "Data Structures & Algorithms", 
                difficulty: "Hard", 
                duration: "3 Hours",
                questions: 12,
                rating: 4.9,
                downloads: "1.8k",
                preview: "/placeholder.svg"
              },
              { 
                subject: "Physics", 
                topic: "Mechanics & Thermodynamics", 
                difficulty: "Medium", 
                duration: "3 Hours",
                questions: 18,
                rating: 4.7,
                downloads: "1.5k",
                preview: "/placeholder.svg"
              },
              { 
                subject: "Chemistry", 
                topic: "Organic & Inorganic Chemistry", 
                difficulty: "Medium", 
                duration: "3 Hours",
                questions: 16,
                rating: 4.6,
                downloads: "1.3k",
                preview: "/placeholder.svg"
              },
              { 
                subject: "English", 
                topic: "Literature & Grammar", 
                difficulty: "Easy", 
                duration: "2 Hours",
                questions: 20,
                rating: 4.5,
                downloads: "2.5k",
                preview: "/placeholder.svg"
              },
              { 
                subject: "Economics", 
                topic: "Microeconomics & Macroeconomics", 
                difficulty: "Medium", 
                duration: "3 Hours",
                questions: 14,
                rating: 4.8,
                downloads: "1.1k",
                preview: "/placeholder.svg"
              }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-accent/20 bg-white group relative overflow-hidden">
                {/* Template Preview Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={`${template.subject} template preview`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-foreground">{template.rating}</span>
                  </div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      template.difficulty === 'Easy' ? 'bg-success/90 text-white' :
                      template.difficulty === 'Medium' ? 'bg-accent/90 text-white' :
                      'bg-error/90 text-white'
                    }`}>
                      {template.difficulty}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
                    {template.subject}
                  </CardTitle>
                  <CardDescription className="text-text-secondary font-medium">
                    {template.topic}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{template.duration}</span>
                      </div>
                      <span className="text-muted-foreground">{template.downloads} Downloads</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{template.questions}</span> Questions
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link to="/generator">
                      <Button className="w-full bg-gradient-primary hover:opacity-90 group-hover:shadow-lg transition-all font-semibold py-2.5">
                        Choose Template
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full text-sm border-primary/20 hover:border-primary/40">
                      Preview Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/generator">
              <Button variant="outline" size="lg" className="px-8 py-3 border-primary/30 hover:border-primary text-primary hover:bg-primary/5">
                View All Templates
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Recent Papers Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Recently Created</h2>
            <Link to="/generator">
              <Button variant="outline">Create New</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{paper.subject}</CardTitle>
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

      {/* Features Grid */}
      <section className="py-20 bg-gradient-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Question Paper Creation
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed for modern education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap />}
              title="AI-Powered Generation"
              description="Leverage advanced AI to create relevant, well-structured questions tailored to your syllabus"
            />
            <FeatureCard
              icon={<Settings />}
              title="Customizable Sections"
              description="Configure multiple sections with different difficulty levels, marks, and question counts"
            />
            <FeatureCard
              icon={<Download />}
              title="Multiple Export Formats"
              description="Download your question papers as PDF or Word documents with professional formatting"
            />
            <FeatureCard
              icon={<Image />}
              title="Custom Headers"
              description="Upload your institution's logo and create branded question papers"
            />
            <FeatureCard
              icon={<FileKey />}
              title="Answer Key Generation"
              description="Automatically generate comprehensive answer keys with explanations"
            />
            <FeatureCard
              icon={<Brain />}
              title="MCQ Generator"
              description="Specialized tool for creating multiple choice question papers with options"
            />
            <FeatureCard
              icon={<Share />}
              title="Easy Sharing"
              description="Share question papers via email, WhatsApp, or export to Google Drive"
            />
            <FeatureCard
              icon={<Clock />}
              title="Time Configuration"
              description="Set exam duration and dates with automatic formatting"
            />
            <FeatureCard
              icon={<BookOpen />}
              title="Unit-wise Questions"
              description="Organize questions by syllabus units for comprehensive coverage"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cta">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Question Paper Creation?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of educators who have already made the switch to AI-powered question generation.
          </p>
          <Link to="/generator">
            <Button size="lg" className="px-8 py-3 bg-white text-primary hover:bg-white/90">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
