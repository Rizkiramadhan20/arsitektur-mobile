import React from 'react'

import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useRouter } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import AllPropertiesNotfound from '@/components/properties/all-properties/AllPropertiesNotfound'

import AllProperstiesSkelaton from '@/components/properties/all-properties/AllProperstiesSkelaton'

import AllPropertiesFilter from "@/components/properties/all-properties/AllPropertiesFilter"

import { SafeAreaView } from 'react-native-safe-area-context'

import { MotiView } from 'moti'

import FilterModal from '@/components/properties/all-properties/modal/FilterModal'

import { useStateAllProperties } from '@/components/properties/all-properties/lib/useStateAllProperties'

import AllPropertiesCard from '@/components/properties/all-properties/card/AllPropertiesCard'

import { useTheme } from '@/context/ThemeProvider'

export default function AllProperties() {
    const router = useRouter()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const {
        // State
        loading,
        error,
        isLoadingMore,
        endReachedDuringMomentum,
        searchQuery,
        showFilter,
        selectedType,
        selectedProvince,
        selectedCity,
        selectedStatus,

        // Computed values
        types,
        provinces,
        cities,
        statuses,
        hasActiveFilters,
        displayed,

        // Actions
        setSearchQuery,
        setShowFilter,
        setSelectedType,
        setSelectedProvince,
        setSelectedCity,
        setSelectedStatus,
        setEndReachedDuringMomentum,
        loadMore,
        onRefresh,
        resetFilters
    } = useStateAllProperties()

    if (loading) {
        return (
            <AllProperstiesSkelaton />
        )
    }

    if (error) {
        return (
            <AllPropertiesNotfound />
        )
    }

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-background' : 'bg-gray-50'}`}>
            {/* Header + Search */}
            <View className='px-2 pt-2 pb-3'>
                {/* Header */}
                <MotiView
                    from={{ opacity: 0, translateY: -12 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 450 }}
                >
                    <View className='flex-row items-center justify-between mt-2 mb-2'>
                        <TouchableOpacity onPress={() => router.back()} className={`h-10 w-10 rounded-full items-center justify-center border ${isDark ? 'border-zinc-800 bg-zinc-900' : 'border-gray-300 bg-gray-200'}`}>
                            <Ionicons name='chevron-back' size={22} color={isDark ? '#ffffff' : '#000000'} />
                        </TouchableOpacity>
                        <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>All Properties</Text>
                        <View className='h-10 w-10' />
                    </View>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 12 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 450, delay: 150 }}
                >
                    <View className={`mt-2 ${isDark ? 'bg-background border-zinc-800' : 'bg-white border-gray-200'} rounded-2xl px-4 py-3 border`}>
                        <View className='flex-row items-center'>
                            <View className={`h-9 w-9 rounded-xl ${isDark ? 'bg-zinc-800' : 'bg-gray-100'} items-center justify-center mr-3`}>
                                <Ionicons name="search" size={20} color={isDark ? "#a1a1aa" : "#6b7280"} />
                            </View>
                            <TextInput
                                placeholder='Search by Address, City, or ZIP'
                                placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                                className={`flex-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={() => {
                                    if (searchQuery.trim()) {
                                        router.push(`/properties/search?q=${encodeURIComponent(searchQuery)}`)
                                    }
                                }}
                                returnKeyType='search'
                            />
                            <TouchableOpacity className='h-10 w-10 rounded-xl bg-accent-blue-600 items-center justify-center ml-3' onPress={() => setShowFilter(true)}>
                                <Ionicons name='options-outline' size={18} color={'#ffffff'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </MotiView>
            </View>

            {/* Grid */}
            <FlatList
                data={displayed}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                columnWrapperStyle={{ gap: 8, paddingHorizontal: 8 }}
                contentContainerStyle={{ paddingBottom: 24, gap: 8 }}
                renderItem={({ item, index }) => (
                    <View style={{ flex: 1 }}>
                        <AllPropertiesCard item={item} index={index} />
                    </View>
                )}
                onEndReachedThreshold={0.05}
                onMomentumScrollBegin={() => setEndReachedDuringMomentum(false)}
                onEndReached={() => {
                    if (hasActiveFilters) return
                    if (!endReachedDuringMomentum) {
                        setEndReachedDuringMomentum(true)
                        loadMore()
                    }
                }}
                refreshing={loading}
                onRefresh={onRefresh}
                ListFooterComponent={isLoadingMore ? (
                    <View className='px-2 py-4'>
                        <Text className='text-center text-zinc-400'>Loading more...</Text>
                    </View>
                ) : null}
                ListEmptyComponent={!loading ? (
                    <View className='px-2'>
                        <AllPropertiesFilter
                            onOpenFilter={() => setShowFilter(true)}
                            onReset={resetFilters}
                            hasActiveFilters={hasActiveFilters}
                            types={types}
                            statuses={statuses}
                            provinces={provinces}
                            cities={cities}
                        />
                    </View>
                ) : null}
                showsVerticalScrollIndicator={false}
            />

            <FilterModal
                visible={showFilter}
                onClose={() => setShowFilter(false)}
                types={types}
                statuses={statuses}
                provinces={provinces}
                cities={cities}
                selectedType={selectedType}
                selectedStatus={selectedStatus}
                selectedProvince={selectedProvince}
                selectedCity={selectedCity}
                onSelectType={setSelectedType}
                onSelectStatus={setSelectedStatus}
                onSelectProvince={setSelectedProvince}
                onSelectCity={setSelectedCity}
                onReset={resetFilters}
                onApply={() => setShowFilter(false)}
            />
        </SafeAreaView>
    )
}