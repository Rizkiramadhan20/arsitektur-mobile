import React from 'react'

import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { MotiView } from 'moti'

type FilterModalProps = {
    visible: boolean
    onClose: () => void
    types: string[]
    statuses: string[]
    provinces: string[]
    cities: string[]
    selectedType: string | null
    selectedStatus: string | null
    selectedProvince: string | null
    selectedCity: string | null
    onSelectType: (t: string | null) => void
    onSelectStatus: (s: string | null) => void
    onSelectProvince: (p: string | null) => void
    onSelectCity: (c: string | null) => void
    onReset: () => void
    onApply?: () => void
}

export default function FilterModal({
    visible,
    onClose,
    types,
    statuses,
    provinces,
    cities,
    selectedType,
    selectedStatus,
    selectedProvince,
    selectedCity,
    onSelectType,
    onSelectStatus,
    onSelectProvince,
    onSelectCity,
    onReset,
    onApply,
}: FilterModalProps) {
    return (
        <Modal visible={visible} transparent animationType='none' onRequestClose={onClose}>
            <TouchableOpacity activeOpacity={1} className='flex-1' onPress={onClose}>
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing', duration: 200 }}
                    className='absolute inset-0 bg-black/60'
                />
                <View className='flex-1 justify-end'>
                    <MotiView
                        from={{ translateY: 40, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 40, opacity: 0 }}
                        transition={{ type: 'timing', duration: 250 }}
                        className='bg-zinc-900 border border-zinc-800 rounded-t-3xl px-4 pt-4 pb-6'
                    >
                        <View className='items-center mb-3'>
                            <View className='w-12 h-1.5 rounded-full bg-zinc-700' />
                        </View>
                        <Text className='text-white text-lg font-semibold mb-3'>Filter</Text>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Type */}
                            <Text className='text-zinc-300 mb-2'>Type</Text>
                            <View className='flex-row flex-wrap gap-2 mb-4'>
                                <TouchableOpacity onPress={() => onSelectType(null)} className={`px-3 py-2 rounded-xl border ${selectedType === null ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                    <Text className='text-white text-sm'>All</Text>
                                </TouchableOpacity>
                                {types.map(t => (
                                    <TouchableOpacity key={t} onPress={() => onSelectType(t)} className={`px-3 py-2 rounded-xl border ${selectedType === t ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                        <Text className='text-white text-sm capitalize'>{t}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Status */}
                            <Text className='text-zinc-300 mb-2'>Status</Text>
                            <View className='flex-row flex-wrap gap-2 mb-6'>
                                <TouchableOpacity onPress={() => onSelectStatus(null)} className={`px-3 py-2 rounded-xl border ${selectedStatus === null ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                    <Text className='text-white text-sm'>All</Text>
                                </TouchableOpacity>
                                {statuses.map(st => (
                                    <TouchableOpacity key={st} onPress={() => onSelectStatus(st)} className={`px-3 py-2 rounded-xl border ${selectedStatus === st ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                        <Text className='text-white text-sm capitalize'>{st}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Province */}
                            <Text className='text-zinc-300 mb-2'>Province</Text>
                            <View className='flex-row flex-wrap gap-2 mb-4'>
                                <TouchableOpacity onPress={() => onSelectProvince(null)} className={`px-3 py-2 rounded-xl border ${selectedProvince === null ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                    <Text className='text-white text-sm'>All</Text>
                                </TouchableOpacity>
                                {provinces.map(pv => (
                                    <TouchableOpacity key={pv} onPress={() => onSelectProvince(pv)} className={`px-3 py-2 rounded-xl border ${selectedProvince === pv ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                        <Text className='text-white text-sm capitalize'>{pv}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* City */}
                            <Text className='text-zinc-300 mb-2'>City</Text>
                            <View className='flex-row flex-wrap gap-2 mb-6'>
                                <TouchableOpacity onPress={() => onSelectCity(null)} className={`px-3 py-2 rounded-xl border ${selectedCity === null ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                    <Text className='text-white text-sm'>All</Text>
                                </TouchableOpacity>
                                {cities.map(ct => (
                                    <TouchableOpacity key={ct} onPress={() => onSelectCity(ct)} className={`px-3 py-2 rounded-xl border ${selectedCity === ct ? 'bg-accent-blue-600 border-accent-blue-500' : 'bg-zinc-800 border-zinc-700'}`}>
                                        <Text className='text-white text-sm capitalize'>{ct}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        <View className='flex-row gap-2 mt-2'>
                            <TouchableOpacity className='flex-1 px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-800 items-center' onPress={onReset}>
                                <Text className='text-white font-semibold'>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-1 px-4 py-3 rounded-xl bg-accent-blue-600 items-center' onPress={onApply ? onApply : onClose}>
                                <Text className='text-white font-semibold'>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </MotiView>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}