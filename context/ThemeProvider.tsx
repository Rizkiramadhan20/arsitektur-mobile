import React, { createContext, useState, useContext, useEffect } from "react";

import { Appearance, ColorSchemeName } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";

type Theme = "light" | "dark";

type ThemeMode = "system" | Theme;

interface ThemeContextType {
    theme: Theme;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    mode: "system",
    setMode: () => { },
    toggleTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { setColorScheme: setNativewindColorScheme } = useNativeWindColorScheme();
    const [mode, setMode] = useState<ThemeMode>("system");
    const [systemScheme, setSystemScheme] = useState<Exclude<ColorSchemeName, null>>(Appearance.getColorScheme() ?? "light");
    const [theme, setTheme] = useState<Theme>("light");
    const [isHydrated, setIsHydrated] = useState(false);

    // Load stored mode on mount and subscribe to system scheme changes
    useEffect(() => {
        const loadInitial = async () => {
            try {
                const storedMode = await AsyncStorage.getItem("app_theme_mode");
                if (storedMode === "system" || storedMode === "light" || storedMode === "dark") {
                    setMode(storedMode);
                }
            } catch {
                // ignore
            } finally {
                setIsHydrated(true);
            }
        };

        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            const scheme = colorScheme ?? "light";
            setSystemScheme(scheme);
        });

        loadInitial();
        return () => sub.remove();
    }, []);

    const toggleTheme = () => {
        // Only toggle between explicit dark and light. System is not part of the cycle.
        const currentEffective = mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;
        setMode(currentEffective === "dark" ? "light" : "dark");
    };

    // Compute effective theme whenever mode or system changes
    useEffect(() => {
        const effective = mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;
        setTheme(effective);
    }, [mode, systemScheme]);

    // Persist user mode when effective theme changes (skip until hydrated)
    useEffect(() => {
        if (!isHydrated) return;
        AsyncStorage.setItem("app_theme_mode", mode).catch(() => { });
    }, [theme, mode, isHydrated]);

    // Sync NativeWind color scheme so `dark:` variants work on native
    useEffect(() => {
        setNativewindColorScheme(theme);
    }, [theme, setNativewindColorScheme]);

    return (
        <ThemeContext.Provider value={{ theme, mode, setMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
