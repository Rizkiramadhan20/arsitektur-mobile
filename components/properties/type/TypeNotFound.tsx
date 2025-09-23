import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

import { useRouter } from 'expo-router'

export default function TypeNotFound() {
    const router = useRouter()

    return (
        <SafeAreaView className='flex-1 bg-background'>
            {/* Header */}
            <View className='px-2 pt-2 pb-3'>
                <View className='flex-row items-center justify-between mt-2 mb-2'>
                    <TouchableOpacity onPress={() => router.back()} className='h-10 w-10 rounded-full items-center justify-center border border-zinc-800 bg-zinc-900'>
                        <Ionicons name='chevron-back' size={22} color={'#ffffff'} />
                    </TouchableOpacity>
                    <Text className='text-white text-lg font-semibold'>Properties</Text>
                    <View className='h-10 w-10' />
                </View>
            </View>

            {/* Content */}
            <View className='flex-1 items-center justify-center px-4'>
                <View className='items-center'>
                    <View className='h-24 w-24 rounded-full bg-zinc-800 items-center justify-center mb-6'>
                        <Ionicons name='home-outline' size={40} color={'#6b7280'} />
                    </View>

                    <Text className='text-white text-xl font-semibold mb-2 text-center'>
                        No Properties Found
                    </Text>

                    <Text className='text-zinc-400 text-center mb-6 leading-6'>
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
