
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, Download, Users } from "lucide-react";

const Index = () => {
  const [recentPapers] = useState([
    {
      id: 1,
      title: "Mathematics - Calculus",
      subject: "Mathematics",
      date: "2025-06-20",
      questions: 5,
      marks: 10
    },
    {
      id: 2,
      title: "Physics - Mechanics",
      subject: "Physics", 
      date: "2025-06-18",
      questions: 8,
      marks: 15
    },
    {
      id: 3,
      title: "Chemistry - Organic",
      subject: "Chemistry",
      date: "2025-06-15",
      questions: 6,
      marks: 12
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold">📝</div>
              <span className="text-xl font-semibold text-slate-900">QuestionPaper AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <div className="text-6xl mb-6">📝</div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              AI Question Paper Generator
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Upload your syllabus and generate perfectly structured exam question papers in seconds. 
              Effortless, intelligent, and designed for educators.
            </p>
            <Link to="/generator">
              <Button size="lg" className="text-lg px-8 py-3 bg-slate-900 hover:bg-slate-800">
                Start Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <FileText className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <CardTitle>Smart Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI-powered question generation based on your syllabus content and difficulty preferences.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Download className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <CardTitle>Multiple Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Export your question papers in PDF or Word format for easy sharing and printing.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <CardTitle>Educator Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Designed specifically for teachers and educational institutions with intuitive workflows.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Papers Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Recently Created Papers</h2>
            <Link to="/generator">
              <Button variant="outline">Create New Paper</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{paper.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-500">
                        {paper.subject}
                      </CardDescription>
                    </div>
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{paper.date}</span>
                    </div>
                    <div className="flex space-x-4">
                      <span>{paper.questions} questions</span>
                      <span>{paper.marks} marks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400">Generated using AI by Lovable</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
