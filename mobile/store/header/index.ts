import { create } from 'zustand';

interface HeaderState {
  title: string;
  defaultTitle: string;
  activeTab: string | null;

  // Actions
  setTitle: (title: string) => void;
  resetTitle: () => void;
  setDefaultTitle: (title: string) => void;
  setActiveTab: (tab: string | null) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: '',
  defaultTitle: '',
  activeTab: null,

  setTitle: (title: string) => set({ title }),
  resetTitle: () => set((state) => ({ title: state.defaultTitle })),
  setDefaultTitle: (defaultTitle: string) => set({ defaultTitle, title: defaultTitle }),
  setActiveTab: (tab: string | null) => set({ activeTab: tab, title: tab || '' })
}));
