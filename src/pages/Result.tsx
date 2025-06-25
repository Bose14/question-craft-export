
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Download, Upload, FileKey } from "lucide-react";
import { toast } from "sonner";
import AnswerKeyGenerator from "@/components/AnswerKeyGenerator";
import ShareDialog from "@/components/ShareDialog";

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

interface AnswerItem {
  id: string;
  question: string;
  answer: string;
  marks: number;
  explanation?: string;
}

const Result = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<QuestionPaperConfig | null>(null);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [answerKey, setAnswerKey] = useState<AnswerItem[]>([]);

  useEffect(() => {
    const savedConfig = sessionStorage.getItem('questionPaperConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    } else {
      navigate('/generator');
    }
  }, [navigate]);

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

  const sampleMCQs = [
    {
      text: "What is the derivative of x²?",
      options: ["A) x", "B) 2x", "C) x²", "D) 2x²"],
      marks: 1,
      unit: "UNIT I"
    },
    {
      text: "Which of the following is a continuous function?",
      options: ["A) f(x) = 1/x", "B) f(x) = |x|", "C) f(x) = [x]", "D) f(x) = tan(x)"],
      marks: 1,
      unit: "UNIT I"
    }
  ];

  const generatePDF = () => {
    // Create a printable version
    const printContent = document.getElementById('question-paper-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${config?.subjectName || 'Question Paper'}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .question { margin-bottom: 15px; }
                .section-title { font-weight: bold; text-decoration: underline; margin: 20px 0 10px 0; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        toast.success("PDF generation started - use your browser's print dialog");
      }
    }
  };

  const generateWord = () => {
    if (!config) return;
    
    // Create Word document content
    let wordContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
        <head>
          <meta charset="utf-8">
          <title>${config.subjectName}</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>90</w:Zoom>
              <w:DoNotPromptForConvert/>
              <w:DoNotShowInsertAsIcon/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .question { margin-bottom: 15px; }
            .section-title { font-weight: bold; text-decoration: underline; margin: 20px 0 10px 0; }
          </style>
        </head>
        <body>
    `;
    
    const printContent = document.getElementById('question-paper-content');
    if (printContent) {
      wordContent += printContent.innerHTML;
    }
    
    wordContent += '</body></html>';
    
    const blob = new Blob([wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.subjectName || 'question-paper'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Word document downloaded successfully!");
  };

  const handleAnswerKeyGenerate = (answers: AnswerItem[]) => {
    setAnswerKey(answers);
    setShowAnswerKey(true);
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

  const questionPaperContent = () => {
    const questionsToShow = config.type === 'mcq' ? sampleMCQs : sampleQuestions;
    
    return (
      <div id="question-paper-content">
        {config.headerImage && (
          <div className="text-center mb-6">
            <img 
              src={config.headerImage} 
              alt="Institution Header" 
              className="max-h-24 mx-auto"
            />
          </div>
        )}

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

        {config.sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-8">
            <h4 className="text-lg font-semibold text-slate-900 mb-6 underline">
              {section.name}
            </h4>
            
            <div className="space-y-6">
              {questionsToShow.slice(0, section.questions).map((question, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <p className="text-slate-800 leading-relaxed">
                      {index + 1}. {question.text}{" "}
                      {config.type === 'mcq' && 'options' in question && question.options && (
                        <div className="mt-2 ml-4">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="mb-1">{option}</div>
                          ))}
                        </div>
                      )}
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

        <div className="mt-12 pt-4 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            Generated using AI Question Paper Generator • {config.university || "University"} Format
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Generated Question Paper</h1>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => setShowAnswerKey(!showAnswerKey)} 
              variant="outline"
            >
              <FileKey className="w-4 h-4 mr-2" />
              {showAnswerKey ? 'Hide' : 'Generate'} Answer Key
            </Button>
            <ShareDialog 
              title={config.subjectName} 
              content="Question paper generated successfully" 
            />
            <Button onClick={handleEditConfiguration} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Configuration
            </Button>
            <Button onClick={generateWord} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Word
            </Button>
            <Button onClick={generatePDF} className="bg-slate-900 hover:bg-slate-800">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {showAnswerKey && (
          <AnswerKeyGenerator 
            onGenerate={handleAnswerKeyGenerate} 
            questionPaperType={config.type}
          />
        )}

        {answerKey.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6">Answer Key</h3>
              <div className="space-y-4">
                {answerKey.map((answer, index) => (
                  <div key={answer.id} className="border-b border-slate-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{answer.question}</span>
                      <span className="text-sm text-slate-500">[{answer.marks} Marks]</span>
                    </div>
                    <p className="text-slate-700 mb-2">
                      <strong>Answer:</strong> {answer.answer}
                    </p>
                    {answer.explanation && (
                      <p className="text-slate-600 text-sm">
                        <strong>Explanation:</strong> {answer.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            {questionPaperContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Result;
