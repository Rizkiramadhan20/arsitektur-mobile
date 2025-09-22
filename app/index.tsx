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
        const hasVisitedAuth = await AsyncStorage.getItem('has_visited_auth');

        if (isFirstTime === null) {
          hasRedirected.current = true;
          router.replace('/permissions');
          await AsyncStorage.setItem('is_first_time', 'false');
        } else if (hasVisitedAuth === 'true') {
          // User has already visited auth page before (login or skip)
          hasRedirected.current = true;
          router.replace('/(tabs)/properties');
        } else {
          // User needs to go through auth flow (permissions already handled or not needed)
          hasRedirected.current = true;
          router.replace('/auth');
        }
      } catch {
        hasRedirected.current = true;
        router.replace('/auth');
      }
    };

    checkFirstTimeUser();
  }, [user, loading, permissionLoading, allPermissionsGranted, pathname]);

  useEffect(() => {
    hasRedirected.current = false;
  }, [pathname]);

  return null;
}