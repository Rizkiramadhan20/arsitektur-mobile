# Notifications Implementation

## Overview

Implementasi notifikasi yang sesuai dengan [dokumentasi resmi Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) dan mengatasi warning di Expo Go SDK 53+.

## Masalah yang Diperbaiki

### 1. **Expo Go SDK 53+ Limitation**

- **Push notifications** tidak didukung di Expo Go SDK 53+
- **Local notifications** tetap berfungsi di Expo Go
- Warning console adalah normal dan tidak mempengaruhi fungsi aplikasi

### 2. **Implementasi Baru**

#### Notification Utils (`utils/notificationUtils.ts`)

- **Conditional imports** untuk menghindari error di Expo Go
- **Device detection** menggunakan `expo-device`
- **Permission management** yang robust
- **Local notification** support
- **Push token** management (development build only)

#### useNotifications Hook (`hooks/useNotifications.ts`)

- **State management** untuk notifikasi
- **Permission checking** dan requesting
- **Local notification** sending
- **Push token** retrieval
- **Error handling** yang comprehensive

#### Updated PermissionContext

- **Integration** dengan notification utils
- **Safe permission checking** untuk semua environment
- **Fallback handling** untuk Expo Go

## Features

### ✅ **Local Notifications (Expo Go Compatible)**

```typescript
import { useNotifications } from "@/hooks/useNotifications";

const { sendLocalNotification } = useNotifications();

// Send immediate notification
await sendLocalNotification(
  "New Property!",
  "Check out this amazing property in your area",
  { propertyId: "123" }
);

// Schedule notification
await sendLocalNotification(
  "Reminder",
  "Don't forget to check new properties",
  null,
  3600 // 1 hour delay
);
```

### ✅ **Permission Management**

```typescript
const { hasPermission, requestPermissions, permissionStatus } =
  useNotifications();

// Check if notifications are available
if (isNotificationsAvailable()) {
  // Request permissions
  const granted = await requestPermissions();
  if (granted) {
    // Send notifications
  }
}
```

### ✅ **Push Notifications (Development Build Only)**

```typescript
const { getPushToken, expoPushToken } = useNotifications();

// Get push token (only works in development build)
const token = await getPushToken();
if (token) {
  // Send to your server for push notifications
  console.log("Push token:", token.data);
}
```

## Environment Support

### **Expo Go**

- ✅ Local notifications
- ✅ Permission management
- ❌ Push notifications
- ✅ All permission flows

### **Development Build**

- ✅ Local notifications
- ✅ Permission management
- ✅ Push notifications
- ✅ Full functionality

## Usage Examples

### **Basic Permission Check**

```typescript
import { useNotifications } from '@/hooks/useNotifications';

function MyComponent() {
    const { hasPermission, isAvailable } = useNotifications();

    if (!isAvailable) {
        return <Text>Notifications not available in Expo Go</Text>;
    }

    if (!hasPermission) {
        return <Button onPress={requestPermissions}>Enable Notifications</Button>;
    }

    return <Text>Notifications enabled!</Text>;
}
```

### **Send Property Notification**

```typescript
const sendPropertyNotification = async (property: Property) => {
  const success = await sendLocalNotification(
    `New Property: ${property.title}`,
    `Check out this ${property.type} in ${property.city}`,
    {
      propertyId: property.id,
      type: "property_alert",
    }
  );

  if (success) {
    console.log("Notification sent successfully");
  }
};
```

### **Schedule Reminder**

```typescript
const scheduleReminder = async () => {
  await sendLocalNotification(
    "Property Search Reminder",
    "New properties might be available in your area",
    { type: "reminder" },
    86400 // 24 hours
  );
};
```

## Configuration

### **Android Notification Channel**

```typescript
// Automatically set up in notificationUtils.ts
await Notifications.setNotificationChannelAsync("default", {
  name: "Default notifications",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
});
```

### **Notification Handler**

```typescript
// Set in PermissionContext
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
```

## Error Handling

### **Expo Go Limitations**

- Graceful fallback untuk push notifications
- Clear error messages untuk user
- Debug logging untuk development

### **Permission Denied**

- Retry mechanism
- User-friendly error messages
- Alternative flows

### **Network Issues**

- Offline notification support
- Retry logic untuk failed requests
- Cached permission status

## Testing

### **Expo Go Testing**

1. **Local notifications**: Test dengan `sendLocalNotification`
2. **Permissions**: Test grant/deny flow
3. **Error handling**: Test dengan permissions denied

### **Development Build Testing**

1. **Push notifications**: Test dengan real device
2. **Push tokens**: Verify token generation
3. **Background notifications**: Test app state changes

## Production Notes

### **Remove Debug Code**

- Remove console.log statements
- Remove debug UI components
- Clean up error logging

### **Optimize Performance**

- Cache permission status
- Lazy load notification features
- Minimize API calls

### **Security**

- Validate notification data
- Sanitize user inputs
- Secure push token handling

## Dependencies

- `expo-notifications`: Core notification functionality
- `expo-device`: Device detection
- `expo-constants`: Project configuration

## References

- [Expo Notifications Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Expo Go Limitations](https://docs.expo.dev/develop/development-builds/introduction/)
- [Push Notifications Setup](https://docs.expo.dev/push-notifications/push-notifications-setup/)
