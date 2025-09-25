import React from 'react'
import { View, Text, Pressable } from 'react-native'
import LottieView from 'lottie-react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/context/ThemeProvider'

export default function PropertiesNotfound() {
    const router = useRouter()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <View className={`flex-1 items-center justify-center ${isDark ? 'bg-background' : 'bg-gray-50'} px-6`}>
            <View className="items-center">
                <LottieView
                    source={require('../../../assets/Properties/error.json')}
                    autoPlay
                    loop={false}
                    style={{ width: 180, height: 180 }}
                />
                <Text className={`mt-6 text-center text-xl font-semibold ${isDark ? 'text-text-primary' : 'text-gray-900'}`}>
                    Tidak ada properti ditemukan
                </Text>
                <Text className={`mt-2 max-w-[280px] text-center ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                    Coba ubah filter atau jelajahi daftar properti lainnya.
                </Text>

                <View className="mt-6 flex-row items-center justify-center gap-3">
                    <Pressable
                        className={`rounded-xl border ${isDark ? 'border-border-secondary bg-chip-inactive' : 'border-gray-300 bg-gray-100'} px-4 py-3`}
                        onPress={() => router.replace('/properties/search')}
                    >
                        <Text className={`text-center text-sm font-medium ${isDark ? 'text-text-primary' : 'text-gray-900'}`}>Ubah Pencarian</Text>
                    </Pressable>
                    <Pressable
                        className="rounded-xl bg-chip-active px-4 py-3"
                        onPress={() => router.replace('/(tabs)/properties')}
                    >
                        <Text className="text-center text-sm font-semibold text-white">Lihat Semua</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}