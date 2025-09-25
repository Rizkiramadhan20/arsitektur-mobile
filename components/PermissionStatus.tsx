import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Linking
} from 'react-native';
import { usePermissions } from '@/context/PermissionContext';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeProvider';

const PermissionStatus = () => {
    const {
        cameraPermission,
        locationPermission,
        requestPermissions
    } = usePermissions();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const openAppSettings = () => {
        Linking.openSettings();
    };

    const handleRequestPermissions = () => {
        Alert.alert(
            'Izin Diperlukan',
            'Untuk menggunakan fitur lengkap aplikasi, izinkan akses kamera dan lokasi.',
            [
                { text: 'Batal', style: 'cancel' },
                { text: 'Buka Pengaturan', onPress: openAppSettings },
                { text: 'Minta Izin', onPress: requestPermissions },
            ]
        );
    };

    const getPermissionStatus = (permission: boolean | null) => {
        if (permission === true) return { status: 'granted', color: '#10B981', icon: 'checkmark-circle' };
        if (permission === false) return { status: 'denied', color: '#EF4444', icon: 'close-circle' };
        return { status: 'unknown', color: '#6B7280', icon: 'help-circle' };
    };

    const cameraStatus = getPermissionStatus(cameraPermission);
    const locationStatus = getPermissionStatus(locationPermission);

    const allGranted = cameraPermission && locationPermission;

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#18181b' : '#ffffff' }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDark ? '#ffffff' : '#1F2937' }]}>Status Izin</Text>
                {!allGranted && (
                    <TouchableOpacity onPress={handleRequestPermissions} style={styles.requestButton}>
                        <Text style={styles.requestButtonText}>Minta Izin</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.permissionList}>
                <View style={styles.permissionItem}>
                    <View style={styles.permissionInfo}>
                        <Ionicons name="camera" size={20} color="#3B82F6" />
                        <Text style={[styles.permissionName, { color: isDark ? '#E5E7EB' : '#374151' }]}>Kamera</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Ionicons
                            name={cameraStatus.icon as any}
                            size={20}
                            color={cameraStatus.color}
                        />
                        <Text style={[styles.statusText, { color: cameraStatus.color }]}>
                            {cameraStatus.status === 'granted' ? 'Diizinkan' :
                                cameraStatus.status === 'denied' ? 'Ditolak' : 'Tidak Diketahui'}
                        </Text>
                    </View>
                </View>

                <View style={styles.permissionItem}>
                    <View style={styles.permissionInfo}>
                        <Ionicons name="location" size={20} color="#10B981" />
                        <Text style={[styles.permissionName, { color: isDark ? '#E5E7EB' : '#374151' }]}>Lokasi</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Ionicons
                            name={locationStatus.icon as any}
                            size={20}
                            color={locationStatus.color}
                        />
                        <Text style={[styles.statusText, { color: locationStatus.color }]}>
                            {locationStatus.status === 'granted' ? 'Diizinkan' :
                                locationStatus.status === 'denied' ? 'Ditolak' : 'Tidak Diketahui'}
                        </Text>
                    </View>
                </View>

            </View>

            {!allGranted && (
                <View style={[styles.warningContainer, { backgroundColor: isDark ? '#374151' : '#FEF3C7' }]}>
                    <Ionicons name="warning" size={16} color="#F59E0B" />
                    <Text style={[styles.warningText, { color: isDark ? '#F3F4F6' : '#92400E' }]}>
                        Beberapa fitur mungkin tidak berfungsi optimal tanpa izin yang diperlukan
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    requestButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    requestButtonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '500',
    },
    permissionList: {
        gap: 12,
    },
    permissionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    permissionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    permissionName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
        padding: 12,
        backgroundColor: '#FEF3C7',
        borderRadius: 8,
    },
    warningText: {
        fontSize: 12,
        color: '#92400E',
        flex: 1,
    },
});

export default PermissionStatus;
