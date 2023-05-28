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

export const useSuccessState = create((set) => ({
  isSuccessfull: false,
  setIsSuccessfull: (value: boolean) => set({ isSuccessfull: value }),
}));
