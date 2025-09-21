# Debug Location System

## Masalah yang Diperbaiki

### 1. **Fallback ke Jakarta**

- **Penyebab**: Duplikasi pengecekan permission di `getUserLocation()` dan `useUserLocation()`
- **Solusi**: Hapus pengecekan permission di `getUserLocation()` karena sudah dicek di hook

### 2. **Debug Logging Ditambahkan**

#### PermissionContext (`context/PermissionContext.tsx`)

```typescript
console.log("Location permission status:", locationStatus);
console.log("Location permission request result:", locationResult);
```

#### useUserLocation Hook (`hooks/useUserLocation.ts`)

```typescript
console.log("fetchUserLocation called, permission:", locationPermission);
console.log("Getting user location...");
console.log("Location result:", location);
```

#### Properties Page (`app/(tabs)/properties/index.tsx`)

```typescript
console.log("handleViewAllNearYou called");
console.log("hasLocationPermission:", hasLocationPermission);
console.log("userLocation:", userLocation);
console.log("provinceSlug:", provinceSlug);
```

#### Location Utils (`utils/locationUtils.ts`)

```typescript
console.log("User location detected:", { latitude, longitude, province });
```

### 3. **Debug UI Component**

Ditambahkan komponen debug di halaman properties yang menampilkan:

- **Permission Status**: Granted/Denied
- **Loading State**: Yes/No
- **Error Message**: Error atau None
- **Location Data**: Provinsi dan koordinat
- **Province Slug**: Slug untuk navigasi

## Cara Debug

### 1. **Buka Developer Console**

- Jalankan aplikasi dengan `npx expo start`
- Buka developer tools untuk melihat console logs

### 2. **Test Permission Flow**

1. **Install aplikasi** (user baru)
2. **Grant location permission** di permission screen
3. **Check console logs** untuk melihat:
   - Permission status
   - Location detection
   - Province mapping

### 3. **Test Navigation**

1. **Klik "Lihat Semua"** di bagian "Near You"
2. **Check console logs** untuk melihat:
   - Navigation decision
   - Province slug
   - Fallback reason (jika ada)

### 4. **Check Debug UI**

- Lihat komponen debug di halaman properties
- Verify semua status sesuai dengan yang diharapkan

## Expected Flow

### ✅ **Success Case**

```
1. Permission granted → Location detected → Province mapped → Navigate to province
```

### ❌ **Fallback Case**

```
1. Permission denied → Fallback to Jakarta
2. Location error → Fallback to Jakarta
3. No location data → Fallback to Jakarta
```

## Troubleshooting

### **Masih Fallback ke Jakarta?**

1. **Check permission**: Pastikan location permission benar-benar granted
2. **Check console logs**: Lihat error message di console
3. **Check debug UI**: Verify status di komponen debug
4. **Test di device real**: Expo Go mungkin ada limitation

### **Location Tidak Terdeteksi?**

1. **Enable GPS**: Pastikan GPS aktif di device
2. **Check accuracy**: Gunakan `Location.Accuracy.High` jika perlu
3. **Test di outdoor**: Indoor mungkin sulit detect location
4. **Check network**: Pastikan ada koneksi internet

### **Province Mapping Salah?**

1. **Check coordinates**: Verify koordinat yang dideteksi
2. **Update mapping**: Tambah/edit koordinat di `PROVINCE_COORDINATES`
3. **Test manual**: Test dengan koordinat manual

## Production Notes

- **Remove debug logs** sebelum production
- **Remove debug UI** sebelum production
- **Add error handling** untuk edge cases
- **Add loading states** untuk better UX
