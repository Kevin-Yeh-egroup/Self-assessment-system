'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { MessageCircle, Download, RefreshCw } from 'lucide-react';
import { generateWordReport } from '@/lib/generateWordReport';

const DISCUSSION_PROMPTS = [
  {
    emoji: '🎯',
    question: '哪些能力是你希望繼續發展的？',
    description: '討論你的學習目標和發展方向',
  },
  {
    emoji: '🌱',
    question: '現在最想改善的事情是什麼？',
    description: '聚焦於最急迫的需求和挑戰',
  },
  {
    emoji: '🚀',
    question: '未來有沒有想嘗試的新方向？',
    description: '探索新機會和可能性',
  },
  {
    emoji: '💪',
    question: '你認為自己最大的優勢是什麼？',
    description: '確認和強化個人的獨特價值',
  },
];

export function Step10SocialWorkerDiscussion() {
  const store = useInventoryStore();
  const { currentStep, setCurrentStep, reset } = store;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateWordReport(store);
    } finally {
      setDownloading(false);
    }
  };

  const handleRestart = () => {
    reset();
    setCurrentStep(0);
  };

  return (
    <div className="space-y-8">
      <StepHeader
        step={10}
        title="與財務健康諮詢師一起討論"
        subtitle="完整的盤點已準備好，讓我們深入探討"
      />

      {/* Discussion Prompts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">討論重點</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DISCUSSION_PROMPTS.map((prompt, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{prompt.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{prompt.question}</p>
                  <p className="text-xs text-gray-600 mt-2">{prompt.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">盤點完成摘要</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>✓ 你已完成完整的自我資源盤點</p>
          <p>✓ AI 已根據你的回答生成了能力地圖和分析</p>
          <p>✓ 雷達圖和支持網絡圖展示了你的優勢和資源</p>
          <p>✓ 發展建議為你的下一步指明了方向</p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">後續建議</h3>
        <ul className="text-sm text-gray-700 space-y-3">
          <li className="flex gap-3">
            <span className="font-bold">1️⃣</span>
            <span>
              <strong>與財務健康諮詢師討論：</strong>
              使用上述問題作為討論起點，深入探討你的計畫
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">2️⃣</span>
            <span>
              <strong>制定行動計畫：</strong>
              根據盤點結果，制定具體可行的發展計畫
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">3️⃣</span>
            <span>
              <strong>定期檢視：</strong>
              每隔一段時間重新進行盤點，追蹤進度
            </span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 border-t border-gray-200 pt-6">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.98] active:from-amber-800 active:to-orange-800 disabled:opacity-60 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <Download className="w-5 h-5" />
          {downloading ? '產生中…' : '下載能力地圖（Word）'}
        </button>

        <a
          href="https://www.familyfinhealth.com/online-consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 active:bg-amber-100 active:scale-[0.98] active:border-amber-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          與財務健康諮詢師一起討論
        </a>

        <button
          onClick={handleRestart}
          className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-200 active:scale-[0.98] active:border-gray-400 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          重新修改資料
        </button>
      </div>

      {/* Completion Message */}
      <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-6 border-2 border-amber-300 text-center space-y-2">
        <p className="text-2xl">🎉</p>
        <h3 className="font-bold text-gray-800">盤點完成！</h3>
        <p className="text-sm text-gray-700">
          感謝你的耐心填寫。這份能力地圖將成為你與財務健康諮詢師討論和規劃的重要依據。
        </p>
      </div>
    </div>
  );
}
