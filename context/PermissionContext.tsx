import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PermissionContextType {
    cameraPermission: boolean | null;
    locationPermission: boolean | null;
    allPermissionsGranted: boolean;
    requestPermissions: () => Promise<void>;
    checkPermissions: () => Promise<void>;
    loading: boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const usePermissions = () => {
    const context = useContext(PermissionContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionProvider');
    }
    return context;
};

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    const allPermissionsGranted =
        cameraPermission?.granted === true &&
        locationPermission === true;

    const checkPermissions = async () => {
        try {
            setLoading(true);

            // Check location permission
            const locationStatus = await Location.getForegroundPermissionsAsync();
            setLocationPermission(locationStatus.granted);

            // Save permission status to storage
            await AsyncStorage.setItem('permissions_checked', 'true');
        } catch {
            // Error handling
        } finally {
            setLoading(false);
        }
    };

    const requestPermissions = async () => {
        try {
            setLoading(true);

            // Request camera permission
            await requestCameraPermission();

            // Request location permission
            const locationResult = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(locationResult.granted);

            // Save permission status to storage
            await AsyncStorage.setItem('permissions_checked', 'true');
        } catch {
            // Error handling
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkPermissions();
    }, []);

    const value: PermissionContextType = {
        cameraPermission: cameraPermission?.granted || null,
        locationPermission,
        allPermissionsGranted,
        requestPermissions,
        checkPermissions,
        loading,
    };

    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    );
};
