'use client';

import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';

export function Step8SupportNetworkMap() {
  const { currentStep, supportPeople, setCurrentStep } = useInventoryStore();

  // Count support types
  const typeCounts = {
    family: supportPeople.filter((p) => p.type === 'family').length,
    work: supportPeople.filter((p) => p.type === 'work').length,
    friend: supportPeople.filter((p) => p.type === 'friend').length,
    professional: supportPeople.filter((p) => p.type === 'professional').length,
  };

  return (
    <div className="space-y-8">
      <StepHeader
        step={8}
        title="支持系統地圖"
        subtitle="你的支持網絡概覽"
      />

      {/* Network Visualization (SVG) */}
      <div className="bg-white rounded-lg p-8 border border-amber-200 shadow-md">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          {/* Center circle - "你" */}
          <circle cx="200" cy="200" r="30" fill="#d97706" className="drop-shadow" />
          <text
            x="200"
            y="210"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="white"
          >
            你
          </text>

          {/* Support type nodes */}
          {/* Family (top-left) */}
          {typeCounts.family > 0 && (
            <>
              <line x1="200" y1="200" x2="100" y2="100" stroke="#d97706" strokeWidth="2" />
              <circle cx="100" cy="100" r="25" fill="#fecaca" />
              <text x="100" y="105" textAnchor="middle" fontSize="12" fontWeight="bold">
                親人
              </text>
              <text x="100" y="120" textAnchor="middle" fontSize="10" fill="#666">
                {typeCounts.family}
              </text>
            </>
          )}

          {/* Friends (top-right) */}
          {typeCounts.friend > 0 && (
            <>
              <line x1="200" y1="200" x2="300" y2="100" stroke="#d97706" strokeWidth="2" />
              <circle cx="300" cy="100" r="25" fill="#bbf7d0" />
              <text x="300" y="105" textAnchor="middle" fontSize="12" fontWeight="bold">
                朋友
              </text>
              <text x="300" y="120" textAnchor="middle" fontSize="10" fill="#666">
                {typeCounts.friend}
              </text>
            </>
          )}

          {/* Work (bottom-right) */}
          {typeCounts.work > 0 && (
            <>
              <line x1="200" y1="200" x2="300" y2="300" stroke="#d97706" strokeWidth="2" />
              <circle cx="300" cy="300" r="25" fill="#bfdbfe" />
              <text x="300" y="305" textAnchor="middle" fontSize="12" fontWeight="bold">
                工作
              </text>
              <text x="300" y="320" textAnchor="middle" fontSize="10" fill="#666">
                {typeCounts.work}
              </text>
            </>
          )}

          {/* Professional (bottom-left) */}
          {typeCounts.professional > 0 && (
            <>
              <line x1="200" y1="200" x2="100" y2="300" stroke="#d97706" strokeWidth="2" />
              <circle cx="100" cy="300" r="25" fill="#e9d5ff" />
              <text x="100" y="305" textAnchor="middle" fontSize="12" fontWeight="bold">
                專業
              </text>
              <text x="100" y="320" textAnchor="middle" fontSize="10" fill="#666">
                {typeCounts.professional}
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Detailed Support Network */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">完整支持網絡列表</h3>

        {/* Family */}
        {typeCounts.family > 0 && (
          <div className="space-y-2">
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-red-300"></span>
              親人 ({typeCounts.family})
            </p>
            <div className="space-y-2 ml-4">
              {supportPeople
                .filter((p) => p.type === 'family')
                .map((person) => (
                  <div key={person.id} className="text-sm text-gray-700">
                    <p className="font-medium">{person.name} - {person.relationship}</p>
                    <p className="text-xs text-gray-600">{person.canHelp}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Friends */}
        {typeCounts.friend > 0 && (
          <div className="space-y-2">
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-green-300"></span>
              朋友 ({typeCounts.friend})
            </p>
            <div className="space-y-2 ml-4">
              {supportPeople
                .filter((p) => p.type === 'friend')
                .map((person) => (
                  <div key={person.id} className="text-sm text-gray-700">
                    <p className="font-medium">{person.name} - {person.relationship}</p>
                    <p className="text-xs text-gray-600">{person.canHelp}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Work */}
        {typeCounts.work > 0 && (
          <div className="space-y-2">
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-blue-300"></span>
              工作關係 ({typeCounts.work})
            </p>
            <div className="space-y-2 ml-4">
              {supportPeople
                .filter((p) => p.type === 'work')
                .map((person) => (
                  <div key={person.id} className="text-sm text-gray-700">
                    <p className="font-medium">
                      {person.name} - {person.relationship}
                      {person.unit && ` (${person.unit})`}
                    </p>
                    <p className="text-xs text-gray-600">{person.canHelp}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Professional */}
        {typeCounts.professional > 0 && (
          <div className="space-y-2">
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-purple-300"></span>
              專業支持 ({typeCounts.professional})
            </p>
            <div className="space-y-2 ml-4">
              {supportPeople
                .filter((p) => p.type === 'professional')
                .map((person) => (
                  <div key={person.id} className="text-sm text-gray-700">
                    <p className="font-medium">
                      {person.name} - {person.relationship}
                      {person.unit && ` (${person.unit})`}
                    </p>
                    <p className="text-xs text-gray-600">{person.canHelp}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 space-y-3">
        <h3 className="font-semibold text-gray-800">讀圖說明</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          這張圖呈現了你目前的支持網絡，有時候困難不只是靠自己，
          <br />
          人際支持也是重要資源。
        </p>
        <p className="text-xs text-gray-600">
          一個多層次的支持網絡有助於你在面臨挑戰時獲得必要的幫助。
        </p>
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
          查看發展建議
        </Button>
      </div>
    </div>
  );
}
