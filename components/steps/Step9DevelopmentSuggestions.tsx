'use client';

import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { Lightbulb, TrendingUp, Zap } from 'lucide-react';

export function Step9DevelopmentSuggestions() {
  const {
    currentStep,
    interestTags,
    workSkills,
    radarData,
    setCurrentStep,
  } = useInventoryStore();

  // Generate development suggestions based on data
  const getTopSkills = () => {
    const sorted = [...radarData].sort((a, b) => b.value - a.value);
    return sorted.slice(0, 3).map((item) => item.label);
  };

  const getWeakAreas = () => {
    const sorted = [...radarData].sort((a, b) => a.value - b.value);
    return sorted.slice(0, 2).map((item) => item.label);
  };

  return (
    <div className="space-y-8">
      <StepHeader
        step={9}
        title="可能的發展方向"
        subtitle="AI 根據你的能力和興趣提出的建議"
      />

      {/* Possible Job Directions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          可能適合的工作方向
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '人服務相關工作',
              desc: interestTags.includes('照顧人')
                ? '根據你對照顧人的興趣，社區服務、照顧服務等角色適合你。'
                : '你的人際能力和工作經驗適合需要與人互動的職位。',
            },
            {
              title: '協作與領導角色',
              desc: '你的支持網絡穩定，具備與他人協作的基礎，可考慮需要協調的職務。',
            },
            {
              title: '學習與發展角色',
              desc: interestTags.includes('學習新事物')
                ? '你對學習的熱情使你適合需要持續成長的職位。'
                : '你可探索涉及教學或培訓的角色。',
            },
            {
              title: '創意與實踐角色',
              desc: interestTags.includes('做手作')
                ? '你的動手能力和創意特質適合需要創新的職位。'
                : '你可嘗試需要創新思維的工作。',
            },
          ].map((job, idx) => (
            <div
              key={idx}
              className="bg-amber-50 rounded-lg p-4 border border-amber-200"
            >
              <h4 className="font-semibold text-gray-800 mb-2">{job.title}</h4>
              <p className="text-sm text-gray-700">{job.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills to Develop */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-600" />
          可能可以培養的能力
        </h3>
        <div className="space-y-3">
          {getWeakAreas().map((area, idx) => (
            <div key={idx} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-1">{area}</h4>
              <p className="text-sm text-gray-700 mb-3">
                這是一個可以進一步發展的領域，投入時間學習將有顯著回報。
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• 建議：參加相關課程或工作坊</p>
                <p>• 實踐：在日常工作中有意識地練習</p>
                <p>• 反思：定期評估進度</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources & Connections */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600" />
          可以連結的資源
        </h3>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <ul className="text-sm text-gray-700 space-y-3">
            <li className="flex gap-2">
              <span className="font-bold">📚</span>
              <span>
                <strong>學習資源：</strong>
                善用你的支持網絡，向有相關經驗的人學習
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">🤝</span>
              <span>
                <strong>人脈連結：</strong>
                你的工作和友誼網絡是寶貴的資源，主動尋求建議和機會
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">🎯</span>
              <span>
                <strong>專業發展：</strong>
                考慮參加與你興趣相關的工作坊或認證課程
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">💡</span>
              <span>
                <strong>創新嘗試：</strong>
                在安全的環境中嘗試新的挑戰，學習新技能
              </span>
            </li>
          </ul>
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
          className="flex-1 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
        >
          與財務健康諮詢師一起討論
        </Button>
      </div>
    </div>
  );
}
