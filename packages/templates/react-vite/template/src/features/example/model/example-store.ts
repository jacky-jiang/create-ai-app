import { create } from "zustand";

interface ExampleState {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));
