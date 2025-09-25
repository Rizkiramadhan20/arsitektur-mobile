import React from 'react'

import { Text, View, Pressable } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { router } from 'expo-router'

import { useTheme } from '@/context/ThemeProvider'

export default function VerificationSuccess() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <View className={`flex-1 ${isDark ? 'bg-background' : 'bg-gray-50'} items-center justify-center px-8`}>
            <Ionicons name='checkmark-circle' size={72} color='#22C55E' />
            <Text className={`${isDark ? 'text-text-primary' : 'text-gray-900'} text-2xl font-semibold mt-4`}>Verified!</Text>
            <Text className={`${isDark ? 'text-text-secondary' : 'text-gray-500'} text-center mt-2`}>Your account has been verified successfully.</Text>

            <Pressable
                onPress={() => router.replace('/(tabs)/properties')}
                className='mt-8 bg-accent-blue-600 py-4 px-6 rounded-xl items-center'
                accessibilityLabel='Go to Properties'
            >
                <Text className={`${isDark ? 'text-text-primary' : 'text-white'} font-semibold`}>Continue</Text>
            </Pressable>
        </View>
    )
}