import { TLiquidityPositionInputState } from "@/components/helper/types";
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

export const useLiquidyState = create((set) => ({
  isAddLiquidity: true,
  setIsAddLiquidity: (value: boolean) => set({ isAddLiquidity: value }),
}));

export const useAddLiquidityPreviewState = create((set) => ({
  isPreviewPositionAdd: false,
  setIsPreviewPositionAdd: (value: boolean) =>
    set({ isPreviewPositionAdd: value }),

  isPreviewPositionRemove: false,
  setIsPreviewPositionRemove: (value: boolean) =>
    set({ isPreviewPositionRemove: value }),
}));

export const useAddLiquidityInputState = create((set) => ({
  tokenXAmount: "",
  setTokenXAmount: (value: string) => set({ tokenXAmount: value }),

  tokenYAmount: "",
  setTokenYAmount: (value: string) => set({ tokenYAmount: value }),

  minPrice: "",
  setMinPrice: (value: string) => set({ minPrice: value }),

  maxPrice: "",
  setMaxPrice: (value: string) => set({ maxPrice: value }),

  currentPrice: "",
  setCurrentPrice: (value: string) => set({ currentPrice: value }),
}));

export const useSlideInputState = create((set) => ({
  range: [0, 100],
  setRange: (value: any) => set({ range: value }),
}));

export const useLiquidityTxnHashState = create((set) => ({
  LiquidityTxnHash: "",
  setLiquidityTxnHash: (value: string) => set({ LiquidityTxnHash: value }),
}));

export const useLiquidityPositionDetailState = create((set) => ({
  liquidityPositionDetail: {
    amountX: "",
    amountY: "",
    sender: "",
    recipient: "",
    NitroPair_id: "",
  },
  setLiquidityPositionDetail: (value: TLiquidityPositionInputState) =>
    set({ liquidityPositionDetail: { ...value } }),
}));
