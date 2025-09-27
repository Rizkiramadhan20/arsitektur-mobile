import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import "@/global.css";

import Toast from 'react-native-toast-message';

import { AuthProvider } from '@/context/AuthContext';

import { PermissionProvider } from '@/context/PermissionContext';

import { ThemeProvider as CustomThemeProvider, useTheme as useCustomTheme } from '@/context/ThemeProvider';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

function ThemedNavigation() {
  const { theme } = useCustomTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#000000' : '#ffffff';
  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View className={theme} style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            contentStyle: { backgroundColor },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="permissions" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="properties" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CustomThemeProvider>
          <AuthProvider>
            <PermissionProvider>
              <ThemedNavigation />
            </PermissionProvider>
          </AuthProvider>
        </CustomThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}