import { create } from "zustand";

const useThemeStore = create((set) => ({
    isDark: typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false,
    toggleTheme: () =>
        set((state) => {
            const newTheme = !state.isDark;

            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newTheme ? "dark" : "light");
            }

            return { isDark: newTheme };
        }),
}));

export default useThemeStore;
