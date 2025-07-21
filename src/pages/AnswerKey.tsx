import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import ShareDialog from "@/components/ShareDialog";
import { generatePDF, generateWordDocument } from "@/utils/pdfGenerator";

interface AnswerKeyItem {
  questionNumber: string;
  question: string;
  keyPoints: {
    point: string;
    marks: number;
  }[];
  totalMarks: number;
}

interface QuestionPaperConfig {
  subjectName: string;
  university: string;
  examDate: string;
  duration: string;
  headerImage: string | null;
  sections: any[];
  totalMarks: number;
  type?: 'mcq' | 'descriptive';
}

const AnswerKey = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<QuestionPaperConfig | null>(null);
  const [answerKey, setAnswerKey] = useState<AnswerKeyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedConfig = sessionStorage.getItem('questionPaperConfig');
    const savedAnswerKey = sessionStorage.getItem('generatedAnswerKey');
    
    if (savedConfig && savedAnswerKey) {
      setConfig(JSON.parse(savedConfig));
      setAnswerKey(JSON.parse(savedAnswerKey));
    } else {
      navigate('/result');
      return;
    }
    setLoading(false);
  }, [navigate]);

  const handlePDFGenerate = () => {
    const filename = `${config?.subjectName || 'Question Paper'} - Answer Key`;
    generatePDF('answer-key-content', filename);
    toast.success("Answer key PDF exported successfully!");
  };

  const handleWordGenerate = () => {
    const filename = `${config?.subjectName || 'question-paper'}-answer-key`;
    generateWordDocument('answer-key-content', filename);
    toast.success("Answer key Word document downloaded successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!config || answerKey.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No Answer Key Found</h2>
            <p className="text-muted-foreground mb-6">Please generate an answer key first.</p>
            <Button onClick={() => navigate('/result')} className="w-full">
              Back to Result
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/result" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Question Paper</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Answer Key</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Answer Key</h1>
          <div className="flex flex-wrap items-center gap-2">
            <ShareDialog 
              title={`${config.subjectName} - Answer Key`} 
              content="Answer key generated successfully" 
            />
            <Button onClick={handleWordGenerate} variant="outline" size="sm" className="text-xs sm:text-sm">
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Word</span>
              <span className="sm:hidden">DOC</span>
            </Button>
            <Button onClick={handlePDFGenerate} size="sm">
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-4 sm:p-8" id="answer-key-content">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-primary/20">
              {config.headerImage && (
                <img 
                  src={config.headerImage} 
                  alt="University Logo" 
                  className="w-20 h-20 mx-auto mb-4 object-contain"
                />
              )}
              <h1 className="text-2xl font-bold text-primary mb-2">{config.university}</h1>
              <h2 className="text-xl font-semibold text-foreground mb-4">{config.subjectName}</h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Exam Date:</strong> {config.examDate}</p>
                <p><strong>Duration:</strong> {config.duration}</p>
                <p><strong>Total Marks:</strong> {config.totalMarks}</p>
              </div>
              <h3 className="text-lg font-bold text-primary mt-4">ANSWER KEY</h3>
            </div>

            {/* Answer Key Content */}
            <div className="space-y-6">
              {answerKey.map((item, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.questionNumber}. {item.question}
                    </h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      [{item.totalMarks} Marks]
                    </span>
                  </div>
                  
                  <div className="space-y-2 ml-4">
                    {item.keyPoints.map((keyPoint, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <span className="text-primary font-medium">•</span>
                        <div className="flex-1 flex justify-between items-start">
                          <p className="text-foreground/90">{keyPoint.point}</p>
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">
                            ({keyPoint.marks} mark{keyPoint.marks > 1 ? 's' : ''})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Generated on {new Date().toLocaleDateString()} | Answer Key
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnswerKey;