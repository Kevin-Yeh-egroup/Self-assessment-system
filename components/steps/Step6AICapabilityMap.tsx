'use client';

import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const ANALYSIS_SECTIONS = [
  {
    key: 'personalTraits',
    title: '個人特質',
    icon: '✨',
  },
  {
    key: 'interestsMotivation',
    title: '興趣與動機',
    icon: '🎯',
  },
  {
    key: 'workSkills',
    title: '工作能力',
    icon: '💼',
  },
  {
    key: 'availableResources',
    title: '可用資源',
    icon: '🛠️',
  },
  {
    key: 'supportSystem',
    title: '支持系統',
    icon: '🤝',
  },
];

export function Step6AICapabilityMap() {
  const {
    currentStep,
    description,
    strengths,
    efforts,
    interestTags,
    workExperiences,
    workSkills,
    supportPeople,
    aiAnalysis,
    setAiAnalysis,
    setRadarData,
    setCurrentStep,
  } = useInventoryStore();

  // Generate AI analysis based on user input
  useEffect(() => {
    // Mock AI analysis generation
    const analysis = {
      personalTraits: `根據你的描述，你是${strengths ? '具有' + strengths.split('\n')[0] : '一個'}的人。${efforts ? '同時，你正在努力改進' + efforts.split('\n')[0] + '。' : ''}這些特質為你的發展奠定了堅實基礎。`,
      interestsMotivation: `你對${interestTags.slice(0, 2).join('、')}${interestTags.length > 2 ? '等事務' : ''}很感興趣。這些興趣反映了你的核心價值觀，也是你能持續投入的領域。`,
      workSkills: `通過${workExperiences.length}份工作經歷，你已經累積了豐富的實務經驗。你掌握的${workSkills ? workSkills.split('\n')[0] : '專業技能'}將成為你未來發展的基石。`,
      availableResources: `你擁有多元的資源網絡，包括家庭、工作和友誼。這些資源是你面對挑戰時的強大後盾。`,
      supportSystem: `你的支持系統包括${supportPeople.length}位關鍵支持者，涵蓋${Array.from(new Set(supportPeople.map(p => {
        if (p.type === 'family') return '家庭';
        if (p.type === 'work') return '工作';
        if (p.type === 'friend') return '友誼';
        return '專業';
      }))).join('、')}等面向。這種多層次的支持有助於你全面發展。`,
    };

    setAiAnalysis(analysis);

    // Generate mock radar data
    const radarData = [
      { label: '人際互動能力', value: interestTags.includes('與人聊天') ? 8 : 6 },
      { label: '照顧能力', value: interestTags.includes('照顧人') ? 8 : 5 },
      { label: '學習能力', value: interestTags.includes('學習新事物') ? 8 : 6 },
      { label: '技術能力', value: interestTags.includes('修理東西') ? 7 : 5 },
      { label: '工作經驗', value: Math.min(8, Math.round(workExperiences.length * 2)) },
      { label: '問題解決能力', value: 6 },
    ];

    setRadarData(radarData);
  }, [description, strengths, efforts, interestTags, workExperiences, workSkills, supportPeople, setAiAnalysis, setRadarData]);

  return (
    <div className="space-y-8">
      <StepHeader
        step={6}
        title="你的能力與資源地圖"
        subtitle="AI 根據你的回答為你整理的分析"
      />

      {/* Analysis Cards */}
      <div className="space-y-4">
        {ANALYSIS_SECTIONS.map((section) => (
          <div
            key={section.key}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{section.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {aiAnalysis[section.key as keyof typeof aiAnalysis]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">核心洞察</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ 你具有多元的能力背景，適合需要綜合素質的職位</li>
              <li>✓ 你的支持網絡穩定，有助於你穩健發展</li>
              <li>✓ 持續投資於感興趣的領域將帶來最大收益</li>
            </ul>
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
          className="flex-1 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
        >
          查看能力雷達圖
        </Button>
      </div>
    </div>
  );
}
