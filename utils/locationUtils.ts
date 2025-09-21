import * as Location from 'expo-location';

export interface UserLocation {
    latitude: number;
    longitude: number;
    province: string;
    city: string;
}

// Mapping koordinat ke provinsi Indonesia
const PROVINCE_COORDINATES: Record<string, { lat: number; lng: number; name: string }> = {
    'DKI Jakarta': { lat: -6.2088, lng: 106.8456, name: 'DKI Jakarta' },
    'Jawa Barat': { lat: -6.9175, lng: 107.6191, name: 'Jawa Barat' },
    'Jawa Tengah': { lat: -7.7956, lng: 110.3695, name: 'Jawa Tengah' },
    'Jawa Timur': { lat: -7.2504, lng: 112.7688, name: 'Jawa Timur' },
    'Banten': { lat: -6.4058, lng: 106.0644, name: 'Banten' },
    'Yogyakarta': { lat: -7.7956, lng: 110.3695, name: 'Yogyakarta' },
    'Bali': { lat: -8.3405, lng: 115.0920, name: 'Bali' },
    'Sumatera Utara': { lat: 3.5952, lng: 98.6722, name: 'Sumatera Utara' },
    'Sumatera Barat': { lat: -0.9471, lng: 100.4172, name: 'Sumatera Barat' },
    'Sumatera Selatan': { lat: -2.9909, lng: 104.7565, name: 'Sumatera Selatan' },
    'Lampung': { lat: -5.3971, lng: 105.2668, name: 'Lampung' },
    'Riau': { lat: 0.2933, lng: 101.7068, name: 'Riau' },
    'Kepulauan Riau': { lat: 0.9167, lng: 104.4500, name: 'Kepulauan Riau' },
    'Jambi': { lat: -1.6101, lng: 103.6131, name: 'Jambi' },
    'Bengkulu': { lat: -3.5778, lng: 102.3464, name: 'Bengkulu' },
    'Aceh': { lat: 5.5483, lng: 95.3238, name: 'Aceh' },
    'Kalimantan Barat': { lat: -0.0263, lng: 109.3425, name: 'Kalimantan Barat' },
    'Kalimantan Tengah': { lat: -1.2379, lng: 113.9213, name: 'Kalimantan Tengah' },
    'Kalimantan Selatan': { lat: -3.3194, lng: 114.5921, name: 'Kalimantan Selatan' },
    'Kalimantan Timur': { lat: -1.2379, lng: 116.5543, name: 'Kalimantan Timur' },
    'Kalimantan Utara': { lat: 3.3166, lng: 117.5900, name: 'Kalimantan Utara' },
    'Sulawesi Utara': { lat: 1.4748, lng: 124.8421, name: 'Sulawesi Utara' },
    'Sulawesi Tengah': { lat: -1.4300, lng: 121.4456, name: 'Sulawesi Tengah' },
    'Sulawesi Selatan': { lat: -5.1477, lng: 119.4327, name: 'Sulawesi Selatan' },
    'Sulawesi Tenggara': { lat: -3.5491, lng: 121.7275, name: 'Sulawesi Tenggara' },
    'Gorontalo': { lat: 0.5435, lng: 123.0575, name: 'Gorontalo' },
    'Sulawesi Barat': { lat: -2.8441, lng: 119.2321, name: 'Sulawesi Barat' },
    'Maluku': { lat: -3.2385, lng: 130.1453, name: 'Maluku' },
    'Maluku Utara': { lat: 0.7827, lng: 127.3614, name: 'Maluku Utara' },
    'Papua': { lat: -2.5333, lng: 140.7167, name: 'Papua' },
    'Papua Barat': { lat: -0.8615, lng: 134.0620, name: 'Papua Barat' },
    'Papua Selatan': { lat: -4.2699, lng: 138.0804, name: 'Papua Selatan' },
    'Papua Tengah': { lat: -2.6000, lng: 140.3000, name: 'Papua Tengah' },
    'Papua Pegunungan': { lat: -4.0000, lng: 140.0000, name: 'Papua Pegunungan' },
    'Papua Barat Daya': { lat: -1.3361, lng: 132.1897, name: 'Papua Barat Daya' },
    'Nusa Tenggara Barat': { lat: -8.6500, lng: 117.0000, name: 'Nusa Tenggara Barat' },
    'Nusa Tenggara Timur': { lat: -8.6500, lng: 121.0000, name: 'Nusa Tenggara Timur' },
};

// Fungsi untuk menghitung jarak antara dua koordinat (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Fungsi untuk mendapatkan provinsi berdasarkan koordinat
export function getProvinceFromCoordinates(latitude: number, longitude: number): string {
    let closestProvince = 'DKI Jakarta';
    let minDistance = Infinity;

    for (const [provinceName, coords] of Object.entries(PROVINCE_COORDINATES)) {
        const distance = calculateDistance(latitude, longitude, coords.lat, coords.lng);
        if (distance < minDistance) {
            minDistance = distance;
            closestProvince = provinceName;
        }
    }

    return closestProvince;
}

// Fungsi untuk mendapatkan lokasi user dan provinsi
export async function getUserLocation(): Promise<UserLocation | null> {
    try {
        // Dapatkan lokasi saat ini dengan accuracy yang lebih tinggi
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = location.coords;
        const province = getProvinceFromCoordinates(latitude, longitude);

        console.log('User location detected:', { latitude, longitude, province });

        return {
            latitude,
            longitude,
            province,
            city: 'Unknown', // Bisa ditambahkan mapping kota jika diperlukan
        };
    } catch (error) {
        console.error('Error getting user location:', error);

        // Fallback: coba dengan accuracy yang lebih rendah
        try {
            console.log('Trying fallback location detection...');
            const fallbackLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Lowest,
            });

            const { latitude, longitude } = fallbackLocation.coords;
            const province = getProvinceFromCoordinates(latitude, longitude);

            console.log('Fallback location detected:', { latitude, longitude, province });

            return {
                latitude,
                longitude,
                province,
                city: 'Unknown',
            };
        } catch (fallbackError) {
            console.error('Fallback location also failed:', fallbackError);
            return null;
        }
    }
}

// Fungsi untuk mendapatkan slug provinsi (untuk URL)
export function getProvinceSlug(provinceName: string): string {
    return provinceName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

// Fungsi untuk mendapatkan nama provinsi dari slug
export function getProvinceNameFromSlug(slug: string): string {
    const provinceMap: Record<string, string> = {};

    Object.keys(PROVINCE_COORDINATES).forEach(province => {
        provinceMap[getProvinceSlug(province)] = province;
    });

    return provinceMap[slug] || 'DKI Jakarta';
}
