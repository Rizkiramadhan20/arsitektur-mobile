import React, { useEffect, useRef } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';

import { usePermissions } from '@/context/PermissionContext';

import { router } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView } from 'react-native-safe-area-context'

const PermissionScreen = () => {
    const { requestPermissions, loading } = usePermissions();
    const hasRedirected = useRef(false);

    useEffect(() => {
        const checkPermissionVisit = async () => {
            try {
                const hasVisitedPermissions = await AsyncStorage.getItem('has_visited_permissions');
                if (hasVisitedPermissions === 'true' && !hasRedirected.current) {
                    hasRedirected.current = true;
                    router.replace('/auth');
                }
            } catch {
            }
        };

        checkPermissionVisit();
    }, []);

    const handleGrantPermissions = async () => {
        await requestPermissions();
        await AsyncStorage.setItem('has_visited_permissions', 'true');
        router.replace('/(tabs)/properties');
    };

    const handleSkip = () => {
        AsyncStorage.setItem('has_visited_permissions', 'true');
        router.replace('/(tabs)/properties');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View className="flex-1 px-6 py-8">
                {/* Header */}
                <View className="items-center mb-12">
                    <Image
                        source={require('@/assets/images/icon.png')}
                        className="w-20 h-20 mb-6"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl font-bold text-gray-800 mb-3">Selamat Datang!</Text>
                    <Text className="text-base text-gray-500 text-center leading-6">
                        Untuk memberikan pengalaman terbaik, aplikasi memerlukan beberapa izin
                    </Text>
                </View>

                {/* Permission List */}
                <View className="mb-12">
                    <View className="flex-row items-center py-4 px-4 bg-gray-50 rounded-xl mb-3">
                        <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4 shadow">
                            <Ionicons name="camera" size={24} color="#3B82F6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-800 mb-1">Kamera</Text>
                            <Text className="text-sm text-gray-500 leading-5">
                                Untuk mengambil foto properti dan dokumen
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center py-4 px-4 bg-gray-50 rounded-xl mb-3">
                        <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4 shadow">
                            <Ionicons name="location" size={24} color="#10B981" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-800 mb-1">Lokasi</Text>
                            <Text className="text-sm text-gray-500 leading-5">
                                Untuk menampilkan properti di sekitar Anda
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center py-4 px-4 bg-gray-50 rounded-xl mb-3">
                        <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4 shadow">
                            <Ionicons name="notifications" size={24} color="#F59E0B" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-800 mb-1">Notifikasi</Text>
                            <Text className="text-sm text-gray-500 leading-5">
                                Untuk update properti dan pesan penting
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="mb-6">
                    <TouchableOpacity
                        className="py-4 px-6 rounded-xl items-center mb-3 bg-blue-500 shadow-lg"
                        onPress={handleGrantPermissions}
                        disabled={loading}
                    >
                        <Text className="text-white text-base font-semibold">
                            {loading ? 'Meminta Izin...' : 'Izinkan Semua'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="py-4 px-6 rounded-xl items-center mb-3 border border-gray-300"
                        onPress={handleSkip}
                        disabled={loading}
                    >
                        <Text className="text-gray-500 text-base font-medium">Lewati</Text>
                    </TouchableOpacity>
                </View>

                {/* Privacy Note */}
                <Text className="text-xs text-gray-400 text-center leading-5">
                    Anda dapat mengubah izin ini kapan saja di pengaturan aplikasi
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default PermissionScreen;
