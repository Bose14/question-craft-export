
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Download, Upload } from "lucide-react";
import { toast } from "sonner";

interface QuestionPaperConfig {
  subjectName: string;
  university: string;
  examDate: string;
  duration: string;
  headerImage: string | null;
  sections: any[];
  totalMarks: number;
}

const Result = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<QuestionPaperConfig | null>(null);

  useEffect(() => {
    const savedConfig = sessionStorage.getItem('questionPaperConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    } else {
      // Redirect to generator if no config found
      navigate('/generator');
    }
  }, [navigate]);

  // Sample questions - in a real app, these would be generated based on the configuration
  const sampleQuestions = [
    {
      text: "State the limit definition of the derivative of a function f(x).",
      marks: 2,
      unit: "UNIT I"
    },
    {
      text: "What condition must be met for a function to be continuous at a point 'c'?",
      marks: 2,
      unit: "UNIT I"
    },
    {
      text: "Provide the formula for the derivative of the product of two functions, f(x) and g(x).",
      marks: 2,
      unit: "UNIT I"
    },
    {
      text: "Explain what is meant by implicit differentiation.",
      marks: 2,
      unit: "UNIT I"
    },
    {
      text: "How can logarithmic differentiation simplify the process of finding the derivative of a function involving products, quotients, and powers?",
      marks: 2,
      unit: "UNIT I"
    }
  ];

  const handleDownloadPDF = () => {
    toast.success("PDF download started");
    console.log("Downloading PDF...");
  };

  const handleDownloadWord = () => {
    toast.success("Word document download started");
    console.log("Downloading Word document...");
  };

  const handleEditConfiguration = () => {
    toast.info("Redirecting to edit configuration");
    navigate('/generator');
  };

  if (!config) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date: ___________";
    const date = new Date(dateString);
    return `Date: ${date.toLocaleDateString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/generator" className="flex items-center space-x-2 text-slate-900 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Generator</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Generated Question Paper</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Generated Question Paper</h1>
          <div className="flex items-center space-x-3">
            <Button onClick={handleEditConfiguration} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Configuration
            </Button>
            <Button onClick={handleDownloadWord} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Word
            </Button>
            <Button onClick={handleDownloadPDF} className="bg-slate-900 hover:bg-slate-800">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Question Paper Preview */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            {/* Custom Header Image */}
            {config.headerImage && (
              <div className="text-center mb-6">
                <img 
                  src={config.headerImage} 
                  alt="Institution Header" 
                  className="max-h-24 mx-auto"
                />
              </div>
            )}

            {/* University Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {config.university || "University Name"}
              </h2>
              <h3 className="text-xl font-semibold text-slate-700 mb-6">
                {config.subjectName}
              </h3>
              
              <div className="flex justify-between items-center text-sm text-slate-600 border-b border-slate-300 pb-4">
                <span>{formatDate(config.examDate)}</span>
                <span>Time: {config.duration || "Duration: ___________"}</span>
                <span>Total Marks: {config.totalMarks}</span>
              </div>
            </div>

            {/* Sections */}
            {config.sections.map((section, sectionIndex) => (
              <div key={section.id} className="mb-8">
                <h4 className="text-lg font-semibold text-slate-900 mb-6 underline">
                  {section.name}
                </h4>
                
                <div className="space-y-6">
                  {sampleQuestions.slice(0, section.questions).map((question, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <p className="text-slate-800 leading-relaxed">
                          {index + 1}. {question.text}{" "}
                          <span className="text-sm text-slate-500">
                            (From {question.unit})
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-slate-900">
                          [{section.marksPerQuestion} Marks]
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="mt-12 pt-4 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-500">
                Generated using AI Question Paper Generator • {config.university || "University"} Format
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Result;
