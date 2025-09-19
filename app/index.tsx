import { useAuth } from '@/context/AuthContext';

import { router, usePathname } from 'expo-router';

import { useEffect, useRef } from 'react';

export default function Index() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (loading) return;

    if (hasRedirected.current) return;

    if (pathname === '/') {
      hasRedirected.current = true;
      router.replace('/(tabs)/properties');
    }
  }, [user, loading, pathname]);

  useEffect(() => {
    hasRedirected.current = false;
  }, [pathname]);

  return null;
}