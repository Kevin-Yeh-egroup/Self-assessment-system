import { create } from 'zustand';

export interface WorkExperience {
  id: string;
  period: string;
  jobTitle: string;
  jobContent: string;
  duration: string;
}

export interface Training {
  id: string;
  period: string;
  courseName: string;
  institution: string;
  completionDate: string;
  hasCertificate: boolean;
}

export interface SupportPerson {
  id: string;
  name: string;
  relationship: string;
  unit?: string;
  canHelp: string;
  type: 'family' | 'work' | 'friend' | 'professional';
}

export interface InventoryState {
  currentStep: number;
  
  // Step 1: Personal Identity
  description: string;
  strengths: string;
  efforts: string;
  
  // Step 2: Interests
  interests: string;
  interestTags: string[];
  
  // Step 3: Experience
  lastSchool: string;
  workExperiences: WorkExperience[];
  workSkills: string;
  trainings: Training[];
  certificates: string;
  
  // Step 4: Life Story
  majorTurning: string;
  helpingPeople: string;
  affirmations: string;
  difficulties: string;
  
  // Step 5: Support Network
  supportPeople: SupportPerson[];
  
  // AI Analysis Results
  aiAnalysis: {
    personalTraits: string;
    interestsMotivation: string;
    workSkills: string;
    availableResources: string;
    supportSystem: string;
  };
  
  radarData: {
    label: string;
    value: number;
  }[];
  
  // Actions
  setCurrentStep: (step: number) => void;
  setDescription: (value: string) => void;
  setStrengths: (value: string) => void;
  setEfforts: (value: string) => void;
  setInterests: (value: string) => void;
  addInterestTag: (tag: string) => void;
  removeInterestTag: (tag: string) => void;
  setLastSchool: (value: string) => void;
  addWorkExperience: (exp: WorkExperience) => void;
  updateWorkExperience: (id: string, exp: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  setWorkSkills: (value: string) => void;
  addTraining: (training: Training) => void;
  removeTraining: (id: string) => void;
  setCertificates: (value: string) => void;
  setMajorTurning: (value: string) => void;
  setHelpingPeople: (value: string) => void;
  setAffirmations: (value: string) => void;
  setDifficulties: (value: string) => void;
  addSupportPerson: (person: SupportPerson) => void;
  removeSupportPerson: (id: string) => void;
  setAiAnalysis: (analysis: Partial<InventoryState['aiAnalysis']>) => void;
  setRadarData: (data: InventoryState['radarData']) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  description: '',
  strengths: '',
  efforts: '',
  interests: '',
  interestTags: [],
  lastSchool: '',
  workExperiences: [],
  workSkills: '',
  trainings: [],
  certificates: '',
  majorTurning: '',
  helpingPeople: '',
  affirmations: '',
  difficulties: '',
  supportPeople: [],
  aiAnalysis: {
    personalTraits: '',
    interestsMotivation: '',
    workSkills: '',
    availableResources: '',
    supportSystem: '',
  },
  radarData: [
    { label: '人際互動能力', value: 0 },
    { label: '照顧能力', value: 0 },
    { label: '學習能力', value: 0 },
    { label: '技術能力', value: 0 },
    { label: '工作經驗', value: 0 },
    { label: '問題解決能力', value: 0 },
  ],
};

export const useInventoryStore = create<InventoryState>((set) => ({
  ...initialState,
  
  setCurrentStep: (step: number) => set({ currentStep: step }),
  
  setDescription: (value: string) => set({ description: value }),
  setStrengths: (value: string) => set({ strengths: value }),
  setEfforts: (value: string) => set({ efforts: value }),
  
  setInterests: (value: string) => set({ interests: value }),
  addInterestTag: (tag: string) => set((state) => ({
    interestTags: [...state.interestTags, tag],
  })),
  removeInterestTag: (tag: string) => set((state) => ({
    interestTags: state.interestTags.filter((t) => t !== tag),
  })),
  
  setLastSchool: (value: string) => set({ lastSchool: value }),
  
  addWorkExperience: (exp: WorkExperience) => set((state) => ({
    workExperiences: [...state.workExperiences, exp],
  })),
  updateWorkExperience: (id: string, exp: Partial<WorkExperience>) => set((state) => ({
    workExperiences: state.workExperiences.map((item) =>
      item.id === id ? { ...item, ...exp } : item
    ),
  })),
  removeWorkExperience: (id: string) => set((state) => ({
    workExperiences: state.workExperiences.filter((item) => item.id !== id),
  })),
  
  setWorkSkills: (value: string) => set({ workSkills: value }),
  
  addTraining: (training: Training) => set((state) => ({
    trainings: [...state.trainings, training],
  })),
  removeTraining: (id: string) => set((state) => ({
    trainings: state.trainings.filter((item) => item.id !== id),
  })),
  
  setCertificates: (value: string) => set({ certificates: value }),
  
  setMajorTurning: (value: string) => set({ majorTurning: value }),
  setHelpingPeople: (value: string) => set({ helpingPeople: value }),
  setAffirmations: (value: string) => set({ affirmations: value }),
  setDifficulties: (value: string) => set({ difficulties: value }),
  
  addSupportPerson: (person: SupportPerson) => set((state) => ({
    supportPeople: [...state.supportPeople, person],
  })),
  removeSupportPerson: (id: string) => set((state) => ({
    supportPeople: state.supportPeople.filter((item) => item.id !== id),
  })),
  
  setAiAnalysis: (analysis: Partial<InventoryState['aiAnalysis']>) => set((state) => ({
    aiAnalysis: { ...state.aiAnalysis, ...analysis },
  })),
  
  setRadarData: (data: InventoryState['radarData']) => set({ radarData: data }),
  
  reset: () => set(initialState),
}));
