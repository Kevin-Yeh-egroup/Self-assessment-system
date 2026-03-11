'use client';

import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/store/inventoryStore';

export function StepIntro() {
  const { setCurrentStep } = useInventoryStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-white px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900">
            自我資源盤點
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            每個人其實都累積了很多能力與經驗，
            <br />
            只是有時候我們沒有機會好好整理。
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 space-y-6 border border-amber-100">
          <div className="space-y-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              <span className="block font-semibold text-amber-900 mb-2">
                這份盤點不是考試，
              </span>
              只是陪你回顧自己的經歷、能力與資源。
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              <span className="block font-semibold text-amber-900 mb-2">
                完成後，
              </span>
              系統會幫你整理出一份「能力與資源地圖」。
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <p className="text-center text-gray-600">
              <span className="font-semibold text-amber-900">填寫時間約 5–8 分鐘</span>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-amber-100 text-center">
            <div className="text-3xl mb-3">📝</div>
            <p className="text-sm text-gray-600">簡單問題</p>
            <p className="text-xs text-gray-500 mt-1">輕鬆作答</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-amber-100 text-center">
            <div className="text-3xl mb-3">🤖</div>
            <p className="text-sm text-gray-600">AI 分析</p>
            <p className="text-xs text-gray-500 mt-1">自動整理</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-amber-100 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <p className="text-sm text-gray-600">能力地圖</p>
            <p className="text-xs text-gray-500 mt-1">一目了然</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => setCurrentStep(1)}
          size="lg"
          className="w-full h-14 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-lg rounded-xl"
        >
          開始盤點
        </Button>
      </div>
    </div>
  );
}
