import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Conditional import for notifications
let Notifications: any = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Notifications = require('expo-notifications');
} catch {
    console.log('Notifications not available in Expo Go');
}

export interface NotificationPermissionStatus {
    granted: boolean;
    canAskAgain: boolean;
    status: string;
}

export interface ExpoPushToken {
    data: string;
    type: 'expo' | 'fcm' | 'apns';
}

/**
 * Check if notifications are available in current environment
 */
export function isNotificationsAvailable(): boolean {
    return Notifications !== null && Device.isDevice;
}

/**
 * Get notification permissions status
 */
export async function getNotificationPermissions(): Promise<NotificationPermissionStatus | null> {
    if (!isNotificationsAvailable()) {
        return null;
    }

    try {
        const { status, canAskAgain } = await Notifications.getPermissionsAsync();
        return {
            granted: status === 'granted',
            canAskAgain,
            status,
        };
    } catch (error) {
        console.error('Error getting notification permissions:', error);
        return null;
    }
}

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions(): Promise<NotificationPermissionStatus | null> {
    if (!isNotificationsAvailable()) {
        return null;
    }

    try {
        // Set up notification channel for Android
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'Default notifications',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const { status, canAskAgain } = await Notifications.requestPermissionsAsync();
        return {
            granted: status === 'granted',
            canAskAgain,
            status,
        };
    } catch (error) {
        console.error('Error requesting notification permissions:', error);
        return null;
    }
}

/**
 * Get Expo push token (for development builds only)
 */
export async function getExpoPushToken(): Promise<ExpoPushToken | null> {
    if (!isNotificationsAvailable()) {
        console.log('Push notifications not available in Expo Go');
        return null;
    }

    try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            console.log('Project ID not found - push notifications require EAS project');
            return null;
        }

        const token = await Notifications.getExpoPushTokenAsync({
            projectId,
        });

        return token;
    } catch (error) {
        console.error('Error getting Expo push token:', error);
        return null;
    }
}

/**
 * Schedule a local notification
 */
export async function scheduleLocalNotification(
    title: string,
    body: string,
    data?: any,
    seconds: number = 2
): Promise<boolean> {
    if (!isNotificationsAvailable()) {
        console.log('Local notifications not available');
        return false;
    }

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds,
            },
        });
        return true;
    } catch (error) {
        console.error('Error scheduling notification:', error);
        return false;
    }
}

/**
 * Present a local notification immediately
 */
export async function presentLocalNotification(
    title: string,
    body: string,
    data?: any
): Promise<boolean> {
    if (!isNotificationsAvailable()) {
        console.log('Local notifications not available');
        return false;
    }

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data,
            },
            trigger: null, // Show immediately
        });
        return true;
    } catch (error) {
        console.error('Error presenting notification:', error);
        return false;
    }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<boolean> {
    if (!isNotificationsAvailable()) {
        return false;
    }

    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        return true;
    } catch (error) {
        console.error('Error canceling notifications:', error);
        return false;
    }
}

/**
 * Get badge count
 */
export async function getBadgeCount(): Promise<number> {
    if (!isNotificationsAvailable()) {
        return 0;
    }

    try {
        return await Notifications.getBadgeCountAsync();
    } catch (error) {
        console.error('Error getting badge count:', error);
        return 0;
    }
}

/**
 * Set badge count
 */
export async function setBadgeCount(count: number): Promise<boolean> {
    if (!isNotificationsAvailable()) {
        return false;
    }

    try {
        await Notifications.setBadgeCountAsync(count);
        return true;
    } catch (error) {
        console.error('Error setting badge count:', error);
        return false;
    }
}
