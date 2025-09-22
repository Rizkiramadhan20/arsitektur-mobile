import { useState, useEffect, useCallback } from 'react';

import { getUserLocation, getProvinceSlug, UserLocation } from '@/hooks/locationUtils'

import { usePermissions } from '@/context/PermissionContext';

export function useUserLocation() {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { locationPermission } = usePermissions();

    const fetchUserLocation = useCallback(async () => {

        if (locationPermission !== true) {
            setError('Location permission not granted');
            setUserLocation(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const location = await getUserLocation();

            if (location) {
                setUserLocation(location);
                setError(null);
            } else {
                setError('Unable to detect location');
                setUserLocation(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get location');
            setUserLocation(null);
        } finally {
            setLoading(false);
        }
    }, [locationPermission]);

    useEffect(() => {
        if (locationPermission === true) {
            fetchUserLocation();
        }
    }, [locationPermission, fetchUserLocation]);

    const getProvinceSlugFromLocation = (): string => {
        if (!userLocation) return 'dki-jakarta';
        return getProvinceSlug(userLocation.province);
    };

    const retryLocation = useCallback(() => {
        fetchUserLocation();
    }, [fetchUserLocation]);

    return {
        userLocation,
        loading,
        error,
        refetch: fetchUserLocation,
        retry: retryLocation,
        provinceSlug: getProvinceSlugFromLocation(),
        hasLocationPermission: locationPermission === true,
    };
}
