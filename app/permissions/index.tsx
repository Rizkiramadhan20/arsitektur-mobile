import React, { useEffect, useRef } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
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
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require('@/assets/images/icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Selamat Datang!</Text>
                    <Text style={styles.subtitle}>
                        Untuk memberikan pengalaman terbaik, aplikasi memerlukan beberapa izin
                    </Text>
                </View>

                {/* Permission List */}
                <View style={styles.permissionList}>
                    <View style={styles.permissionItem}>
                        <View style={styles.permissionIcon}>
                            <Ionicons name="camera" size={24} color="#3B82F6" />
                        </View>
                        <View style={styles.permissionText}>
                            <Text style={styles.permissionTitle}>Kamera</Text>
                            <Text style={styles.permissionDescription}>
                                Untuk mengambil foto properti dan dokumen
                            </Text>
                        </View>
                    </View>

                    <View style={styles.permissionItem}>
                        <View style={styles.permissionIcon}>
                            <Ionicons name="location" size={24} color="#10B981" />
                        </View>
                        <View style={styles.permissionText}>
                            <Text style={styles.permissionTitle}>Lokasi</Text>
                            <Text style={styles.permissionDescription}>
                                Untuk menampilkan properti di sekitar Anda
                            </Text>
                        </View>
                    </View>

                    <View style={styles.permissionItem}>
                        <View style={styles.permissionIcon}>
                            <Ionicons name="notifications" size={24} color="#F59E0B" />
                        </View>
                        <View style={styles.permissionText}>
                            <Text style={styles.permissionTitle}>Notifikasi</Text>
                            <Text style={styles.permissionDescription}>
                                Untuk update properti dan pesan penting
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        onPress={handleGrantPermissions}
                        disabled={loading}
                    >
                        <Text style={styles.primaryButtonText}>
                            {loading ? 'Meminta Izin...' : 'Izinkan Semua'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={handleSkip}
                        disabled={loading}
                    >
                        <Text style={styles.secondaryButtonText}>Lewati</Text>
                    </TouchableOpacity>
                </View>

                {/* Privacy Note */}
                <Text style={styles.privacyNote}>
                    Anda dapat mengubah izin ini kapan saja di pengaturan aplikasi
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
    },
    permissionList: {
        marginBottom: 48,
    },
    permissionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        marginBottom: 12,
    },
    permissionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    permissionText: {
        flex: 1,
    },
    permissionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    permissionDescription: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    buttonContainer: {
        marginBottom: 24,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButton: {
        backgroundColor: '#3B82F6',
        shadowColor: '#3B82F6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    secondaryButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '500',
    },
    privacyNote: {
        fontSize: 12,
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default PermissionScreen;
