import { useAuth } from '@/context/AuthContext';
import { usePermissions } from '@/context/PermissionContext';

import { router, usePathname } from 'expo-router';

import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const { user, loading } = useAuth();
  const { allPermissionsGranted, loading: permissionLoading } = usePermissions();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      if (loading || permissionLoading) return;
      if (hasRedirected.current) return;
      if (pathname !== '/') return;

      try {
        const isFirstTime = await AsyncStorage.getItem('is_first_time');

        if (isFirstTime === null) {
          // First time user - show permission screen
          hasRedirected.current = true;
          router.replace('/permissions');
          await AsyncStorage.setItem('is_first_time', 'false');
        } else if (allPermissionsGranted) {
          // User has granted all permissions - go to main app
          hasRedirected.current = true;
          router.replace('/(tabs)/properties');
        } else {
          // User has used app before but permissions not granted - go to main app
          hasRedirected.current = true;
          router.replace('/(tabs)/properties');
        }
      } catch (error) {
        console.error('Error checking first time user:', error);
        // Fallback to main app
        hasRedirected.current = true;
        router.replace('/(tabs)/properties');
      }
    };

    checkFirstTimeUser();
  }, [user, loading, permissionLoading, allPermissionsGranted, pathname]);

  useEffect(() => {
    hasRedirected.current = false;
  }, [pathname]);

  return null;
}