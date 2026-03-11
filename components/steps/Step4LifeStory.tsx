'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';

export function Step4LifeStory() {
  const {
    currentStep,
    majorTurning,
    helpingPeople,
    affirmations,
    difficulties,
    setMajorTurning,
    setHelpingPeople,
    setAffirmations,
    setDifficulties,
    setCurrentStep,
  } = useInventoryStore();

  const canProceed =
    majorTurning.trim() &&
    helpingPeople.trim() &&
    affirmations.trim() &&
    difficulties.trim();

  return (
    <div className="space-y-6">
      <StepHeader
        step={4}
        title="人生故事"
        subtitle="分享你的重要經歷"
      />

      <div className="space-y-6">
        {/* Major Turning Points */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            生活或工作的重要轉折
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：從事社工工作的轉機、重要的人生決定..."
            value={majorTurning}
            onChange={(e) => setMajorTurning(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
        </div>

        {/* People Who Helped */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            曾經幫助過我的人
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：父母、老師、朋友、導師..."
            value={helpingPeople}
            onChange={(e) => setHelpingPeople(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
        </div>

        {/* Affirmations */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            曾經被肯定的事情
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：工作表現、幫助他人的行為、個人成長..."
            value={affirmations}
            onChange={(e) => setAffirmations(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
        </div>

        {/* Difficulties */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            我遇過的困難
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：工作挑戰、個人困境、克服的障礙..."
            value={difficulties}
            onChange={(e) => setDifficulties(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
        </div>
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
