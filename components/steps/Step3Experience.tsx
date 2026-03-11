'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useInventoryStore, WorkExperience, Training } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function Step3Experience() {
  const {
    currentStep,
    lastSchool,
    workExperiences,
    workSkills,
    trainings,
    certificates,
    setLastSchool,
    addWorkExperience,
    removeWorkExperience,
    setWorkSkills,
    addTraining,
    removeTraining,
    setCertificates,
    setCurrentStep,
  } = useInventoryStore();

  // Work form state
  const [workForm, setWorkForm] = useState<Partial<WorkExperience>>({
    period: '',
    jobTitle: '',
    jobContent: '',
    duration: '',
  });

  // Training form state
  const [trainingForm, setTrainingForm] = useState<Partial<Training>>({
    period: '',
    courseName: '',
    institution: '',
    completionDate: '',
    hasCertificate: false,
  });

  const canProceed =
    lastSchool.trim() &&
    workExperiences.length > 0 &&
    workSkills.trim() &&
    certificates.trim();

  const handleAddWork = () => {
    if (workForm.period && workForm.jobTitle && workForm.jobContent && workForm.duration) {
      addWorkExperience({
        id: Date.now().toString(),
        period: workForm.period,
        jobTitle: workForm.jobTitle,
        jobContent: workForm.jobContent,
        duration: workForm.duration,
      });
      setWorkForm({ period: '', jobTitle: '', jobContent: '', duration: '' });
    }
  };

  const handleAddTraining = () => {
    if (trainingForm.period && trainingForm.courseName && trainingForm.institution) {
      addTraining({
        id: Date.now().toString(),
        period: trainingForm.period,
        courseName: trainingForm.courseName,
        institution: trainingForm.institution,
        completionDate: trainingForm.completionDate || '',
        hasCertificate: trainingForm.hasCertificate || false,
      });
      setTrainingForm({
        period: '',
        courseName: '',
        institution: '',
        completionDate: '',
        hasCertificate: false,
      });
    }
  };

  return (
    <div className="space-y-8">
      <StepHeader step={3} title="經歷" subtitle="學歷、工作與專業發展" />

      {/* Last School */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-800">
          我最後念的學校
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Input
          placeholder="例如：國立台灣大學社會工作系"
          value={lastSchool}
          onChange={(e) => setLastSchool(e.target.value)}
          className="rounded-lg border-amber-200 bg-white focus:ring-amber-400"
        />
      </div>

      {/* Work Experiences */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800">工作經歷</h3>

        {/* Work Entry Form */}
        <div className="bg-amber-50 rounded-lg p-4 space-y-3 border border-amber-200">
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="時間"
              value={workForm.period || ''}
              onChange={(e) => setWorkForm({ ...workForm, period: e.target.value })}
              className="rounded-lg"
            />
            <Input
              placeholder="工作名稱"
              value={workForm.jobTitle || ''}
              onChange={(e) => setWorkForm({ ...workForm, jobTitle: e.target.value })}
              className="rounded-lg"
            />
          </div>
          <Textarea
            placeholder="工作內容"
            value={workForm.jobContent || ''}
            onChange={(e) => setWorkForm({ ...workForm, jobContent: e.target.value })}
            className="min-h-16 resize-none rounded-lg"
          />
          <Input
            placeholder="做多久"
            value={workForm.duration || ''}
            onChange={(e) => setWorkForm({ ...workForm, duration: e.target.value })}
            className="rounded-lg"
          />
          <Button
            onClick={handleAddWork}
            size="sm"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增工作經歷
          </Button>
        </div>

        {/* Work List */}
        {workExperiences.length > 0 && (
          <div className="space-y-2">
            {workExperiences.map((work) => (
              <div
                key={work.id}
                className="bg-white p-4 rounded-lg border border-amber-100 flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{work.jobTitle}</p>
                  <p className="text-sm text-gray-600">{work.period}</p>
                  <p className="text-sm text-gray-600 mt-1">{work.jobContent}</p>
                  <p className="text-xs text-gray-500 mt-1">時長：{work.duration}</p>
                </div>
                <button
                  onClick={() => removeWorkExperience(work.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Work Skills */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-800">
          過去的工作讓我學到哪些能力
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Textarea
          placeholder="例如：溝通、照顧人、銷售、整理資料、技術操作、團隊合作..."
          value={workSkills}
          onChange={(e) => setWorkSkills(e.target.value)}
          className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
        />
      </div>

      {/* Trainings */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800">專業訓練</h3>

        {/* Training Entry Form */}
        <div className="bg-amber-50 rounded-lg p-4 space-y-3 border border-amber-200">
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="時間"
              value={trainingForm.period || ''}
              onChange={(e) => setTrainingForm({ ...trainingForm, period: e.target.value })}
              className="rounded-lg"
            />
            <Input
              placeholder="課程名稱"
              value={trainingForm.courseName || ''}
              onChange={(e) => setTrainingForm({ ...trainingForm, courseName: e.target.value })}
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="訓練機構"
              value={trainingForm.institution || ''}
              onChange={(e) => setTrainingForm({ ...trainingForm, institution: e.target.value })}
              className="rounded-lg"
            />
            <Input
              placeholder="結訓時間"
              value={trainingForm.completionDate || ''}
              onChange={(e) => setTrainingForm({ ...trainingForm, completionDate: e.target.value })}
              className="rounded-lg"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={trainingForm.hasCertificate || false}
              onChange={(e) =>
                setTrainingForm({ ...trainingForm, hasCertificate: e.target.checked })
              }
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-700">有證明文件</span>
          </label>
          <Button
            onClick={handleAddTraining}
            size="sm"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增訓練
          </Button>
        </div>

        {/* Training List */}
        {trainings.length > 0 && (
          <div className="space-y-2">
            {trainings.map((training) => (
              <div
                key={training.id}
                className="bg-white p-4 rounded-lg border border-amber-100 flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{training.courseName}</p>
                  <p className="text-sm text-gray-600">{training.institution}</p>
                  <p className="text-xs text-gray-500 mt-1">{training.period}</p>
                  {training.hasCertificate && (
                    <p className="text-xs text-green-600 mt-1">✓ 有證明文件</p>
                  )}
                </div>
                <button
                  onClick={() => removeTraining(training.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificates */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-800">
          我擁有的證照
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Textarea
          placeholder="例如：照顧服務員證、CPR 認證..."
          value={certificates}
          onChange={(e) => setCertificates(e.target.value)}
          className="min-h-20 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          variant="outline"
          className="flex-1 h-12 rounded-lg"
        >
          上一步
        </Button>
        <Button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!canProceed}
          className="flex-1 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-lg disabled:opacity-50"
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
