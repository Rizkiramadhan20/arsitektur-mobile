import * as Location from 'expo-location';

import { fetchProperties } from '@/config/lib/FetchProperties';

export interface UserLocation {
    latitude: number;
    longitude: number;
    province: string;
    city: string;
}

let provinceCoordinatesCache: Record<string, { lat: number; lng: number; name: string }> | null = null;

async function getProvinceCoordinates(): Promise<Record<string, { lat: number; lng: number; name: string }>> {
    if (provinceCoordinatesCache) {
        return provinceCoordinatesCache;
    }

    try {
        const response = await fetchProperties(1);
        const coordinates: Record<string, { lat: number; lng: number; name: string }> = {};

        response.data.forEach(property => {
            if (!coordinates[property.province]) {
                coordinates[property.province] = {
                    lat: -6.2088,
                    lng: 106.8456,
                    name: property.province
                };
            }
        });

        provinceCoordinatesCache = coordinates;
        return coordinates;
    } catch {
        const fallbackCoordinates: Record<string, { lat: number; lng: number; name: string }> = {
            'DKI Jakarta': { lat: -6.2088, lng: 106.8456, name: 'DKI Jakarta' },
            'Jawa Barat': { lat: -6.9175, lng: 107.6191, name: 'Jawa Barat' },
            'Jawa Tengah': { lat: -7.7956, lng: 110.3695, name: 'Jawa Tengah' },
            'Jawa Timur': { lat: -7.2504, lng: 112.7688, name: 'Jawa Timur' },
            'Banten': { lat: -6.4058, lng: 106.0644, name: 'Banten' },
            'Yogyakarta': { lat: -7.7956, lng: 110.3695, name: 'Yogyakarta' },
            'Bali': { lat: -8.3405, lng: 115.0920, name: 'Bali' },
        };

        return fallbackCoordinates;
    }
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export async function getProvinceFromCoordinates(latitude: number, longitude: number): Promise<string> {

    if (latitude >= -7.5 && latitude <= -5.5 && longitude >= 105.0 && longitude <= 109.0) {
        if (latitude >= -6.0 && latitude <= -6.5 && longitude >= 106.0 && longitude <= 108.0) {
            return 'Jawa Barat';
        }
        if (latitude >= -6.5 && latitude <= -7.5 && longitude >= 107.0 && longitude <= 109.0) {
            return 'Jawa Barat';
        }
        return 'Jawa Barat';
    }

    if (latitude >= -6.4 && latitude <= -6.0 && longitude >= 106.7 && longitude <= 106.9) {
        return 'DKI Jakarta';
    }

    if (latitude >= -6.8 && latitude <= -5.5 && longitude >= 105.0 && longitude <= 106.5) {
        return 'Banten';
    }

    let closestProvince = 'DKI Jakarta';
    let minDistance = Infinity;

    try {
        const provinceCoordinates = await getProvinceCoordinates();

        for (const [provinceName, coords] of Object.entries(provinceCoordinates)) {
            const distance = calculateDistance(latitude, longitude, coords.lat, coords.lng);
            if (distance < minDistance) {
                minDistance = distance;
                closestProvince = provinceName;
            }
        }
    } catch {
    }

    return closestProvince;
}

export async function getUserLocation(): Promise<UserLocation | null> {
    try {
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = location.coords;
        const province = await getProvinceFromCoordinates(latitude, longitude);


        return {
            latitude,
            longitude,
            province,
            city: 'Unknown',
        };
    } catch {
        try {
            const fallbackLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Lowest,
            });

            const { latitude, longitude } = fallbackLocation.coords;
            const province = await getProvinceFromCoordinates(latitude, longitude);


            return {
                latitude,
                longitude,
                province,
                city: 'Unknown',
            };
        } catch {
            return null;
        }
    }
}

export function getProvinceSlug(provinceName: string): string {
    return provinceName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

export async function getProvinceNameFromSlug(slug: string): Promise<string> {
    try {
        const provinceCoordinates = await getProvinceCoordinates();
        const provinceMap: Record<string, string> = {};

        Object.keys(provinceCoordinates).forEach(province => {
            provinceMap[getProvinceSlug(province)] = province;
        });

        return provinceMap[slug] || 'DKI Jakarta';
    } catch {
        return 'DKI Jakarta';
    }
}
