import React from 'react'

import { View, Text, Pressable } from 'react-native'

import LottieView from 'lottie-react-native'

import { useRouter } from 'expo-router'

export default function PropertiesNotfound() {
    const router = useRouter()

    return (
        <View className="flex-1 items-center justify-center bg-background px-6">
            <View className="items-center">
                <LottieView
                    source={require('../../../assets/Properties/error.json')}
                    autoPlay
                    loop={false}
                    style={{ width: 180, height: 180 }}
                />
                <Text className="mt-6 text-center text-xl font-semibold text-text-primary">
                    Tidak ada properti ditemukan
                </Text>
                <Text className="mt-2 max-w-[280px] text-center text-text-secondary">
                    Coba ubah filter atau jelajahi daftar properti lainnya.
                </Text>

                <View className="mt-6 flex-row items-center justify-center gap-3">
                    <Pressable
                        className="rounded-xl border border-border-secondary bg-chip-inactive px-4 py-3"
                        onPress={() => router.replace('/properties/search')}
                    >
                        <Text className="text-center text-sm font-medium text-text-primary">Ubah Pencarian</Text>
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