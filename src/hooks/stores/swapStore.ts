import { create } from "zustand";

export const useSettingsState = create((set) => ({
  isSettingOpen: false,
  setIsSettingOpen: (value: boolean) => set({ isSettingOpen: value }),
}));

export const usePreviewSwapState = create((set) => ({
  isPreviewSwap: false,
  setIsPreviewSwap: (value: boolean) => set({ isPreviewSwap: value }),
}));
