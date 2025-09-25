import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/config/colors/use-color-scheme';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import "@/global.css";

import Toast from 'react-native-toast-message';

import { AuthProvider } from '@/context/AuthContext';

import { PermissionProvider } from '@/context/PermissionContext';

import { ThemeProvider as CustomThemeProvider, useTheme as useCustomTheme } from '@/context/ThemeProvider';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useCustomTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CustomThemeProvider>
          <AuthProvider>
            <PermissionProvider>
              <ThemeProvider value={(theme ?? colorScheme) === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    animationDuration: 300
                  }}
                >
                  <Stack.Screen name="index" />
                  <Stack.Screen name="permissions" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="properties" />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <Toast />
                <StatusBar style={(theme ?? colorScheme) === 'dark' ? 'light' : 'dark'} />
              </ThemeProvider>
            </PermissionProvider>
          </AuthProvider>
        </CustomThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}