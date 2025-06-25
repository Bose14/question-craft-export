
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Edit, Save, X } from "lucide-react";
import { toast } from "sonner";

interface Question {
  text: string;
  options?: string[];
  marks: number;
  unit: string;
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date: ___________";
    const date = new Date(dateString);
    return `Date: ${date.toLocaleDateString()}`;
  };

  return (
    <div id="question-paper-content" className="relative">
      <div className="flex justify-end mb-4">
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
              <div key={index} className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1 w-full">
                  {isEditing ? (
                    <div className="space-y-3">
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
                    </div>
                  ) : (
                    <p className="text-slate-800 leading-relaxed">
                      {index + 1}. {question.text}{" "}
                      {editedConfig.type === 'mcq' && question.options && (
                        <div className="mt-2 ml-4">
                          {question.options.map((option: string, optIndex: number) => (
                            <div key={optIndex} className="mb-1">{option}</div>
                          ))}
                        </div>
                      )}
                      <span className="text-sm text-slate-500">
                        (From {question.unit})
                      </span>
                    </p>
                  )}
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
          Generated using AI Question Paper Generator • {editedConfig.university || "University"} Format
        </p>
      </div>
    </div>
  );
};

export default EditableQuestionPaper;
