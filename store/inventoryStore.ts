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
  loadTemplate: () => void;
}

const templateData = {
  currentStep: 1,

  // Step 1
  description: '我是個熱心、有耐心的人，喜歡與人相處，常常會主動關心身邊的朋友和家人。我做事認真負責，不喜歡半途而廢，對交代的事情都會盡力完成。',
  strengths: '溝通能力強，能夠傾聽別人的需求；有耐心，面對困難的情況不容易放棄；動手能力不錯，學新東西很快；有責任心，交辦的工作都會完成。',
  efforts: '目前還在練習如何更有條理地管理時間，有時候事情多了會覺得手忙腳亂。也希望能加強電腦文書處理的能力，讓自己的工作效率更好。',

  // Step 2
  interests: '我最喜歡料理和烘焙，假日會在家嘗試新食譜，也喜歡把成品分享給朋友。另外我也很喜歡照顧植物，家裡養了不少盆栽，覺得看著植物慢慢長大很療癒。偶爾也會去健行，喜歡大自然的環境。',
  interestTags: ['照顧人', '料理', '種植'],

  // Step 3
  lastSchool: '高雄市立○○高中（職業學校 家政科）',
  workExperiences: [
    {
      id: 'tmpl-w1',
      period: '2018–2022',
      jobTitle: '居家照服員',
      jobContent: '協助獨居長者日常生活起居，包括個人衛生、備餐、陪同就醫、協助復健運動等，服務個案約 8 戶。',
      duration: '約 4 年',
    },
    {
      id: 'tmpl-w2',
      period: '2015–2018',
      jobTitle: '便當店外場人員',
      jobContent: '負責點餐收銀、備料協助、清潔維護，以及與客人溝通特殊飲食需求，尖峰時段也會支援廚房工作。',
      duration: '約 3 年',
    },
  ],
  workSkills: '熟悉居家照護基本技能（協助沐浴、翻身、輪椅操作）；基本廚藝（中式家常料理）；能使用 Line、Google 表單等基本數位工具；持有汽機車駕照。',
  trainings: [
    {
      id: 'tmpl-t1',
      period: '2017',
      courseName: '居家照顧服務員訓練課程（90 小時）',
      institution: '○○縣市社會局',
      completionDate: '2017/11',
      hasCertificate: true,
    },
    {
      id: 'tmpl-t2',
      period: '2023',
      courseName: '長照 2.0 喘息服務實務工作坊',
      institution: '○○社會福利基金會',
      completionDate: '2023/04',
      hasCertificate: false,
    },
  ],
  certificates: '居家照顧服務員結業證書（2017）、食品安全衛生管理人員訓練證書（2016）',

  // Step 4
  majorTurning: '家中長輩在我 28 歲時生病需要人照顧，我決定暫停原本的工作，返家照顧了將近兩年。這段時間雖然辛苦，卻讓我學到很多照護知識，也讓我重新思考自己真正想做什麼樣的工作。',
  helpingPeople: '鄰居阿姨在我小時候家裡經濟困難時，常常送食物過來，讓我感受到社區的溫暖。還有我的前主管，她在我剛入職時很有耐心地教我照護技巧，讓我從一個完全不懂的新手慢慢變得有自信。',
  affirmations: '我的個案家屬曾跟我說「謝謝你讓我媽媽願意配合復健，以前我怎麼說她都不聽」，讓我很感動，覺得自己的耐心是真的有幫助到人。同事也常說我做事細心，不容易出錯。',
  difficulties: '曾經照顧一位失智長者，有時候他情緒起伏很大，甚至會有肢體動作，那段時間心理壓力很大，不知道怎麼處理。後來參加了一次失智症照護講座才慢慢學到一些應對技巧。',

  // Step 5
  supportPeople: [
    {
      id: 'tmpl-s1',
      name: '媽媽',
      relationship: '媽媽',
      unit: '',
      canHelp: '情緒支持、幫忙接送小孩',
      type: 'family' as const,
    },
    {
      id: 'tmpl-s2',
      name: '陳姐',
      relationship: '前同事',
      unit: '○○居家照護中心',
      canHelp: '工作上的建議、人脈介紹',
      type: 'work' as const,
    },
    {
      id: 'tmpl-s3',
      name: '小玲',
      relationship: '高中同學',
      unit: '',
      canHelp: '聊天、情緒支持，有時幫我找工作資訊',
      type: 'friend' as const,
    },
    {
      id: 'tmpl-s4',
      name: '李社工',
      relationship: '社工師',
      unit: '○○社福中心',
      canHelp: '提供就業資源資訊、協助申請補助',
      type: 'professional' as const,
    },
  ],
};

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

  loadTemplate: () => set({
    ...initialState,
    ...templateData,
  }),
}));
