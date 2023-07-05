import { create } from "zustand";
import { tokenData } from "@/constants/pooldata";
import { TPreviewParams } from "@/components/helper/types";
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

export const useSwapInputState = create((set) => ({
  tokenX: "",
  setTokenX: (value: string) => set({ tokenX: value }),
  tokenY: "",
  setTokenY: (value: string) => set({ tokenY: value }),
}));

export const usePreviewParamsState = create((set) => ({
  previewParams: {
    exchangeRate: "",
    netWorkFee: "",
    priceImpact: "",
    mininumReceived: "",
    tokenXName: "",
    tokenYName: "",
    loaded: false,
    estimatedTimestamp: "",
  },
  setPreviewParams: (value: TPreviewParams) => set({ previewParams: value }),
}));

export const useCustomSlippageState = create((set) => ({
  customSlippage: "",
  setCustomSlippage: (value: string) => set({ customSlippage: value }),
}));

export const useSwapTxnHahState = create((set) => ({
  txnHash: "",
  setTxnHash: (value: string) => set({ txnHash: value }),
}));
