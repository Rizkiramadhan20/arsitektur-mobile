import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const { setColorScheme } = useNativeWindColorScheme();

    // Load stored theme on mount
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const stored = await AsyncStorage.getItem("app_theme");
                if (stored === "light" || stored === "dark") {
                    setTheme(stored);
                    setColorScheme(stored);
                }
            } catch {
                // ignore
            }
        };
        loadTheme();
    }, [setColorScheme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // Persist and propagate to NativeWind when theme changes
    useEffect(() => {
        AsyncStorage.setItem("app_theme", theme).catch(() => { });
        setColorScheme(theme);
    }, [theme, setColorScheme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
