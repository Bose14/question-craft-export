
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Templates = () => {
  const handleTemplateChoice = (templateName: string) => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please log in to choose a template");
      return;
    }
    toast.success(`${templateName} template selected!`);
  };

  const allTemplates = [
    {
      id: 1,
      title: "Science Mid-Term",
      subject: "Physics",
      questions: 25,
      duration: "2 hours",
      difficulty: "Medium",
      description: "Comprehensive physics mid-term examination covering mechanics, thermodynamics, and wave physics.",
      preview: "/question-paper.jpg"
    },
    {
      id: 2,
      title: "Mathematics Final",
      subject: "Mathematics", 
      questions: 30,
      duration: "3 hours",
      difficulty: "Hard",
      description: "Advanced mathematics final exam including calculus, algebra, and geometric problems.",
      preview: "/question-paper1.jpg"
    },
    {
      id: 3,
      title: "Literature Quiz",
      subject: "English",
      questions: 20,
      duration: "1 hour",
      difficulty: "Easy",
      description: "English literature quiz focusing on classic novels and poetry analysis.",
      preview: "/question-paper.jpg"
    },
    {
      id: 4,
      title: "Chemistry Lab Test",
      subject: "Chemistry",
      questions: 15,
      duration: "90 minutes",
      difficulty: "Medium",
      description: "Practical chemistry test covering organic and inorganic chemistry experiments.",
      preview: "/question-paper1.jpg"
    },
    {
      id: 5,
      title: "History Assessment",
      subject: "History",
      questions: 35,
      duration: "2.5 hours",
      difficulty: "Hard",
      description: "Comprehensive history examination covering ancient civilizations to modern times.",
      preview: "/question-paper.jpg"
    },
    {
      id: 6,
      title: "Biology Unit Test",
      subject: "Biology",
      questions: 22,
      duration: "1.5 hours",
      difficulty: "Medium",
      description: "Biology unit test focusing on cell biology, genetics, and human anatomy.",
      preview: "/question-paper1.jpg"
    },
    {
      id: 7,
      title: "Geography Quiz",
      subject: "Geography",
      questions: 18,
      duration: "1 hour",
      difficulty: "Easy",
      description: "Geography quiz covering world geography, climate, and natural resources.",
      preview: "/question-paper.jpg"
    },
    {
      id: 8,
      title: "Economics Final",
      subject: "Economics",
      questions: 28,
      duration: "3 hours",
      difficulty: "Hard",
      description: "Advanced economics final exam including microeconomics, macroeconomics, and market analysis.",
      preview: "/question-paper1.jpg"
    },
    {
      id: 9,
      title: "Computer Science Test",
      subject: "Computer Science",
      questions: 25,
      duration: "2 hours",
      difficulty: "Medium",
      description: "Computer science test covering programming concepts, algorithms, and data structures.",
      preview: "/question-paper.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-accent/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Back link */}
            <Link to="/" className="flex items-center space-x-2 text-slate-900 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* Right - Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/vinathaal_icon.png"
                alt="Vinathaal Icon"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <img
                src="/vinathaal-heading-black.png"
                alt="Vinathaal Heading"
                className="h-6 sm:h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            All Question Paper Templates
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Choose from our extensive collection of professionally designed question paper templates.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allTemplates.map((template) => (
            <Card key={template.id} className="bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="aspect-video bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <CardTitle className="text-lg sm:text-xl text-primary">{template.title}</CardTitle>
                <CardDescription className="text-text-secondary text-sm sm:text-base">
                  {template.subject} • {template.questions} questions • {template.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-accent/20 text-xs sm:text-sm">
                    {template.difficulty}
                  </Badge>
                  <span className="text-xs sm:text-sm text-text-secondary">
                    {template.questions} questions
                  </span>
                </div>
                <Button 
                  onClick={() => handleTemplateChoice(template.title)}
                  className="w-full bg-gradient-primary hover:opacity-90 text-sm sm:text-base"
                >
                  Choose Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16 bg-gradient-cta rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need a Custom Template?
          </h2>
          <p className="text-blue-200 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Can't find the perfect template? Create your own custom question paper with our AI-powered generator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generator">
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 w-full sm:w-auto">
                Create Custom Paper
              </Button>
            </Link>
            <Link to="/support">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Request Template
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
