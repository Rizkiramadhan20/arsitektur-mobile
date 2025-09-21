# Province Navigation Feature

## Overview

Fitur navigasi ke halaman provinsi berdasarkan lokasi user ketika mengklik "Lihat Semua" di bagian "Near You".

## Komponen yang Ditambahkan

### 1. Location Utils (`utils/locationUtils.ts`)

- **getUserLocation()**: Mendapatkan lokasi user dan menentukan provinsi
- **getProvinceFromCoordinates()**: Mapping koordinat ke provinsi Indonesia
- **getProvinceSlug()**: Konversi nama provinsi ke slug untuk URL
- **getProvinceNameFromSlug()**: Konversi slug kembali ke nama provinsi
- **PROVINCE_COORDINATES**: Database koordinat semua provinsi Indonesia

### 2. User Location Hook (`hooks/useUserLocation.ts`)

- **useUserLocation()**: Hook untuk mengelola lokasi user
- Integrasi dengan PermissionContext untuk cek izin lokasi
- State management untuk lokasi, loading, dan error
- Auto-fetch lokasi ketika permission granted

### 3. Province Page (`app/properties/province/[province].tsx`)

- Halaman dinamis untuk menampilkan properti berdasarkan provinsi
- Filter properti berdasarkan provinsi dan kota
- UI yang konsisten dengan design system
- Error handling dan loading states

### 4. Updated Properties Page (`app/(tabs)/properties/index.tsx`)

- Integrasi dengan useUserLocation hook
- Navigasi ke halaman provinsi berdasarkan lokasi user
- Fallback ke Jakarta jika lokasi tidak tersedia

## Flow Aplikasi

1. **User mengklik "Lihat Semua"** di bagian "Near You"
2. **Sistem cek permission lokasi**:
   - Jika granted: Ambil lokasi user dan tentukan provinsi
   - Jika tidak granted: Fallback ke Jakarta
3. **Navigasi ke halaman provinsi** dengan slug yang sesuai
4. **Filter dan tampilkan properti** berdasarkan provinsi

## Mapping Provinsi

Sistem mendukung semua 34 provinsi Indonesia:

- DKI Jakarta
- Jawa Barat, Jawa Tengah, Jawa Timur
- Banten, Yogyakarta, Bali
- Sumatera (Utara, Barat, Selatan, Lampung, Riau, dll)
- Kalimantan (Barat, Tengah, Selatan, Timur, Utara)
- Sulawesi (Utara, Tengah, Selatan, Tenggara, Barat, Gorontalo)
- Maluku, Maluku Utara
- Papua (Papua, Papua Barat, Papua Selatan, dll)
- Nusa Tenggara (Barat, Timur)

## URL Structure

```
/properties/province/[province-slug]
```

Contoh:

- `/properties/province/dki-jakarta`
- `/properties/province/jawa-barat`
- `/properties/province/bali`

## Dependencies

- `expo-location`: Untuk akses lokasi user
- `expo-router`: Untuk navigasi dinamis
- `@/context/PermissionContext`: Untuk cek izin lokasi

## Testing

1. **Grant location permission** saat pertama kali install
2. **Klik "Lihat Semua"** di bagian "Near You"
3. **Verify navigation** ke halaman provinsi yang sesuai
4. **Check property filtering** berdasarkan provinsi
5. **Test fallback** dengan deny location permission

## Error Handling

- **Location permission denied**: Fallback ke Jakarta
- **Location unavailable**: Fallback ke Jakarta
- **Network error**: Error state dengan retry button
- **No properties found**: Empty state dengan pesan informatif

## Future Enhancements

- [ ] Real-time location updates
- [ ] City-level filtering
- [ ] Distance-based sorting
- [ ] Offline location caching
- [ ] Location-based recommendations
