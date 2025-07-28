
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Brain, Download, FileText } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Syllabus",
      description: "Simply upload your curriculum or syllabus documents in any format.",
      step: "01"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your content and understands the requirements.",
      step: "02"
    },
    {
      icon: FileText,
      title: "Generate Questions",
      description: "AI creates relevant, well-structured questions based on your specifications.",
      step: "03"
    },
    {
      icon: Download,
      title: "Download & Use",
      description: "Get your professional question paper ready to print and distribute.",
      step: "04"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Generate professional question papers in just four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300 relative">
              <CardHeader className="text-center pb-4">
                <div className="absolute -top-4 left-4 bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-text-secondary">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Step Connector */}
        <div className="lg:hidden mt-8 text-center">
          <div className="text-text-secondary text-sm">
            Follow these simple steps to create your perfect question paper
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
