# Permission System Documentation

## Overview

Sistem permission telah diimplementasikan untuk meminta izin kamera, lokasi, dan notifikasi ketika user pertama kali menginstall aplikasi.

## Komponen yang Ditambahkan

### 1. PermissionContext (`context/PermissionContext.tsx`)

- Context untuk mengelola status permissions
- Fungsi untuk check dan request permissions
- State management untuk camera, location, dan notification permissions

### 2. Permission Screen (`app/permissions/index.tsx`)

- Screen yang ditampilkan untuk user baru
- UI yang menarik dengan penjelasan untuk setiap permission
- Tombol untuk grant permissions atau skip

### 3. Permission Status Component (`components/PermissionStatus.tsx`)

- Komponen untuk menampilkan status permissions di profile screen
- Tombol untuk request permissions ulang
- Link ke pengaturan aplikasi

## Flow Aplikasi

1. **First Time User**: User baru akan melihat permission screen
2. **Returning User**: User yang sudah pernah menggunakan app akan langsung ke main screen
3. **Permission Management**: User bisa mengelola permissions di profile screen

## Permissions yang Diminta

- **Kamera**: Untuk mengambil foto properti dan dokumen
- **Lokasi**: Untuk menampilkan properti di sekitar user
- **Notifikasi**: Untuk update properti dan pesan penting

## Konfigurasi

### Android (`app.json`)

```json
"permissions": [
  "android.permission.CAMERA",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.POST_NOTIFICATIONS"
]
```

### iOS (`app.json`)

```json
"infoPlist": {
  "NSCameraUsageDescription": "Aplikasi memerlukan akses kamera untuk mengambil foto properti dan dokumen",
  "NSLocationWhenInUseUsageDescription": "Aplikasi memerlukan akses lokasi untuk menampilkan properti di sekitar Anda",
  "NSLocationAlwaysAndWhenInUseUsageDescription": "Aplikasi memerlukan akses lokasi untuk menampilkan properti di sekitar Anda"
}
```

## Testing

Untuk test permission flow:

1. Uninstall aplikasi
2. Install ulang
3. User baru akan melihat permission screen
4. Test grant dan skip functionality
5. Check permission status di profile screen

### Catatan Penting:

- **Expo Go**:
  - Camera dan Location permissions berfungsi normal
  - Notifications tidak didukung di Expo Go (SDK 53+)
  - Warning notifications adalah normal dan tidak mempengaruhi fungsi app
- **Development Build**: Untuk testing lengkap semua permissions termasuk notifications, jalankan:
  ```bash
  npx expo run:android
  # atau
  npx expo run:ios
  ```

### Penanganan Notifications di Expo Go:

- Aplikasi menggunakan conditional import untuk notifications
- Jika notifications tidak tersedia, status akan menjadi `null`
- `allPermissionsGranted` akan tetap `true` meskipun notifications tidak tersedia

### Implementasi Notifikasi Baru:

- **Local Notifications**: Berfungsi di Expo Go untuk notifikasi dalam aplikasi
- **Push Notifications**: Hanya berfungsi di development build, tidak di Expo Go
- **Notification Utils**: Utility functions untuk mengelola notifikasi dengan aman
- **useNotifications Hook**: Hook untuk mengelola state notifikasi dengan mudah

### Referensi:

- [Expo Notifications Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/)
- Push notifications tidak didukung di Expo Go SDK 53+
- Local notifications tetap berfungsi di Expo Go

## Dependencies

- `expo-camera`: Untuk akses kamera
- `expo-location`: Untuk akses lokasi
- `expo-notifications`: Untuk notifikasi
- `expo-permissions`: Untuk permission management
