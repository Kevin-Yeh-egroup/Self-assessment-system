'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, Plus } from 'lucide-react';

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

// 用於從自由文字中偵測可能興趣的關鍵字對應表
const KEYWORD_MAP: { keywords: string[]; tag: string }[] = [
  { keywords: ['聊天', '聊', '交友', '社交', '朋友', '人際'], tag: '與人聊天' },
  { keywords: ['照顧', '陪伴', '關心', '看護', '照料'], tag: '照顧人' },
  { keywords: ['修理', '修繕', '維修', '組裝', '拆', '修'], tag: '修理東西' },
  { keywords: ['手作', '手工', '編織', '縫紉', 'DIY', '紙工', '黏土'], tag: '做手作' },
  { keywords: ['料理', '烹飪', '煮飯', '做菜', '烘焙', '廚房', '食物'], tag: '料理' },
  { keywords: ['畫畫', '繪畫', '藝術', '插畫', '素描', '水彩', '雕塑'], tag: '藝術' },
  { keywords: ['運動', '健身', '跑步', '游泳', '球類', '瑜珈', '登山', '騎車'], tag: '運動' },
  { keywords: ['學習', '閱讀', '讀書', '進修', '研究', '探索', '了解'], tag: '學習新事物' },
  { keywords: ['教學', '教導', '指導', '分享知識', '教人', '輔導'], tag: '教學' },
  { keywords: ['辦活動', '組織', '規劃', '籌備', '協調', '活動'], tag: '組織活動' },
  { keywords: ['設計', '排版', '視覺', '美感', 'UI', '平面'], tag: '設計' },
  { keywords: ['寫作', '寫文章', '創作', '寫字', '日記', '部落格'], tag: '寫作' },
];

function detectTagsFromText(text: string): string[] {
  const detected: string[] = [];
  const lower = text.toLowerCase();
  for (const { keywords, tag } of KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      detected.push(tag);
    }
  }
  return detected;
}

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

  const [customInput, setCustomInput] = useState('');
  const [aiDetected, setAiDetected] = useState<string[]>([]);
  const [hasDetected, setHasDetected] = useState(false);

  const canProceed = interests.trim() && interestTags.length > 0;

  const handleAddTag = (tag: string) => {
    if (!interestTags.includes(tag)) {
      addInterestTag(tag);
    }
  };

  const handleAddCustomTag = () => {
    const trimmed = customInput.trim();
    if (trimmed && !interestTags.includes(trimmed)) {
      addInterestTag(trimmed);
    }
    setCustomInput('');
  };

  const handleDetectFromText = () => {
    const detected = detectTagsFromText(interests);
    setAiDetected(detected);
    setHasDetected(true);
    detected.forEach((tag) => {
      if (!interestTags.includes(tag)) {
        addInterestTag(tag);
      }
    });
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
            placeholder="用自己的話描述就好，例如：我喜歡和鄰居聊天、烹飪給家人吃、在公園慢跑..."
            value={interests}
            onChange={(e) => {
              setInterests(e.target.value);
              setHasDetected(false);
            }}
            className="min-h-28 resize-none rounded-lg border-amber-200 bg-white focus:ring-amber-400"
          />
          {/* AI Detection Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!interests.trim()}
            onClick={handleDetectFromText}
            className="flex items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50 disabled:opacity-40"
          >
            <Sparkles className="w-4 h-4" />
            從我的描述辨識興趣標籤
          </Button>
          {hasDetected && (
            <p className="text-xs text-amber-600">
              {aiDetected.length > 0
                ? `已辨識到 ${aiDetected.length} 個興趣並加入下方標籤，可繼續自行調整。`
                : '未辨識到明確的興趣關鍵字，請試試從下方勾選或自行輸入標籤。'}
            </p>
          )}
        </div>

        {/* Selected Tags */}
        {interestTags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-800">
              已加入的興趣標籤：
            </p>
            <div className="flex flex-wrap gap-2">
              {interestTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-amber-100 text-amber-900 hover:bg-amber-200 pr-1 flex items-center gap-1 rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => removeInterestTag(tag)}
                    className="ml-1 hover:opacity-70"
                    aria-label={`移除 ${tag}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Preset Tag Suggestions */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-800">
            常見興趣參考（可勾選）：
          </p>
          <p className="text-xs text-gray-500">點選符合你的選項，點一次加入、再點一次取消</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SUGGESTED_INTERESTS.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  interestTags.includes(tag)
                    ? removeInterestTag(tag)
                    : handleAddTag(tag)
                }
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                  interestTags.includes(tag)
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'border-amber-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {interestTags.includes(tag) ? '✓ ' : ''}{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Tag Input */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-800">自行輸入興趣標籤：</p>
          <p className="text-xs text-gray-500">如果上方沒有符合的選項，可以直接輸入你的興趣</p>
          <div className="flex gap-2">
            <Input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomTag();
                }
              }}
              placeholder="例如：攝影、旅遊、養植物…"
              className="rounded-lg border-amber-200 focus:ring-amber-400"
            />
            <Button
              type="button"
              onClick={handleAddCustomTag}
              disabled={!customInput.trim()}
              className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white rounded-lg disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
              新增
            </Button>
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
