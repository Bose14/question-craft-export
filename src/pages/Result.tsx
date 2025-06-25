
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Download, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

const Result = () => {
  const questionPaper = {
    university: "Anna University",
    subject: "MATRICES AND CALCULUS",
    date: "6/25/2025",
    time: "3 Hours",
    totalMarks: 10,
    questions: [
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
    ]
  };

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
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/generator" className="flex items-center space-x-2 text-slate-900 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Syllabus Image</span>
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
            {/* University Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {questionPaper.university}
              </h2>
              <h3 className="text-xl font-semibold text-slate-700 mb-6">
                {questionPaper.subject}
              </h3>
              
              <div className="flex justify-between items-center text-sm text-slate-600 border-b border-slate-300 pb-4">
                <span>Date: {questionPaper.date}</span>
                <span>Time: {questionPaper.time}</span>
                <span>Total Marks: {questionPaper.totalMarks}</span>
              </div>
            </div>

            {/* Section A */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-slate-900 mb-6 underline">
                Section A
              </h4>
              
              <div className="space-y-6">
                {questionPaper.questions.map((question, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <p className="text-slate-800 leading-relaxed">
                        {question.text}{" "}
                        <span className="text-sm text-slate-500">
                          (From {question.unit})
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-slate-900">
                        [{question.marks} Marks]
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-4 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-500">
                Generated using AI by Lovable • Anna University Question Paper Format
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Result;
