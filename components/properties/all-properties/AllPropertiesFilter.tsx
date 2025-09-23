import React from 'react'

import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

import { MotiView } from 'moti'

type AllPropertiesFilterProps = {
    onOpenFilter?: () => void
    onReset?: () => void
    hasActiveFilters?: boolean
    types?: string[]
    statuses?: string[]
    provinces?: string[]
    cities?: string[]
}

export default function AllPropertiesFilter({
    onOpenFilter,
    onReset,
    hasActiveFilters = false,
    types = [],
    statuses = [],
    provinces = [],
    cities = [],
}: AllPropertiesFilterProps) {
    const noOptions = types.length === 0 && statuses.length === 0 && provinces.length === 0 && cities.length === 0

    return (
        <View className='bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 mt-4'>
            <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 350 }}
                className='items-center'
            >
                <View className='w-14 h-14 rounded-2xl bg-zinc-800 items-center justify-center mb-3 border border-zinc-700'>
                    <Text className='text-2xl'>🧭</Text>
                </View>
                <Text className='text-white text-base font-semibold mb-1'>No properties found</Text>
                <Text className='text-zinc-400 text-sm text-center mb-4'>
                    {hasActiveFilters ? 'Try adjusting or clearing your filters.' : 'Try exploring by province, city, type, or status.'}
                </Text>

                {/* Suggested chips (disabled when empty) */}
                <View className='w-full'>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        {(types.slice(0, 6).length ? types.slice(0, 6) : ['Type']).map((label, idx) => (
                            <View key={`t-${idx}`} className={`px-3 py-2 rounded-xl border ${types.length ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'}`}>
                                <Text className={`text-sm ${types.length ? 'text-white' : 'text-zinc-600'}`}>{typeof label === 'string' ? label : 'Type'}</Text>
                            </View>
                        ))}
                        {(statuses.slice(0, 4).length ? statuses.slice(0, 4) : ['Status']).map((label, idx) => (
                            <View key={`s-${idx}`} className={`px-3 py-2 rounded-xl border ${statuses.length ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'}`}>
                                <Text className={`text-sm ${statuses.length ? 'text-white' : 'text-zinc-600'}`}>{typeof label === 'string' ? label : 'Status'}</Text>
                            </View>
                        ))}
                        {(provinces.slice(0, 6).length ? provinces.slice(0, 6) : ['Province']).map((label, idx) => (
                            <View key={`p-${idx}`} className={`px-3 py-2 rounded-xl border ${provinces.length ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'}`}>
                                <Text className={`text-sm capitalize ${provinces.length ? 'text-white' : 'text-zinc-600'}`}>{typeof label === 'string' ? label : 'Province'}</Text>
                            </View>
                        ))}
                        {(cities.slice(0, 6).length ? cities.slice(0, 6) : ['City']).map((label, idx) => (
                            <View key={`c-${idx}`} className={`px-3 py-2 rounded-xl border ${cities.length ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'}`}>
                                <Text className={`text-sm capitalize ${cities.length ? 'text-white' : 'text-zinc-600'}`}>{typeof label === 'string' ? label : 'City'}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View className='flex-row gap-2 mt-4 w-full'>
                    {hasActiveFilters ? (
                        <TouchableOpacity className='flex-1 px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-800 items-center' onPress={onReset}>
                            <Text className='text-white font-semibold'>Reset</Text>
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity className='flex-1 px-4 py-3 rounded-xl bg-accent-blue-600 items-center' onPress={onOpenFilter} disabled={noOptions && !onOpenFilter}>
                        <Text className='text-white font-semibold'>{noOptions ? 'No filters available' : 'Open Filters'}</Text>
                    </TouchableOpacity>
                </View>
            </MotiView>
        </View>
    )
}