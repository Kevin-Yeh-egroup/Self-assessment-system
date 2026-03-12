'use client';

import { useEffect } from 'react';
import { useInventoryStore } from '@/store/inventoryStore';
import { StepIntro } from './steps/StepIntro';
import { Step1Personal } from './steps/Step1Personal';
import { Step2Interests } from './steps/Step2Interests';
import { Step3Experience } from './steps/Step3Experience';
import { Step4LifeStory } from './steps/Step4LifeStory';
import { Step5SupportNetwork } from './steps/Step5SupportNetwork';
import { Step6AICapabilityMap } from './steps/Step6AICapabilityMap';
import { Step7CapabilityRadar } from './steps/Step7CapabilityRadar';
import { Step8SupportNetworkMap } from './steps/Step8SupportNetworkMap';
import { Step9DevelopmentSuggestions } from './steps/Step9DevelopmentSuggestions';
import { Step10SocialWorkerDiscussion } from './steps/Step10SocialWorkerDiscussion';

export function InventoryApp() {
  const { currentStep } = useInventoryStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      {currentStep > 0 && currentStep < 10 && (
        <div className="sticky top-0 z-40 border-b border-amber-200 bg-white/95 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-xl font-bold text-amber-900">
                AI 個案能力地圖系統
              </h1>
              <button
                onClick={() => console.log('Open menu')}
                className="text-gray-600 hover:text-gray-900"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col min-h-screen">
        {currentStep === 0 && <StepIntro />}

        {currentStep > 0 && currentStep < 10 && (
          <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
            {currentStep === 1 && <Step1Personal />}
            {currentStep === 2 && <Step2Interests />}
            {currentStep === 3 && <Step3Experience />}
            {currentStep === 4 && <Step4LifeStory />}
            {currentStep === 5 && <Step5SupportNetwork />}
            {currentStep === 6 && <Step6AICapabilityMap />}
            {currentStep === 7 && <Step7CapabilityRadar />}
            {currentStep === 8 && <Step8SupportNetworkMap />}
            {currentStep === 9 && <Step9DevelopmentSuggestions />}
          </div>
        )}

        {currentStep === 10 && (
          <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
            <Step10SocialWorkerDiscussion />
          </div>
        )}
      </main>

      {/* Footer */}
      {currentStep > 0 && (
        <footer className="border-t border-gray-200 bg-gray-50 py-4 text-center">
          <p className="text-xs text-gray-500">
            AI 個案能力地圖系統 • 財務健康版 v1.0
          </p>
        </footer>
      )}
    </div>
  );
}
