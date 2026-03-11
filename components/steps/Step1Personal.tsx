'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';

export function Step1Personal() {
  const {
    currentStep,
    description,
    strengths,
    efforts,
    setDescription,
    setStrengths,
    setEfforts,
    setCurrentStep,
  } = useInventoryStore();

  const canProceed = description.trim() && strengths.trim() && efforts.trim();

  return (
    <div className="space-y-6">
      <StepHeader step={1} title="認識自己" subtitle="我是怎樣的人" />

      <div className="space-y-6">
        {/* Field 1: 我是個... */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            我是個……
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：負責任的人、喜歡幫助他人、充滿好奇心..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
          <p className="text-xs text-gray-500">{description.length}/500</p>
        </div>

        {/* Field 2: 我的優點 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            我的優點
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：耐心、溝通能力強、解決問題的能力..."
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
          <p className="text-xs text-gray-500">{strengths.length}/500</p>
        </div>

        {/* Field 3: 我仍在努力的地方 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            我仍在努力的地方
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="例如：時間管理、表達想法、處理壓力..."
            value={efforts}
            onChange={(e) => setEfforts(e.target.value)}
            className="min-h-24 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
          <p className="text-xs text-gray-500">{efforts.length}/500</p>
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
