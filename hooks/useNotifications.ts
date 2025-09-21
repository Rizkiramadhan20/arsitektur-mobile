import { useState, useEffect, useCallback } from 'react';
import {
    getNotificationPermissions,
    requestNotificationPermissions,
    scheduleLocalNotification,
    presentLocalNotification,
    getExpoPushToken,
    isNotificationsAvailable,
    NotificationPermissionStatus,
    ExpoPushToken
} from '@/utils/notificationUtils';

export function useNotifications() {
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermissionStatus | null>(null);
    const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkPermissions = useCallback(async () => {
        if (!isNotificationsAvailable()) {
            setPermissionStatus(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const status = await getNotificationPermissions();
            setPermissionStatus(status);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to check permissions');
        } finally {
            setLoading(false);
        }
    }, []);

    const requestPermissions = useCallback(async () => {
        if (!isNotificationsAvailable()) {
            setError('Notifications not available in Expo Go');
            return false;
        }

        try {
            setLoading(true);
            setError(null);
            const status = await requestNotificationPermissions();
            setPermissionStatus(status);
            return status?.granted || false;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to request permissions');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const getPushToken = useCallback(async () => {
        if (!isNotificationsAvailable()) {
            setError('Push notifications not available in Expo Go');
            return null;
        }

        try {
            setLoading(true);
            setError(null);
            const token = await getExpoPushToken();
            setExpoPushToken(token);
            return token;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get push token');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const sendLocalNotification = useCallback(async (
        title: string,
        body: string,
        data?: any,
        delaySeconds: number = 0
    ) => {
        if (!isNotificationsAvailable()) {
            setError('Local notifications not available');
            return false;
        }

        try {
            if (delaySeconds > 0) {
                return await scheduleLocalNotification(title, body, data, delaySeconds);
            } else {
                return await presentLocalNotification(title, body, data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send notification');
            return false;
        }
    }, []);

    useEffect(() => {
        checkPermissions();
    }, [checkPermissions]);

    return {
        // Status
        permissionStatus,
        expoPushToken,
        loading,
        error,

        // Availability
        isAvailable: isNotificationsAvailable(),
        hasPermission: permissionStatus?.granted || false,

        // Actions
        checkPermissions,
        requestPermissions,
        getPushToken,
        sendLocalNotification,

        // Clear error
        clearError: () => setError(null),
    };
}
