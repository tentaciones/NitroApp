import { create } from "zustand";
export const useBorrowState = create((set) => ({
  isPreview: false,
  setIsPreview: (value: boolean) => set({ isPreview: value }),
}));

export const useBorrowSideState = create((set) => ({
  isBelowPriceRange: false,
  setIsBelowPriceRange: (value: boolean) => set({ isBelowPriceRange: value }),
}));

export const useBorrowSlideInputState = create((set) => ({
  range: [0, 100],
  setRange: (value: any) => set({ range: value }),
}));

export const useBorrowRangeState = create((set) => ({
  lowerRangeInput: 0,
  setLowerRangeInput: (value: number) => set({ lowerRangeInput: value }),
  higherRangeInput: 0,
  setHigherRangeInput: (value: number) => set({ higherRangeInput: value }),
}));

export const useTokenPriceState = create((set) => ({
  price: 0,
  setPrice: (value: number) => set({ price: value }),
}));

export const useBorrowTxnState = create((set) => ({
  borrowTxn: "",
  setBorrowTxnHash: (value: string) => set({ borrowTxn: value }),
}));
