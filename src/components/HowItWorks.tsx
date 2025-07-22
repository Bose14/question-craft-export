
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Settings, Zap, Download, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Upload or Choose",
      description: "Upload your syllabus image or select from our pre-built templates",
      icon: <Upload className="w-8 h-8" />,
      details: ["Upload syllabus PDF/image", "Or choose from 100+ templates", "Supports multiple formats"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "Configure Settings",
      description: "Set your preferences for difficulty, marks, sections, and question types",
      icon: <Settings className="w-8 h-8" />,
      details: ["Set difficulty levels", "Configure mark distribution", "Choose question types"],
      color: "from-emerald-500 to-green-500"
    },
    {
      step: 3,
      title: "AI Generation",
      description: "Our advanced AI analyzes your input and generates relevant questions",
      icon: <Zap className="w-8 h-8" />,
      details: ["AI analyzes syllabus", "Generates quality questions", "Creates answer keys"],
      color: "from-orange-500 to-red-500"
    },
    {
      step: 4,
      title: "Download & Share",
      description: "Get your professional question paper in PDF, Word or share directly",
      icon: <Download className="w-8 h-8" />,
      details: ["Download as PDF/Word", "Share via email/WhatsApp", "Print-ready format"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It <span className="bg-gradient-primary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create professional question papers in just 4 simple steps. Our AI-powered platform makes it easy and fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-card border-accent/20 group">
                <CardHeader className="text-center">
                  {/* Step number */}
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-elegant relative z-10">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-accent" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/generator">
            <Button size="lg" className="px-8 py-3 bg-gradient-primary hover:opacity-90 shadow-elegant">
              <Zap className="w-5 h-5 mr-2" />
              Start Creating Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
