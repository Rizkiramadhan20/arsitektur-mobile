import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import PermissionStatus from '@/components/PermissionStatus'

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profil</Text>
            </View>

            <PermissionStatus />

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Informasi Akun</Text>
                <Text style={styles.infoText}>
                    Kelola izin aplikasi dan preferensi akun Anda di sini.
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
})