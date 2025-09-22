import { View, Text } from 'react-native'

import React from 'react'

import LottieView from 'lottie-react-native'

import image from "@/assets/Properties/window.json"

export default function LoadingOverlay() {
    return (
        <View className='flex-1 items-center justify-center'>
            <View className='items-center'>
                {/* Lottie Animation */}
                <LottieView
                    source={image}
                    autoPlay
                    style={{
                        width: 400,
                        height: 400,
                    }}
                />

                {/* Loading Text */}
                <Text className='text-white text-lg font-semibold mt-4'>
                    Loading Property...
                </Text>

                {/* Subtitle */}
                <Text className='text-zinc-400 text-sm mt-2 text-center px-8'>
                    Please wait while we fetch the property details
                </Text>

                {/* Loading Dots Animation */}
                <View className='flex-row items-center mt-6 space-x-2'>
                    <View className='w-2 h-2 bg-accent-blue-600 rounded-full animate-pulse' style={{ animationDelay: '0ms' }} />
                    <View className='w-2 h-2 bg-accent-blue-600 rounded-full animate-pulse' style={{ animationDelay: '150ms' }} />
                    <View className='w-2 h-2 bg-accent-blue-600 rounded-full animate-pulse' style={{ animationDelay: '300ms' }} />
                </View>
            </View>
        </View>
    )
}