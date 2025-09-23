import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

export default function TypeFilter({
    onOpenFilter,
    onReset,
    hasActiveFilters,
    provinces,
    cities,
    statuses
}: TypeFilterProps) {
    return (
        <View className='px-2 py-4'>
            <View className='bg-zinc-900 rounded-2xl p-4 border border-zinc-800'>
                <View className='flex-row items-center justify-between mb-4'>
                    <Text className='text-white text-lg font-semibold'>Filter Properties</Text>
                    {hasActiveFilters && (
                        <TouchableOpacity onPress={onReset} className='bg-red-600/20 px-3 py-1 rounded-lg border border-red-600/30'>
                            <Text className='text-red-400 text-sm font-medium'>Reset</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className='flex-row flex-wrap gap-3'>
                    <TouchableOpacity
                        onPress={onOpenFilter}
                        className='flex-row items-center bg-zinc-800 px-4 py-3 rounded-xl border border-zinc-700 flex-1'
                    >
                        <Ionicons name='options-outline' size={18} color={'#6b7280'} />
                        <Text className='text-zinc-400 ml-2 flex-1'>Filter by Location & Status</Text>
                        <Ionicons name='chevron-forward' size={16} color={'#6b7280'} />
                    </TouchableOpacity>
                </View>

                <View className='mt-4 pt-4 border-t border-zinc-800'>
                    <Text className='text-zinc-400 text-sm mb-2'>Available Filters:</Text>
                    <View className='flex-row flex-wrap gap-2'>
                        <View className='bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700'>
                            <Text className='text-zinc-300 text-xs'>{provinces.length} Provinces</Text>
                        </View>
                        <View className='bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700'>
                            <Text className='text-zinc-300 text-xs'>{cities.length} Cities</Text>
                        </View>
                        <View className='bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700'>
                            <Text className='text-zinc-300 text-xs'>{statuses.length} Status</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
