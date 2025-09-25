import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { useTheme } from '@/context/ThemeProvider'

export default function TypeFilter({
    onOpenFilter,
    onReset,
    hasActiveFilters,
    provinces,
    cities,
    statuses
}: TypeFilterProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <View className='px-2 py-4'>
            <View className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} rounded-2xl p-4 border`}>
                <View className='flex-row items-center justify-between mb-4'>
                    <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>Filter Properties</Text>
                    {hasActiveFilters && (
                        <TouchableOpacity onPress={onReset} className='bg-red-600/20 px-3 py-1 rounded-lg border border-red-600/30'>
                            <Text className='text-red-400 text-sm font-medium'>Reset</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className='flex-row flex-wrap gap-3'>
                    <TouchableOpacity
                        onPress={onOpenFilter}
                        className={`flex-row items-center ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'} px-4 py-3 rounded-xl border flex-1`}
                    >
                        <Ionicons name='options-outline' size={18} color={isDark ? '#6b7280' : '#9ca3af'} />
                        <Text className={`${isDark ? 'text-zinc-400' : 'text-gray-500'} ml-2 flex-1`}>Filter by Location & Status</Text>
                        <Ionicons name='chevron-forward' size={16} color={isDark ? '#6b7280' : '#9ca3af'} />
                    </TouchableOpacity>
                </View>

                <View className={`mt-4 pt-4 border-t ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
                    <Text className={`${isDark ? 'text-zinc-400' : 'text-gray-500'} text-sm mb-2`}>Available Filters:</Text>
                    <View className='flex-row flex-wrap gap-2'>
                        <View className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'} px-3 py-1 rounded-lg border`}>
                            <Text className={`${isDark ? 'text-zinc-300' : 'text-gray-600'} text-xs`}>{provinces.length} Provinces</Text>
                        </View>
                        <View className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'} px-3 py-1 rounded-lg border`}>
                            <Text className={`${isDark ? 'text-zinc-300' : 'text-gray-600'} text-xs`}>{cities.length} Cities</Text>
                        </View>
                        <View className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'} px-3 py-1 rounded-lg border`}>
                            <Text className={`${isDark ? 'text-zinc-300' : 'text-gray-600'} text-xs`}>{statuses.length} Status</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
