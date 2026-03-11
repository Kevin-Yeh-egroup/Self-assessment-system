'use client';

import { Progress } from '@/components/ui/progress';

interface StepHeaderProps {
  step: number;
  title: string;
  subtitle?: string;
}

export function StepHeader({ step, title, subtitle }: StepHeaderProps) {
  const progress = (step / 9) * 100;

  return (
    <div className="space-y-4">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-900">{title}</h2>
        <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-4 py-2 rounded-full">
          第 {step}/9 步
        </span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg">{subtitle}</p>
      )}

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2 rounded-full" />
        <p className="text-xs text-gray-500 text-right">{Math.round(progress)}% 完成</p>
      </div>
    </div>
  );
}
