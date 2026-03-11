'use client';

import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function Step7CapabilityRadar() {
  const { currentStep, radarData, setCurrentStep } = useInventoryStore();

  // Prepare data for radar chart
  const chartData = radarData.map((item) => ({
    name: item.label,
    value: item.value,
    fullMark: 10,
  }));

  return (
    <div className="space-y-8">
      <StepHeader
        step={7}
        title="能力概況"
        subtitle="你的能力分布雷達圖"
      />

      {/* Radar Chart */}
      <div className="bg-white rounded-lg p-6 border border-amber-200 shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <PolarGrid
              stroke="rgba(217, 119, 6, 0.2)"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              angle={90}
              orientation="outer"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <Radar
              name="能力評估"
              dataKey="value"
              stroke="#d97706"
              fill="rgba(217, 119, 6, 0.3)"
              fillOpacity={0.6}
              dot={{ fill: '#d97706', r: 4 }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value) => [`${value} / 10`, '能力等級']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Explanation */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 space-y-3">
        <h3 className="font-semibold text-gray-800">讀圖說明</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          這個圖表是根據你的回答，整理出目前可能的能力分布。
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          它不是評分，只是幫助我們了解你的經驗與優勢。
        </p>
        <div className="space-y-2 mt-4">
          <p className="text-sm font-semibold text-gray-800">能力維度說明：</p>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• <span className="font-medium">人際互動能力</span>：與他人溝通、協作的能力</li>
            <li>• <span className="font-medium">照顧能力</span>：照顧他人、提供支持的能力</li>
            <li>• <span className="font-medium">學習能力</span>：快速學習新知識、新技能的能力</li>
            <li>• <span className="font-medium">技術能力</span>：運用工具、技術的能力</li>
            <li>• <span className="font-medium">工作經驗</span>：累積的實務工作經驗</li>
            <li>• <span className="font-medium">問題解決能力</span>：面對挑戰、解決問題的能力</li>
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
          查看支持系統圖
        </Button>
      </div>
    </div>
  );
}
