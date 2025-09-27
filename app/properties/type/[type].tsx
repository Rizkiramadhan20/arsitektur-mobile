import React from 'react'

import { FlatList, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native'

import { useRouter, useLocalSearchParams } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import { SafeAreaView } from 'react-native-safe-area-context'

import { MotiView } from 'moti'

import TypeNotFound from '@/components/properties/type/TypeNotFound'

import TypeSkeleton from '@/components/properties/type/TypeSkeleton'

import TypeFilter from '@/components/properties/type/TypeFilter'

import FilterModal from '@/components/properties/all-properties/modal/FilterModal'

import AllPropertiesCard from '@/components/properties/all-properties/card/AllPropertiesCard'

import { useStateType } from '@/components/properties/type/lib/useStateType'

export default function TypePage() {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === 'dark'
    const router = useRouter()
    const { type } = useLocalSearchParams<{ type: string }>()

    const {
        // State
        loading,
        error,
        isLoadingMore,
        endReachedDuringMomentum,
        searchQuery,
        showFilter,
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
        setSelectedProvince,
        setSelectedCity,
        setSelectedStatus,
        setEndReachedDuringMomentum,
        loadMore,
        onRefresh,
        resetFilters
    } = useStateType({ type: type || '' })

    if (loading) {
        return <TypeSkeleton />
    }

    if (error) {
        return <TypeNotFound />
    }

    return (
        <SafeAreaView className='flex-1'>
            {/* Header + Search */}
            <View className='px-2 pt-2 pb-3'>
                {/* Header */}
                <MotiView
                    from={{ opacity: 0, translateY: -12 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 450 }}
                >
                    <View className='flex-row items-center justify-between mt-2 mb-2'>
                        <TouchableOpacity onPress={() => router.back()} className='h-10 w-10 rounded-full items-center justify-center border border-gray-300 dark:border-gray-700'>
                            <Ionicons name='chevron-back' size={22} color={isDark ? '#ffffff' : '#000000'} />
                        </TouchableOpacity>
                        <Text className='text-primary text-lg font-semibold capitalize'>{type} Properties</Text>
                        <View className='h-10 w-10' />
                    </View>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 12 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 450, delay: 150 }}
                >
                    <View className='mt-2 rounded-2xl px-4 py-3 border border-gray-300 dark:border-gray-700'>
                        <View className='flex-row items-center'>
                            <View className='h-9 w-9 rounded-xl border border-gray-300 dark:border-gray-700 items-center justify-center mr-3'>
                                <Ionicons name="search" size={20} color="#6b7280" />
                            </View>
                            <TextInput
                                placeholder='Search by Address, City, or ZIP'
                                placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                                className='flex-1 text-primary'
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
                        <Text className='text-center text-secondary'>Loading more...</Text>
                    </View>
                ) : null}
                ListEmptyComponent={!loading ? (
                    <View className='px-2'>
                        <TypeFilter
                            onOpenFilter={() => setShowFilter(true)}
                            onReset={resetFilters}
                            hasActiveFilters={hasActiveFilters}
                            provinces={provinces}
                            cities={cities}
                            statuses={statuses}
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
                selectedType={type || null}
                selectedStatus={selectedStatus || null}
                selectedProvince={selectedProvince || null}
                selectedCity={selectedCity || null}
                onSelectType={() => { }} // Disabled for type page
                onSelectStatus={setSelectedStatus}
                onSelectProvince={setSelectedProvince}
                onSelectCity={setSelectedCity}
                onReset={resetFilters}
                onApply={() => setShowFilter(false)}
            />
        </SafeAreaView>
    )
}