import React from 'react'

import { Image, Text, TouchableOpacity, View } from 'react-native'

import { useRouter } from 'expo-router'

import { MotiView } from 'moti'

import { useTheme } from '@/context/ThemeProvider'

import { Ionicons } from '@expo/vector-icons'

export default function AllPropertiesCard({ item, index = 0 }: AllPropertiesCardProps) {
    const router = useRouter()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const handlePropertyClick = (property: Property) => {
        const query = new URLSearchParams({
            type: property.type,
            province: property.province,
            title: property.title,
        }).toString()
        router.push(`/properties/${property.slug}?${query}`)
    }

    return (
        <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 350, delay: 80 + index * 40 }}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'} rounded-2xl overflow-hidden border`}
                onPress={() => handlePropertyClick(item)}
            >
                <View className='h-44 w-full relative'>
                    <Image
                        source={item.thumbnail ? { uri: item.thumbnail } : require('../../../../assets/HomeScreen/img-1.jpg')}
                        className='w-full h-full'
                        resizeMode='cover'
                        defaultSource={require('../../../../assets/HomeScreen/img-1.jpg')}
                    />
                    <View className='absolute inset-0 bg-black/25' />
                    <View className='absolute bottom-2 left-2 bg-accent-blue-600/90 px-2 py-1 rounded-md border border-white/20'>
                        <Text className='text-white text-[10px] font-semibold capitalize'>{item.type}</Text>
                    </View>
                    <View className='absolute bottom-2 right-2 bg-emerald-500/90 px-2 py-1 rounded-md border border-white/10 flex-row items-center'>
                        <View className='w-2 h-2 bg-emerald-300 rounded-full mr-1' />
                        <Text className='text-white text-[10px] font-semibold capitalize'>{item.statusProject}</Text>
                    </View>
                </View>
                <View className='p-3'>
                    <Text className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`} numberOfLines={1}>{item.title}</Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="location" size={12} color={isDark ? "#a1a1aa" : "#6b7280"} style={{ marginRight: 4 }} />
                        <Text className={`${isDark ? 'text-zinc-400' : 'text-gray-500'} text-xs`} numberOfLines={1}>{item.city}, {item.province}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </MotiView>
    )
}