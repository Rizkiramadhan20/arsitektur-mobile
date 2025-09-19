import React from 'react'

import { Text, View, Pressable } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { router } from 'expo-router'

export default function VerificationSuccess() {
    return (
        <View className='flex-1 bg-black items-center justify-center px-8'>
            <Ionicons name='checkmark-circle' size={72} color={'#22C55E'} />
            <Text className='text-white text-2xl font-semibold mt-4'>Verified!</Text>
            <Text className='text-white/70 text-center mt-2'>Your account has been verified successfully.</Text>

            <Pressable
                onPress={() => router.replace('/(tabs)/properties')}
                className='mt-8 bg-blue-600 py-4 px-6 rounded-xl items-center'
                accessibilityLabel='Go to Properties'
            >
                <Text className='text-white font-semibold'>Continue</Text>
            </Pressable>
        </View>
    )
}