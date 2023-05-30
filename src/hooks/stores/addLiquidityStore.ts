import { create } from "zustand";

export const useCreatePositionState = create((set) => ({
  isCreateMewPosition: false,
  setIsCreateNewPosition: (value: boolean) =>
    set({ isCreateMewPosition: value }),
}));

export const useCreatePositionPreviewState = create((set) => ({
  isPreviewPosition: false,
  setIsPreviewPosition: (value: boolean) => set({ isPreviewPosition: value }),
}));
