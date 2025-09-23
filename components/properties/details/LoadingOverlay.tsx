import { View, Text } from 'react-native'

import React from 'react'

import { MotiView } from 'moti'

import { Easing } from 'react-native-reanimated'

import loading from '@/assets/Properties/loading.json'
import LottieView from 'lottie-react-native'

type LoadingOverlayProps = {
    title?: string
}

export default function LoadingOverlay({ title }: LoadingOverlayProps) {
    return (
        <View className='flex-1 items-center justify-center bg-background'>
            {/* Top loader bar */}
            <View className='absolute top-0 left-0 right-0 h-2 bg-white/8 overflow-hidden'>
                <MotiView
                    from={{ translateX: -100 }}
                    animate={{ translateX: 360 }}
                    transition={{ type: 'timing', duration: 1200, easing: Easing.inOut(Easing.ease), loop: true }}
                    className='w-32 h-2 bg-blue-600'
                />
            </View>
            <View className='items-center'>
                {/* Lottie animation */}
                <View className='w-64 h-40 justify-center items-center'>
                    <LottieView source={loading} autoPlay loop={true} style={{ width: 200, height: 120 }} />
                </View>

                {/* Loading Text */}
                <MotiView
                    from={{ opacity: 0, translateY: 8 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 450 }}
                    className='max-w-sm'
                >
                    <Text className='text-white text-lg font-semibold mt-4 text-center'>
                        {title ? `Memuat ${title}...` : 'Loading Property...'}
                    </Text>
                </MotiView>

                {/* Subtitle */}
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing', duration: 600, delay: 150 }}
                    className='max-w-sm'
                >
                    <Text className='text-zinc-400 text-sm mt-2 text-center px-8'>
                        {title ? 'Mohon tunggu, kami mengambil detail properti...' : 'Please wait while we fetch the property details...'}
                    </Text>
                </MotiView>
            </View>
        </View>
    )
}


