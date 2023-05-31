import { create } from "zustand";
export const useMobileNavState = create((set) => ({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (value: boolean) => set({ isMobileMenuOpen: value }),
  connectedAddress: "",
  setConnectedAddress: (value: string) => set({ connectedAddress: value }),
}));
