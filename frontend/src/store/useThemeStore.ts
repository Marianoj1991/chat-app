import { create } from "zustand";


export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem('chat-theme') || 'black',
  setTheme: (theme: string) => {
    localStorage.setItem('chat-theme', theme)
    set({theme})
  }
}))