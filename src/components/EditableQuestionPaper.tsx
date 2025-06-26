
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface SubQuestion {
  id: string;
  text: string;
  marks: number;
}

interface Question {
  text: string;
  options?: string[];
  marks: number;
  unit: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  subQuestions?: SubQuestion[];
}

interface EditableQuestionPaperProps {
  config: any;
  questions: Question[];
  onSave: (updatedQuestions: Question[]) => void;
}

const EditableQuestionPaper = ({ config, questions, onSave }: EditableQuestionPaperProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestions, setEditedQuestions] = useState(questions);
  const [editedConfig, setEditedConfig] = useState(config);

  const handleSave = () => {
    onSave(editedQuestions);
    setIsEditing(false);
    toast.success("Question paper updated successfully!");
  };

  const handleCancel = () => {
    setEditedQuestions(questions);
    setEditedConfig(config);
    setIsEditing(false);
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...editedQuestions];
    if (field === 'options') {
      updated[index] = { ...updated[index], options: value.split('\n').filter(opt => opt.trim()) };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setEditedQuestions(updated);
  };

  const addSubQuestion = (questionIndex: number) => {
    const updated = [...editedQuestions];
    if (!updated[questionIndex].subQuestions) {
      updated[questionIndex].subQuestions = [];
    }
    const newSubQuestion: SubQuestion = {
      id: Date.now().toString(),
      text: '',
      marks: 1
    };
    updated[questionIndex].subQuestions!.push(newSubQuestion);
    setEditedQuestions(updated);
  };

  const updateSubQuestion = (questionIndex: number, subQuestionId: string, field: string, value: string | number) => {
    const updated = [...editedQuestions];
    if (updated[questionIndex].subQuestions) {
      updated[questionIndex].subQuestions = updated[questionIndex].subQuestions!.map(sq =>
        sq.id === subQuestionId ? { ...sq, [field]: value } : sq
      );
    }
    setEditedQuestions(updated);
  };

  const removeSubQuestion = (questionIndex: number, subQuestionId: string) => {
    const updated = [...editedQuestions];
    if (updated[questionIndex].subQuestions) {
      updated[questionIndex].subQuestions = updated[questionIndex].subQuestions!.filter(sq => sq.id !== subQuestionId);
    }
    setEditedQuestions(updated);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date: ___________";
    const date = new Date(dateString);
    return `Date: ${date.toLocaleDateString()}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div id="question-paper-content" className="relative">
      <div className="flex justify-end mb-4 no-print">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Paper
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {editedConfig.headerImage && (
        <div className="text-center mb-6">
          <img 
            src={editedConfig.headerImage} 
            alt="Institution Header" 
            className="max-h-24 mx-auto"
          />
        </div>
      )}

      <div className="text-center mb-8">
        {isEditing ? (
          <div className="space-y-4">
            <Input
              value={editedConfig.university || ""}
              onChange={(e) => setEditedConfig({...editedConfig, university: e.target.value})}
              placeholder="University Name"
              className="text-center text-2xl font-bold"
            />
            <Input
              value={editedConfig.subjectName}
              onChange={(e) => setEditedConfig({...editedConfig, subjectName: e.target.value})}
              placeholder="Subject Name"
              className="text-center text-xl font-semibold"
            />
          </div>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              {editedConfig.university || "University Name"}
            </h2>
            <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-6">
              {editedConfig.subjectName}
            </h3>
          </>
        )}
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600 border-b border-slate-300 pb-4 gap-2">
          <span>{formatDate(editedConfig.examDate)}</span>
          <span>Time: {editedConfig.duration || "Duration: ___________"}</span>
          <span>Total Marks: {editedConfig.totalMarks}</span>
        </div>
      </div>

      {editedConfig.sections.map((section: any, sectionIndex: number) => (
        <div key={section.id} className="mb-8">
          <h4 className="text-lg font-semibold text-slate-900 mb-6 underline">
            {section.name}
          </h4>
          
          <div className="space-y-6">
            {editedQuestions.slice(0, section.questions).map((question, index) => (
              <div key={index} className="border-b border-slate-200 pb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1 w-full">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                          <Select
                            value={question.difficulty || 'Medium'}
                            onValueChange={(value) => updateQuestion(index, 'difficulty', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={() => addSubQuestion(index)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Sub-question
                          </Button>
                        </div>
                        <Textarea
                          value={question.text}
                          onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                          placeholder="Question text"
                          className="min-h-[80px]"
                        />
                        {editedConfig.type === 'mcq' && question.options && (
                          <Textarea
                            value={question.options.join('\n')}
                            onChange={(e) => updateQuestion(index, 'options', e.target.value)}
                            placeholder="Options (one per line)"
                            className="min-h-[100px]"
                          />
                        )}
                        
                        {question.subQuestions && question.subQuestions.length > 0 && (
                          <div className="ml-6 space-y-3 border-l-2 border-slate-200 pl-4">
                            <h5 className="font-medium text-slate-700">Sub-questions:</h5>
                            {question.subQuestions.map((subQ, subIndex) => (
                              <div key={subQ.id} className="flex gap-2 items-start">
                                <div className="flex-1 space-y-2">
                                  <Textarea
                                    value={subQ.text}
                                    onChange={(e) => updateSubQuestion(index, subQ.id, 'text', e.target.value)}
                                    placeholder={`Sub-question ${subIndex + 1}`}
                                    className="min-h-[60px]"
                                  />
                                  <Input
                                    type="number"
                                    value={subQ.marks}
                                    onChange={(e) => updateSubQuestion(index, subQ.id, 'marks', parseInt(e.target.value) || 1)}
                                    placeholder="Marks"
                                    className="w-20"
                                    min="1"
                                  />
                                </div>
                                <Button
                                  onClick={() => removeSubQuestion(index, subQ.id)}
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
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-medium">{index + 1}.</span>
                          {question.difficulty && (
                            <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-800 leading-relaxed mb-2">
                          {question.text}
                        </p>
                        
                        {editedConfig.type === 'mcq' && question.options && (
                          <div className="mt-2 ml-4">
                            {question.options.map((option: string, optIndex: number) => (
                              <div key={optIndex} className="mb-1">{option}</div>
                            ))}
                          </div>
                        )}
                        
                        {question.subQuestions && question.subQuestions.length > 0 && (
                          <div className="ml-6 mt-3 space-y-2">
                            {question.subQuestions.map((subQ, subIndex) => (
                              <div key={subQ.id} className="flex justify-between items-start">
                                <p className="text-slate-700">
                                  {String.fromCharCode(97 + subIndex)}. {subQ.text}
                                </p>
                                <span className="text-sm font-medium text-slate-600 ml-4">
                                  [{subQ.marks} Mark{subQ.marks !== 1 ? 's' : ''}]
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-sm text-slate-500 mt-2">
                          (From {question.unit})
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-slate-900">
                      [{question.subQuestions && question.subQuestions.length > 0 
                        ? question.subQuestions.reduce((total, sq) => total + sq.marks, 0)
                        : section.marksPerQuestion} Marks]
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 pt-4 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          Generated using AI Question Paper Generator • {editedConfig.university || "University"} Format
        </p>
      </div>
    </div>
  );
};

export default EditableQuestionPaper;
