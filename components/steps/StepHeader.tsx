'use client';

import { Progress } from '@/components/ui/progress';

const TOTAL_FILL_STEPS = 5;

interface StepHeaderProps {
  step: number;
  title: string;
  subtitle?: string;
}

export function StepHeader({ step, title, subtitle }: StepHeaderProps) {
  const isResultStep = step > TOTAL_FILL_STEPS;
  const progress = isResultStep ? 100 : (step / TOTAL_FILL_STEPS) * 100;

  return (
    <div className="space-y-4">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-900">{title}</h2>
        {isResultStep ? (
          <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded-full">
            結果總覽
          </span>
        ) : (
          <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-4 py-2 rounded-full">
            第 {step}/{TOTAL_FILL_STEPS} 步
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg">{subtitle}</p>
      )}

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2 rounded-full" />
        {isResultStep ? (
          <p className="text-xs text-gray-500 text-right">填答已完成，以下為分析結果</p>
        ) : (
          <p className="text-xs text-gray-500 text-right">{Math.round(progress)}% 完成</p>
        )}
      </div>
    </div>
  );
}
