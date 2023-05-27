import { create } from "zustand";

export const useCreatePositionState = create((set) => ({
  isCreateMewPosition: false,
  setIsCreateNewPosition: (value: boolean) =>
    set({ isCreateMewPosition: value }),
}));
