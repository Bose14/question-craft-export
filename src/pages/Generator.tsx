
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Upload, FileText, Image } from "lucide-react";
import { toast } from "sonner";

interface QuestionConfig {
  id: string;
  text: string;
  marks: number;
  difficulty: string;
  unit: string;
  subQuestions?: SubQuestion[];
}

interface SubQuestion {
  id: string;
  text: string;
  marks: number;
}

interface Section {
  id: string;
  name: string;
  questions: QuestionConfig[];
  difficulty: string;
  units: string[];
}

const Generator = () => {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");
  const [university, setUniversity] = useState("");
  const [examDate, setExamDate] = useState("");
  const [duration, setDuration] = useState("");
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [syllabusImage, setSyllabusImage] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "Section A",
      questions: [
        {
          id: "1",
          text: "",
          marks: 2,
          difficulty: "Easy",
          unit: "UNIT I",
          subQuestions: []
        }
      ],
      difficulty: "Easy",
      units: ["UNIT I"]
    }
  ]);

  const handleHeaderImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setHeaderImage(e.target?.result as string);
        toast.success("Header image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSyllabusImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSyllabusImage(e.target?.result as string);
        toast.success("Syllabus image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      name: `Section ${String.fromCharCode(65 + sections.length)}`,
      questions: [
        {
          id: Date.now().toString(),
          text: "",
          marks: 2,
          difficulty: "Easy",
          unit: "UNIT I",
          subQuestions: []
        }
      ],
      difficulty: "Easy",
      units: []
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const addQuestion = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newQuestion: QuestionConfig = {
          id: Date.now().toString(),
          text: "",
          marks: 2,
          difficulty: "Medium",
          unit: "UNIT I",
          subQuestions: []
        };
        return { ...section, questions: [...section.questions, newQuestion] };
      }
      return section;
    }));
  };

  const removeQuestion = (sectionId: string, questionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId && section.questions.length > 1) {
        return {
          ...section,
          questions: section.questions.filter(q => q.id !== questionId)
        };
      }
      return section;
    }));
  };

  const updateQuestion = (sectionId: string, questionId: string, field: keyof QuestionConfig, value: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(q =>
            q.id === questionId ? { ...q, [field]: value } : q
          )
        };
      }
      return section;
    }));
  };

  const addSubQuestion = (sectionId: string, questionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(q => {
            if (q.id === questionId) {
              const newSubQuestion: SubQuestion = {
                id: Date.now().toString(),
                text: "",
                marks: 1
              };
              return { 
                ...q, 
                subQuestions: [...(q.subQuestions || []), newSubQuestion] 
              };
            }
            return q;
          })
        };
      }
      return section;
    }));
  };

  const removeSubQuestion = (sectionId: string, questionId: string, subQuestionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(q => {
            if (q.id === questionId) {
              return {
                ...q,
                subQuestions: (q.subQuestions || []).filter(sq => sq.id !== subQuestionId)
              };
            }
            return q;
          })
        };
      }
      return section;
    }));
  };

  const updateSubQuestion = (sectionId: string, questionId: string, subQuestionId: string, field: keyof SubQuestion, value: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(q => {
            if (q.id === questionId) {
              return {
                ...q,
                subQuestions: (q.subQuestions || []).map(sq =>
                  sq.id === subQuestionId ? { ...sq, [field]: value } : sq
                )
              };
            }
            return q;
          })
        };
      }
      return section;
    }));
  };

  const toggleUnit = (sectionId: string, unit: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const units = section.units.includes(unit)
          ? section.units.filter(u => u !== unit)
          : [...section.units, unit];
        return { ...section, units };
      }
      return section;
    }));
  };

  const totalMarks = sections.reduce((total, section) => 
    total + section.questions.reduce((sectionTotal, question) => 
      sectionTotal + question.marks + (question.subQuestions?.reduce((subTotal, sq) => subTotal + sq.marks, 0) || 0), 0
    ), 0
  );

  const handleGenerate = () => {
    if (!subjectName.trim()) {
      toast.error("Please enter a subject name");
      return;
    }
    
    const config = {
      subjectName,
      university,
      examDate,
      duration,
      headerImage,
      sections,
      totalMarks,
      type: 'descriptive'
    };
    sessionStorage.setItem('questionPaperConfig', JSON.stringify(config));
    
    console.log("Generating question paper with:", config);
    toast.success("Question paper generated successfully!");
    navigate("/result");
  };

  const units = ["UNIT I", "UNIT II", "UNIT III", "UNIT IV", "UNIT V"];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-slate-900 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Upload Header Image */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Upload Custom Header Image (Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleHeaderImageUpload}
                className="hidden"
                id="header-upload"
              />
              <label htmlFor="header-upload" className="cursor-pointer">
                {headerImage ? (
                  <div className="space-y-4">
                    <img src={headerImage} alt="Header preview" className="max-h-32 mx-auto rounded" />
                    <p className="text-green-600">Header image uploaded!</p>
                  </div>
                ) : (
                  <>
                    <Image className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-600">Click to upload your university/institution header</p>
                    <p className="text-sm text-slate-500 mt-2">PNG, JPG up to 10MB</p>
                  </>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Upload Syllabus */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Syllabus Image (Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleSyllabusImageUpload}
                className="hidden"
                id="syllabus-upload"
              />
              <label htmlFor="syllabus-upload" className="cursor-pointer">
                {syllabusImage ? (
                  <div className="space-y-4">
                    <img src={syllabusImage} alt="Syllabus preview" className="max-h-32 mx-auto rounded" />
                    <p className="text-green-600">Syllabus uploaded!</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-600">Click to upload or drag and drop your syllabus image</p>
                    <p className="text-sm text-slate-500 mt-2">PNG, JPG up to 10MB</p>
                  </>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Configure Question Paper */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Configure Question Paper</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">University/Institution</Label>
                <Input
                  id="university"
                  placeholder="e.g., Anna University"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Name</Label>
                <Input
                  id="subject"
                  placeholder="e.g., MATRICES AND CALCULUS"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Exam Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 Hours"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            {/* Sections Configuration */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sections Configuration</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-green-600 font-medium">
                    Total Marks: {totalMarks}
                  </span>
                  <Button onClick={addSection} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {sections.map((section, index) => (
                  <div key={section.id} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Section Configuration</h4>
                      {sections.length > 1 && (
                        <Button
                          onClick={() => removeSection(section.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label>Section Name</Label>
                        <Input
                          value={section.name}
                          onChange={(e) => updateSection(section.id, 'name', e.target.value)}
                          placeholder="Section A"
                        />
                      </div>
                      <div>
                        <Label>Units to Cover</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {units.map((unit) => (
                            <Button
                              key={unit}
                              onClick={() => toggleUnit(section.id, unit)}
                              variant={section.units.includes(unit) ? "default" : "outline"}
                              size="sm"
                              className={section.units.includes(unit) ? "bg-slate-900" : ""}
                            >
                              {unit}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Questions Configuration */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-medium">Configure Questions</h5>
                        <Button
                          onClick={() => addQuestion(section.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                      
                      <div className="space-y-6">
                        {section.questions.map((question, questionIndex) => (
                          <div key={question.id} className="border border-slate-100 rounded p-4 bg-slate-50">
                            <div className="flex justify-between items-start mb-3">
                              <h6 className="text-sm font-medium text-slate-700">
                                Question {questionIndex + 1}
                              </h6>
                              {section.questions.length > 1 && (
                                <Button
                                  onClick={() => removeQuestion(section.id, question.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <Label>Question Text</Label>
                                <Textarea
                                  value={question.text}
                                  onChange={(e) => updateQuestion(section.id, question.id, 'text', e.target.value)}
                                  placeholder="Enter your question here..."
                                  className="min-h-[80px]"
                                />
                              </div>
                              
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <Label>Marks</Label>
                                  <Input
                                    type="number"
                                    value={question.marks}
                                    onChange={(e) => updateQuestion(section.id, question.id, 'marks', parseInt(e.target.value) || 1)}
                                    min="1"
                                  />
                                </div>
                                
                                <div>
                                  <Label>Difficulty</Label>
                                  <Select
                                    value={question.difficulty}
                                    onValueChange={(value) => updateQuestion(section.id, question.id, 'difficulty', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Easy">Easy</SelectItem>
                                      <SelectItem value="Medium">Medium</SelectItem>
                                      <SelectItem value="Hard">Hard</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <Label>Unit</Label>
                                  <Select
                                    value={question.unit}
                                    onValueChange={(value) => updateQuestion(section.id, question.id, 'unit', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {units.map((unit) => (
                                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Sub-questions */}
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <Label>Sub-questions (Optional)</Label>
                                  <Button
                                    onClick={() => addSubQuestion(section.id, question.id)}
                                    size="sm"
                                    variant="outline"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Sub-question
                                  </Button>
                                </div>
                                
                                {question.subQuestions && question.subQuestions.length > 0 && (
                                  <div className="space-y-3">
                                    {question.subQuestions.map((subQ, subIndex) => (
                                      <div key={subQ.id} className="flex gap-2 items-start bg-white p-3 rounded border">
                                        <div className="flex-1 space-y-2">
                                          <Label className="text-xs">Sub-question {String.fromCharCode(97 + subIndex)}</Label>
                                          <Textarea
                                            value={subQ.text}
                                            onChange={(e) => updateSubQuestion(section.id, question.id, subQ.id, 'text', e.target.value)}
                                            placeholder={`Sub-question ${String.fromCharCode(97 + subIndex)}`}
                                            className="min-h-[60px]"
                                          />
                                          <Input
                                            type="number"
                                            value={subQ.marks}
                                            onChange={(e) => updateSubQuestion(section.id, question.id, subQ.id, 'marks', parseInt(e.target.value) || 1)}
                                            placeholder="Marks"
                                            className="w-20"
                                            min="1"
                                          />
                                        </div>
                                        <Button
                                          onClick={() => removeSubQuestion(section.id, question.id, subQ.id)}
                                          variant="outline"
                                          size="sm"
                                          className="text-red-600 hover:text-red-700"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center">
          <Button 
            onClick={handleGenerate}
            size="lg" 
            className="px-8 py-3 bg-slate-900 hover:bg-slate-800"
          >
            <FileText className="w-5 h-5 mr-2" />
            Generate Question Paper
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Generator;
