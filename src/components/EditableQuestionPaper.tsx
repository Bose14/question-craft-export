// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { S3Upload } from "@/utils/S3Uploads";
// import { TemplateRegistry } from "../Templatedata/QuestionPaperTemplates/TemplateRegistry";

// interface SubQuestion {
//   id: string;
//   text: string;
//   marks: number;
// }

// interface Question {
//   id: string;
//   text: string;
//   options?: string[];
//   marks: number;
//   unit: string;
//   difficulty?: 'Easy' | 'Medium' | 'Hard';
//   subQuestions?: SubQuestion[];
// }

// interface EditableQuestionPaperProps {
//   config: any;
//   templateId: any;
//   token: any;
//   questions?: Question[];
//   onSave: (updatedQuestions: Question[]) => void;
// }

// const EditableQuestionPaper = ({ templateId, config, token, questions = [], onSave }: EditableQuestionPaperProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedConfig, setEditedConfig] = useState(config);
//   const TemplateComponent = TemplateRegistry[templateId] || TemplateRegistry[0];

//   const handleSave = async () => {
//     await onSave(config.sections?.flatMap((section: any) => section.questions) || []);
//     await S3Upload(editedConfig, token, templateId);
//     setIsEditing(false);
//     toast.success("Question paper updated successfully!");
//   };

//   const handleCancel = () => {
//     setEditedConfig(config);
//     setIsEditing(false);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "Date: ___________";
//     const date = new Date(dateString);
//     return `Date: ${date.toLocaleDateString()}`;
//   };

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'Easy': return 'text-green-600 bg-green-50';
//       case 'Medium': return 'text-yellow-600 bg-yellow-50';
//       case 'Hard': return 'text-red-600 bg-red-50';
//       default: return 'text-gray-600 bg-gray-50';
//     }
//   };

//   return (
//     <div id="question-paper-content" className="relative">
//       <div className="flex justify-end mb-4 no-print">
//         {!isEditing ? (
//           <Button onClick={() => setIsEditing(true)}>Edit Paper</Button>
//         ) : (
//           <>
//             <Button onClick={handleSave}>Save</Button>
//             <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//           </>
//         )}
//       </div>
//       <TemplateComponent editedConfig={editedConfig} />
//     </div>
//   );
// };

// export default EditableQuestionPaper;




// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { S3Upload } from "@/utils/S3Uploads";
import { TemplateRegistry } from "../Templatedata/QuestionPaperTemplates/TemplateRegistry";
// import { Edit, Plus, Save, Trash2, X } from "lucide-react";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
import { generatePDF } from "../utils/pdfGenerator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { S3Upload } from "@/utils/S3Uploads";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Interfaces (assuming they are defined as in your original code)
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

interface Section {
  id: string;
  name: string;
  questions: Question[];
}

interface EditableQuestionPaperProps {
  config: any;
  templateId: any;
  token: any;
  questions?: Question[];
  onSave: (updatedConfig: any) => void;
  onPdfGenerated;
}

const EditableQuestionPaper = ({ templateId, config, token, questions = [], onSave, onPdfGenerated }: EditableQuestionPaperProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedConfig, setEditedConfig] = useState(config);
  const TemplateComponent = TemplateRegistry[templateId] || TemplateRegistry[0];

  const handleConfigChange = (field: string, value: any) => {
    setEditedConfig((prev: any) => {
      // Clone config
      const updated = { ...prev, [field]: value };

      // Recalculate total marks whenever something changes
      let total = 0;
      updated.sections?.forEach((section: Section) => {
        section.questions?.forEach((question: Question) => {
          total += question.marks || 0;
          if (question.subQuestions?.length) {
            total += question.subQuestions.reduce(
              (sum, sq) => sum + (sq.marks || 0),
              0
            );
          }
        });
      });

      updated.totalMarks = total;
      return updated;
    });
  };

  const handleSectionChange = (sectionIndex: number, field: string, value: any) => {
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex][field] = value;
    setEditedConfig(newConfig);
  };

  const handleQuestionChange = (
    sectionIndex: number,
    qIndex: number,
    field: string,
    value: any
  ) => {
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex].questions[qIndex][field] = value;
    // setEditedConfig(newConfig);
    handleConfigChange("sections", editedConfig.sections);
  };

  const handleSubQuestionChange = (
    sectionIndex: number,
    qIndex: number,
    subQIndex: number,
    field: string,
    value: any
  ) => {
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex].questions[qIndex].subQuestions[subQIndex][field] = value;
    // setEditedConfig(newConfig);
    handleConfigChange("sections", editedConfig.sections);

  };

  const handleOptionChange = (
    sectionIndex: number,
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex].questions[qIndex].options[optIndex] = value;
    setEditedConfig(newConfig);
  };

  // --- ADD FUNCTIONS ---
  const addSection = () => {
    const newSection: Section = { id: uuidv4(), name: "New Section", questions: [] };
    setEditedConfig({ ...editedConfig, sections: [...editedConfig.sections, newSection] });
    handleConfigChange("totalMakrs", editedConfig)

  };

  const addQuestion = (sectionIndex: number) => {
    const newQuestion: Question = {
      id: uuidv4(),
      text: "New Question Text",
      marks: 5,
      unit: "Unit 1",
      subQuestions: [],
      options: editedConfig.type === "mcq" ? ["Option A", "Option B"] : [],
    };
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex].questions.push(newQuestion);
    setEditedConfig(newConfig);
    handleConfigChange("totalMakrs", editedConfig)

  };

  const addSubQuestion = (sectionIndex: number, qIndex: number) => {
    const newSubQuestion: SubQuestion = { id: uuidv4(), text: "New Sub-question", marks: 2 };
    const newConfig = { ...editedConfig };

    if (!newConfig.sections[sectionIndex].questions[qIndex].subQuestions) {
      newConfig.sections[sectionIndex].questions[qIndex].subQuestions = [];
    }

    newConfig.sections[sectionIndex].questions[qIndex].subQuestions.push(newSubQuestion);
    setEditedConfig(newConfig);
    handleConfigChange("totalMakrs", editedConfig)

  };

  const addOption = (sectionIndex: number, qIndex: number) => {
    const newConfig = { ...editedConfig };
    if (!newConfig.sections[sectionIndex].questions[qIndex].options) {
      newConfig.sections[sectionIndex].questions[qIndex].options = [];
    }
    newConfig.sections[sectionIndex].questions[qIndex].options.push("New Option");
    setEditedConfig(newConfig);
  };

  // --- DELETE FUNCTIONS ---
  const deleteSection = (sectionIndex: number) => {
    const newConfig = { ...editedConfig };
    newConfig.sections.splice(sectionIndex, 1);
    setEditedConfig(newConfig);
    handleConfigChange("totalMarks", editedConfig)
  };

  const deleteQuestion = (sectionIndex: number, qIndex: number) => {
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex].questions.splice(qIndex, 1);
    setEditedConfig(newConfig);
    handleConfigChange("totalMarks", editedConfig)
  };

  const deleteSubQuestion = (sectionIndex: number, qIndex: number, subQIndex: number) => {
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex].questions[qIndex].subQuestions.splice(subQIndex, 1);
    setEditedConfig(newConfig);
    handleConfigChange("totalMakrs", editedConfig)
  };

  const deleteOption = (sectionIndex: number, qIndex: number, optIndex: number) => {
    const newConfig = { ...editedConfig };
    newConfig.sections[sectionIndex].questions[qIndex].options.splice(optIndex, 1);
    setEditedConfig(newConfig);
  };

  // --- SAVE / CANCEL ---
  const handleSave = async () => {
    try {
      // Save latest edits locally
      onSave(editedConfig);

      // Switch temporarily to "view" mode so TemplateComponent renders
      setIsEditing(false);

      //Wait a moment for UI to update (important for correct capture)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // //Generate styled PDF blob
      const pdfBlob = await generatePDF("question-paper-content", "QuestionPaper.pdf");

      if (!pdfBlob) {
        toast.error("❌ Failed to generate styled PDF");
        return;
      }

      // 5️⃣ Upload the generated PDF blob to S3
      await S3Upload(editedConfig, token, templateId);

      // Notify parent with the generated PDF blob
      if (onPdfGenerated) {
        onPdfGenerated(pdfBlob);
      }

      toast.success("✅ Styled question paper uploaded successfully!");
    } catch (error) {
      console.error("❌ Error saving:", error);
      toast.error("Something went wrong while saving");
    }
  };

  const handleCancel = () => {
    setEditedConfig(config);
    setIsEditing(false);
  };

  // --- HELPER ---
  const formatDate = (dateString: string) => {
    if (!dateString) return "___________";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch (e) {
      return "Invalid Date";
    }
  };
  
  return (
    <div id="question-paper-content" className="relative p-4 md:p-8 bg-white shadow-lg rounded-md">
      {!isEditing ? (
        <div>
          <div className="flex justify-end mb-4 no-print">
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" /> Edit Paper
            </Button>
          </div>
          <TemplateComponent editedConfig={editedConfig} />
        </div>
      ) : (
        <div>
          {/* Save / Cancel */}
          <div className="flex justify-end mb-4 no-print gap-2">
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            {editedConfig.headerImage && (
              <img src={editedConfig.headerImage} alt="Header" className="max-h-24 mx-auto mb-4" />
            )}
            <div className="space-y-2 max-w-lg mx-auto">
              <Input
                value={editedConfig.university || ""}
                onChange={(e) => handleConfigChange("university", e.target.value)}
                className="text-center text-2xl font-bold"
              />
              <Input
                value={editedConfig.subjectName}
                onChange={(e) => handleConfigChange("subjectName", e.target.value)}
                className="text-center text-xl font-semibold"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm border-b-2 border-slate-900 pb-4 mt-4 gap-2">
              <Input
                type="date"
                value={formatDate(editedConfig.examDate)}
                onChange={(e) => handleConfigChange("examDate", e.target.value)}
                className="w-full sm:w-auto"
              />
              <Input
                placeholder="Duration"
                value={editedConfig.duration}
                onChange={(e) => handleConfigChange("duration", e.target.value)}
                className="w-full sm:w-auto text-center"
              />
              <Input
                type="number"
                placeholder="Total Marks"
                value={editedConfig.totalMarks}
                onChange={(e) => handleConfigChange("totalMarks", e.target.value)}
                className="w-full sm:w-auto text-right"
              />
            </div>
          </div>

          {/* Sections */}
          {editedConfig.sections?.map((section, sectionIndex: number) => (
            <div key={section.id} className="mb-8 p-4 border rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <Input
                  value={section.name}
                  onChange={(e) => handleSectionChange(sectionIndex, "name", e.target.value)}
                  className="text-lg font-semibold"
                />
                <Button variant="ghost" size="icon" onClick={() => deleteSection(sectionIndex)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              <div className="space-y-6">
                {section.questions?.map((question: Question, qIndex: number) => (
                  <div key={question.id} className="p-3 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <span className="font-medium pt-2">{qIndex + 1}.</span>
                          <Textarea
                            value={question.text}
                            onChange={(e) => handleQuestionChange(sectionIndex, qIndex, "text", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={question.marks}
                          onChange={(e) => handleQuestionChange(sectionIndex, qIndex, "marks", parseInt(e.target.value))}
                          className="w-20 text-right"
                        />
                        <Button variant="ghost" size="icon" onClick={() => deleteQuestion(sectionIndex, qIndex)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {/* Subquestions */}
                    {question.subQuestions?.map((subQ, subQIndex) => (
                      <div key={subQ.id} className="ml-8 mt-2 flex items-center gap-4">
                        <span>{String.fromCharCode(97 + subQIndex)}.</span>
                        <Input
                          value={subQ.text}
                          onChange={(e) => handleSubQuestionChange(sectionIndex, qIndex, subQIndex, "text", e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={subQ.marks}
                          onChange={(e) => handleSubQuestionChange(sectionIndex, qIndex, subQIndex, "marks", parseInt(e.target.value))}
                          className="w-20 text-right"
                        />
                        <Button variant="ghost" size="icon" onClick={() => deleteSubQuestion(sectionIndex, qIndex, subQIndex)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}

                    <Button className="mt-2 ml-8" variant="outline" size="sm" onClick={() => addSubQuestion(sectionIndex, qIndex)}>
                      <Plus className="w-4 h-4 mr-2" /> Add Sub-question
                    </Button>

                  </div>
                ))}

                <Button className="mt-4" variant="secondary" onClick={() => addQuestion(sectionIndex)}>
                  <Plus className="w-4 h-4 mr-2" /> Add Question
                </Button>
              </div>
            </div>
          ))}

          <Button className="mt-4 w-full" variant="outline" onClick={addSection}>
            <Plus className="w-4 h-4 mr-2" /> Add New Section
          </Button>
        </div>
      )}
    </div>
  );
};

// UUID helper
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default EditableQuestionPaper;
