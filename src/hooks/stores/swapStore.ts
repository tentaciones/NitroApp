import { create } from "zustand";
import { tokenData } from "@/constants/pooldata";
export const useSettingsState = create((set) => ({
  isSettingOpen: false,
  setIsSettingOpen: (value: boolean) => set({ isSettingOpen: value }),
}));

export const usePreviewSwapState = create((set) => ({
  isPreviewSwap: false,
  setIsPreviewSwap: (value: boolean) => set({ isPreviewSwap: value }),
}));

export const useSelectedSwapTokenstate = create((set) => ({
  selectedTokenX: tokenData[0],
  setSelectedTokenX: (value: any) => set({ selectedTokenX: value }),
  selectedTokenY: tokenData[1],
  setSelectedTokenY: (value: any) => set({ selectedTokenY: value }),
}));

export const useSwapTokenstate = create((set) => ({
  showTokenX: false,
  setShowTokenX: (value: boolean) => set({ showTokenX: value }),
  showTokenY: false,
  setShowTokenY: (value: boolean) => set({ showTokenY: value }),
}));
