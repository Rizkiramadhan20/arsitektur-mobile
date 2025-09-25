import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

import { useRouter } from 'expo-router'

import { useTheme } from '@/context/ThemeProvider'

export default function TypeNotFound() {
    const router = useRouter()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-background' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className='px-2 pt-2 pb-3'>
                <View className='flex-row items-center justify-between mt-2 mb-2'>
                    <TouchableOpacity onPress={() => router.back()} className={`h-10 w-10 rounded-full items-center justify-center border ${isDark ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
                        <Ionicons name='chevron-back' size={22} color={isDark ? '#ffffff' : '#000000'} />
                    </TouchableOpacity>
                    <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>Properties</Text>
                    <View className='h-10 w-10' />
                </View>
            </View>

            {/* Content */}
            <View className='flex-1 items-center justify-center px-4'>
                <View className='items-center'>
                    <View className={`h-24 w-24 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} items-center justify-center mb-6`}>
                        <Ionicons name='home-outline' size={40} color={isDark ? '#6b7280' : '#9ca3af'} />
                    </View>

                    <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold mb-2 text-center`}>
                        No Properties Found
                    </Text>

                    <Text className={`${isDark ? 'text-zinc-400' : 'text-gray-500'} text-center mb-6 leading-6`}>
                        We couldn&apos;t find any properties matching your criteria. Try adjusting your filters or search terms.
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.back()}
                        className='bg-accent-blue-600 px-6 py-3 rounded-xl flex-row items-center gap-2'
                    >
                        <Ionicons name='arrow-back' size={18} color={'#ffffff'} />
                        <Text className='text-white font-semibold'>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
