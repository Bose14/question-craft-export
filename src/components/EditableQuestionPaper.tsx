import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { S3Upload } from "@/utils/S3Uploads";
import { TemplateRegistry } from "../Templatedata/QuestionPaperTemplates/TemplateRegistry";

interface SubQuestion {
  id: string;
  text: string;
  marks: number;
}

interface Question {
  id: string;
  text: string;
  options?: string[];
  marks: number;
  unit: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  subQuestions?: SubQuestion[];
}

interface EditableQuestionPaperProps {
  config: any;
  templateId: any;
  token: any;
  questions?: Question[];
  onSave: (updatedQuestions: Question[]) => void;
}

const EditableQuestionPaper = ({ templateId, config, token, questions = [], onSave }: EditableQuestionPaperProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedConfig, setEditedConfig] = useState(config);
  const TemplateComponent = TemplateRegistry[templateId] || TemplateRegistry[0];

  const handleSave = async () => {
    await onSave(config.sections?.flatMap((section: any) => section.questions) || []);
    await S3Upload(editedConfig, token, templateId);
    setIsEditing(false);
    toast.success("Question paper updated successfully!");
  };

  const handleCancel = () => {
    setEditedConfig(config);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date: ___________";
    const date = new Date(dateString);
    return `Date: ${date.toLocaleDateString()}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div id="question-paper-content" className="relative">
      <div className="flex justify-end mb-4 no-print">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Paper</Button>
        ) : (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        )}
      </div>
      <TemplateComponent editedConfig={editedConfig} />
    </div>
  );
};

export default EditableQuestionPaper;
