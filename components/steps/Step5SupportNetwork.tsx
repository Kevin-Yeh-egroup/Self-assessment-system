'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useInventoryStore, SupportPerson } from '@/store/inventoryStore';
import { StepHeader } from './StepHeader';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

type SupportType = 'family' | 'work' | 'friend' | 'professional';

const SUPPORT_TYPES: { value: SupportType; label: string; color: string }[] = [
  { value: 'family', label: '親人', color: 'bg-red-50 border-red-200' },
  { value: 'work', label: '工作關係', color: 'bg-blue-50 border-blue-200' },
  { value: 'friend', label: '朋友', color: 'bg-green-50 border-green-200' },
  { value: 'professional', label: '專業支持', color: 'bg-purple-50 border-purple-200' },
];

export function Step5SupportNetwork() {
  const {
    currentStep,
    supportPeople,
    addSupportPerson,
    removeSupportPerson,
    setCurrentStep,
  } = useInventoryStore();

  const [formData, setFormData] = useState<Partial<SupportPerson>>({
    name: '',
    relationship: '',
    unit: '',
    canHelp: '',
    type: 'family',
  });

  const canProceed = supportPeople.length > 0;

  const handleAddPerson = () => {
    if (
      formData.name &&
      formData.relationship &&
      formData.canHelp &&
      formData.type
    ) {
      addSupportPerson({
        id: Date.now().toString(),
        name: formData.name,
        relationship: formData.relationship,
        unit: formData.unit || '',
        canHelp: formData.canHelp,
        type: formData.type as SupportType,
      });
      setFormData({
        name: '',
        relationship: '',
        unit: '',
        canHelp: '',
        type: 'family',
      });
    }
  };

  return (
    <div className="space-y-8">
      <StepHeader
        step={5}
        title="支持網絡"
        subtitle="如果遇到困難，有哪些人可能會幫助你？"
      />

      {/* Add Person Form */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800">新增支持者</h3>

        <div className="bg-amber-50 rounded-lg p-4 space-y-3 border border-amber-200">
          {/* Support Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              支持者類型
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SUPPORT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                    formData.type === type.value
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-amber-400'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <Input
            placeholder="姓名 *"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-lg"
          />

          {/* Relationship */}
          <Input
            placeholder="關係 (如：父親、經理、同學) *"
            value={formData.relationship || ''}
            onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
            className="rounded-lg"
          />

          {/* Unit */}
          <Input
            placeholder="單位/組織 (選填)"
            value={formData.unit || ''}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="rounded-lg"
          />

          {/* Can Help */}
          <Textarea
            placeholder="可以幫助我的事情 (如：情感支持、工作建議、經濟協助) *"
            value={formData.canHelp || ''}
            onChange={(e) => setFormData({ ...formData, canHelp: e.target.value })}
            className="min-h-16 resize-none rounded-lg"
          />

          <Button
            onClick={handleAddPerson}
            size="sm"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增支持者
          </Button>
        </div>
      </div>

      {/* Support Network List */}
      {supportPeople.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">
            我的支持網絡 ({supportPeople.length})
          </h3>

          {SUPPORT_TYPES.map((type) => {
            const people = supportPeople.filter((p) => p.type === type.value);
            if (people.length === 0) return null;

            return (
              <div key={type.value} className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">{type.label}</p>
                <div className="space-y-2">
                  {people.map((person) => (
                    <div
                      key={person.id}
                      className={`p-4 rounded-lg border-2 flex justify-between items-start ${type.color}`}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{person.name}</p>
                        <p className="text-sm text-gray-600">{person.relationship}</p>
                        {person.unit && (
                          <p className="text-xs text-gray-500 mt-1">{person.unit}</p>
                        )}
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                          {person.canHelp}
                        </p>
                      </div>
                      <button
                        onClick={() => removeSupportPerson(person.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

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
