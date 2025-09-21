import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import { getProvinceNameFromSlug } from '@/utils/locationUtils';

import { fetchProperties } from '@/config/lib/FetchProperties';

export default function ProvinceScreen() {
    const { province } = useLocalSearchParams<{ province: string }>();
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const provinceName = getProvinceNameFromSlug(province || 'dki-jakarta');

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchProperties();

                // Filter properties berdasarkan provinsi
                const filteredProperties = response.data.filter((property: Property) =>
                    property.province.toLowerCase().includes(provinceName.toLowerCase()) ||
                    property.city.toLowerCase().includes(provinceName.toLowerCase()) ||
                    property.province.toLowerCase().includes(province?.toLowerCase() || '')
                );

                setProperties(filteredProperties);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load properties');
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, [province, provinceName]);

    const handleBack = () => {
        router.back();
    };

    const handlePropertyPress = (propertyId: string) => {
        // Navigate to property detail
        console.log('Navigate to property:', propertyId);
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-900">
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#3B82F6" />
                    <Text className="text-white mt-4">Loading properties...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-zinc-900">
            {/* Header */}
            <LinearGradient
                colors={['#1F2937', '#111827']}
                className="px-6 py-4"
            >
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={handleBack} className="p-2">
                        <Ionicons name="arrow-back" size={24} color="#ffffff" />
                    </TouchableOpacity>

                    <View className="flex-1 items-center">
                        <Text className="text-white text-lg font-bold">Properti di</Text>
                        <Text className="text-accent-blue-500 text-xl font-bold">{provinceName}</Text>
                    </View>

                    <View className="w-10" />
                </View>
            </LinearGradient>

            <ScrollView className="flex-1 px-6">
                {error ? (
                    <View className="flex-1 justify-center items-center py-20">
                        <Ionicons name="alert-circle" size={48} color="#EF4444" />
                        <Text className="text-white text-lg font-semibold mt-4">Error</Text>
                        <Text className="text-zinc-400 text-center mt-2">{error}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                // Reload properties
                                const reloadProperties = async () => {
                                    try {
                                        setLoading(true);
                                        setError(null);
                                        const response = await fetchProperties();

                                        const filteredProperties = response.data.filter((property: Property) =>
                                            property.province.toLowerCase().includes(provinceName.toLowerCase()) ||
                                            property.city.toLowerCase().includes(provinceName.toLowerCase()) ||
                                            property.province.toLowerCase().includes(province?.toLowerCase() || '')
                                        );

                                        setProperties(filteredProperties);
                                    } catch (err) {
                                        setError(err instanceof Error ? err.message : 'Failed to load properties');
                                    } finally {
                                        setLoading(false);
                                    }
                                };
                                reloadProperties();
                            }}
                            className="bg-accent-blue-500 px-6 py-3 rounded-lg mt-4"
                        >
                            <Text className="text-white font-semibold">Try Again</Text>
                        </TouchableOpacity>
                    </View>
                ) : properties.length === 0 ? (
                    <View className="flex-1 justify-center items-center py-20">
                        <Ionicons name="home-outline" size={48} color="#6B7280" />
                        <Text className="text-white text-lg font-semibold mt-4">No Properties Found</Text>
                        <Text className="text-zinc-400 text-center mt-2">
                            Tidak ada properti yang ditemukan di {provinceName}
                        </Text>
                    </View>
                ) : (
                    <>
                        <View className="py-6">
                            <Text className="text-white text-lg font-semibold mb-2">
                                {properties.length} Properti Ditemukan
                            </Text>
                            <Text className="text-zinc-400">
                                Di {provinceName}
                            </Text>
                        </View>

                        <View className="flex flex-col gap-4 pb-6">
                            {properties.map((property) => (
                                <TouchableOpacity
                                    key={property.id}
                                    onPress={() => handlePropertyPress(property.id)}
                                    className="bg-zinc-800 rounded-2xl overflow-hidden"
                                >
                                    <Image
                                        source={{ uri: property.thumbnail }}
                                        className="w-full h-48"
                                        resizeMode="cover"
                                    />

                                    <View className="p-4">
                                        <View className="flex-row justify-between items-start mb-2">
                                            <Text className="text-white text-lg font-bold flex-1 mr-2">
                                                {property.title}
                                            </Text>
                                            <View className="bg-accent-blue-500/20 px-3 py-1 rounded-full">
                                                <Text className="text-accent-blue-500 text-xs font-medium">
                                                    {property.statusProject}
                                                </Text>
                                            </View>
                                        </View>

                                        <View className="flex-row items-center mb-3">
                                            <Ionicons name="location-outline" size={16} color="#6B7280" />
                                            <Text className="text-zinc-400 text-sm ml-1">{property.city}, {property.province}</Text>
                                        </View>

                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center">
                                                <View className="bg-accent-blue-500/20 px-3 py-1 rounded-full">
                                                    <Text className="text-accent-blue-500 text-xs font-medium">
                                                        {property.type}
                                                    </Text>
                                                </View>
                                            </View>

                                            <Text className="text-zinc-400 text-xs">
                                                {new Date(property.createdAt).toLocaleDateString('id-ID')}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}