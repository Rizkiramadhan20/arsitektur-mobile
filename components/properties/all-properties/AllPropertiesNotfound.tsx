import { View, Text, TouchableOpacity } from 'react-native'

import React from 'react'

import { LinearGradient } from 'expo-linear-gradient'

import { MotiView } from 'moti'

import LottieView from "lottie-react-native"

import { Ionicons } from '@expo/vector-icons'

import blobs from "@/assets/Properties/mintenance.json"

export default function PropertiesNotfound() {
    return (
        <View className="flex-1 bg-background">
            <LinearGradient
                colors={['#000000', '#18181b', '#000000']}
                className="absolute inset-0"
            />

            {/* Main Content Container */}
            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 800 }}
                className="flex-1 items-center justify-center px-6"
            >
                {/* Card Container */}
                <MotiView
                    from={{ opacity: 0, translateY: 30 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 200 }}
                    className="w-full max-w-sm"
                >
                    <LinearGradient
                        colors={['#18181b', '#27272a', '#18181b']}
                        className="rounded-3xl p-8 border border-zinc-800 shadow-2xl"
                    >
                        {/* Illustration Container */}
                        <MotiView
                            from={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'timing', duration: 800, delay: 400 }}
                            className="items-center mb-8"
                        >
                            <View className="w-64 h-40 relative">
                                <LottieView
                                    source={blobs}
                                    style={{ width: "100%", height: "100%" }}
                                    autoPlay
                                    loop={true}
                                />
                            </View>
                        </MotiView>

                        {/* Text Content */}
                        <MotiView
                            from={{ opacity: 0, translateY: 20 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: 'timing', duration: 600, delay: 600 }}
                            className="items-center"
                        >
                            {/* Icon */}
                            <View className="w-16 h-16 bg-blue-500/10 rounded-full items-center justify-center mb-6">
                                <Ionicons name="construct-outline" size={32} color="#3b82f6" />
                            </View>

                            {/* Title */}
                            <Text className="text-2xl font-bold text-text-primary text-center mb-3">
                                Server Sedang Maintenance
                            </Text>

                            {/* Subtitle */}
                            <Text className="text-base text-text-secondary text-center mb-6 leading-6">
                                Kami sedang bekerja keras untuk meningkatkan pengalaman Anda. Kami akan kembali segera dengan sesuatu yang luar biasa!
                            </Text>

                            {/* Status Indicator */}
                            <View className="flex-row items-center bg-zinc-800/50 rounded-full px-4 py-2 mb-6">
                                <View className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" />
                                <Text className="text-sm text-text-tertiary font-medium">
                                    Perkiraan waktu: 2-4 jam
                                </Text>
                            </View>

                            {/* Action Button */}
                            <MotiView
                                from={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'timing', duration: 500, delay: 800 }}
                            >
                                <TouchableOpacity className="bg-blue-600 rounded-2xl px-6 py-3 active:scale-95">
                                    <Text className="text-white font-semibold text-center">
                                        Cek Lagi Nanti
                                    </Text>
                                </TouchableOpacity>
                            </MotiView>
                        </MotiView>
                    </LinearGradient>
                </MotiView>

                {/* Bottom Info */}
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing', duration: 600, delay: 1000 }}
                    className="mt-8 items-center"
                >
                    <Text className="text-xs text-text-tertiary text-center">
                        Butuh bantuan segera? Hubungi tim support kami
                    </Text>
                </MotiView>
            </MotiView>
        </View>
    )
}