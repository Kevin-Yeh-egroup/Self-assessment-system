'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const SUGGESTED_INTERESTS = [
  '照顧人',
  '與人聊天',
  '修理東西',
  '做手作',
  '料理',
  '藝術',
  '運動',
  '學習新事物',
  '教學',
  '組織活動',
  '設計',
  '寫作',
];

export function Step2Interests() {
  const {
    currentStep,
    interests,
    interestTags,
    setInterests,
    addInterestTag,
    removeInterestTag,
    setCurrentStep,
  } = useInventoryStore();

  const canProceed = interests.trim() && interestTags.length > 0;

  const handleAddTag = (tag: string) => {
    if (!interestTags.includes(tag)) {
      addInterestTag(tag);
    }
  };

  return (
    <div className="space-y-6">
      <StepHeader
        step={2}
        title="興趣"
        subtitle="哪些事情會讓你很有動力？"
      />

      <div className="space-y-6">
        {/* Textarea */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            我喜歡……
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：與朋友聊天、烹飪、運動..."
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
        </div>

        {/* Selected Tags */}
        {interestTags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-800">已選擇的興趣：</p>
            <div className="flex flex-wrap gap-2">
              {interestTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-amber-100 text-amber-900 hover:bg-amber-200 cursor-pointer pr-1 flex items-center gap-1 rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => removeInterestTag(tag)}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tag Suggestions */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-800">
            標籤建議（點擊新增）：
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SUGGESTED_INTERESTS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddTag(tag)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                  interestTags.includes(tag)
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'border-amber-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
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
