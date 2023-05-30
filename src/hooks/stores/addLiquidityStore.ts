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
