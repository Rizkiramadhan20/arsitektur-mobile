import React from 'react'

import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native'

import { useRouter, useLocalSearchParams } from 'expo-router'

import { MotiView } from 'moti'

import { Ionicons } from '@expo/vector-icons'

import { fetchProperties } from '@/config/lib/FetchProperties'

import { useStateSearch } from '@/components/properties/search/lib/useStateSearch'

import { useTheme } from '@/context/ThemeProvider'

import SearchCard from '@/components/properties/search/SearchCard'

export default function Search() {
    const router = useRouter()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const { q } = useLocalSearchParams<{ q?: string }>()

    const {
        searchQuery,
        filteredProperties,
        loading,
        recentSearches,
        recentViews,
        hasSearched,
        showAllRecentSearches,
        searchInputRef,
        setShowAllRecentSearches,
        setRecentSearches,
        handleSearchChange,
        clearSearch,
        removeRecentSearch,
        handleRecentSearchPress,
        handlePropertyClick,
        handleSearchSubmit,
    } = useStateSearch({ initialQuery: q || '', fetchProperties })

    return (
        <View className={`flex-1 ${isDark ? 'bg-background' : 'bg-white'}`}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#000000" : "#ffffff"} />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className={`h-10 w-10 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-gray-100'} items-center justify-center`}
                >
                    <Ionicons name="arrow-back" size={20} color={isDark ? "white" : "black"} />
                </TouchableOpacity>
                <Text className={`${isDark ? 'text-primary' : 'text-gray-900'} text-lg font-semibold`}>Cari</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="pb-6">
                    {/* Search Bar */}
                    <MotiView
                        from={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600 }}
                        className="px-4"
                    >
                        <View
                            className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} rounded-3xl px-5 py-4 border`}
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                elevation: 4,
                            }}
                        >
                            <View className="flex-row items-center">
                                <View className={`h-10 w-10 rounded-2xl ${isDark ? 'bg-accent-blue-600/20 border border-accent-blue-600/30' : 'bg-accent-blue-600/15 border border-accent-blue-600/30'} items-center justify-center mr-4`}>
                                    <Ionicons name="search" size={20} color="#3b82f6" />
                                </View>
                                <TextInput
                                    ref={searchInputRef}
                                    placeholder="Cari properti, lokasi, atau tipe..."
                                    placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                                    className={`flex-1 ${isDark ? 'text-primary' : 'text-gray-900'} text-base font-medium`}
                                    value={searchQuery}
                                    onChangeText={handleSearchChange}
                                    onSubmitEditing={handleSearchSubmit}
                                    returnKeyType="search"
                                />
                                {searchQuery.length > 0 && (
                                    <TouchableOpacity
                                        onPress={clearSearch}
                                        className={`h-8 w-8 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-gray-200'} items-center justify-center ml-3`}
                                    >
                                        <Ionicons name="close" size={16} color={isDark ? "#9ca3af" : "#6b7280"} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </MotiView>

                    {/* Recent Search Section - Show if there are recent searches and no active search */}
                    {recentSearches.length > 0 && !searchQuery.trim() && (
                        <MotiView
                            from={{ opacity: 0, translateY: 20 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: 'timing', duration: 600, delay: 200 }}
                            className="px-4 mt-8"
                        >
                            <View className="flex-row items-center justify-between mb-6">
                                <View className="flex-row items-center">
                                    <View className={`w-1 h-6 ${isDark ? 'bg-accent-blue-600' : 'bg-accent-blue-600'} rounded-full mr-3`} />
                                    <Text className={`${isDark ? 'text-primary' : 'text-gray-900'} text-xl font-bold`}>Pencarian Terbaru</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => setRecentSearches([])}
                                    className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-3 py-1.5 rounded-lg border`}
                                >
                                    <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>Hapus Semua</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="mb-2">
                                <View className="flex-row flex-wrap gap-2">
                                    {(showAllRecentSearches ? recentSearches : recentSearches.slice(0, 4)).map((search, index) => (
                                        <MotiView
                                            key={index}
                                            from={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: 'timing', duration: 400, delay: 300 + (index * 100) }}
                                        >
                                            <TouchableOpacity
                                                className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} rounded-2xl px-4 py-3 border flex-row items-center space-x-3`}
                                                onPress={() => handleRecentSearchPress(search)}
                                                style={{
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 4,
                                                    elevation: 2,
                                                }}
                                            >
                                                <View className={`h-8 w-8 rounded-full ${isDark ? 'bg-accent-blue-600/20' : 'bg-accent-blue-600/15'} items-center justify-center`}>
                                                    <Ionicons name="search" size={14} color="#60a5fa" />
                                                </View>

                                                <Text className={`${isDark ? 'text-primary' : 'text-gray-900'} text-sm font-medium`} numberOfLines={1}>
                                                    {search}
                                                </Text>

                                                <TouchableOpacity
                                                    onPress={() => removeRecentSearch(showAllRecentSearches ? index : recentSearches.findIndex(s => s === search))}
                                                    className={`h-5 w-5 rounded-full ${isDark ? 'bg-border-secondary' : 'bg-gray-300'} items-center justify-center`}
                                                >
                                                    <Ionicons name="close" size={12} color={isDark ? '#a1a1aa' : '#6b7280'} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        </MotiView>
                                    ))}
                                </View>

                                {/* Show "Lihat Semua" button if there are more than 4 searches */}
                                {recentSearches.length > 4 && (
                                    <MotiView
                                        from={{ opacity: 0, translateY: 10 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{ type: 'timing', duration: 400, delay: 700 }}
                                        className="mt-3"
                                    >
                                        <TouchableOpacity
                                            onPress={() => setShowAllRecentSearches(!showAllRecentSearches)}
                                            className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-4 py-2 rounded-xl border flex-row items-center justify-center`}
                                        >
                                            <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm font-medium mr-2`}>
                                                {showAllRecentSearches ? 'Tutup' : `Lihat Semua (${recentSearches.length})`}
                                            </Text>
                                            <Ionicons
                                                name={showAllRecentSearches ? "chevron-up" : "chevron-down"}
                                                size={16}
                                                color="#9ca3af"
                                            />
                                        </TouchableOpacity>
                                    </MotiView>
                                )}
                            </View>
                        </MotiView>
                    )}

                    {/* Search Results / Recent View Section - Show if user has searched or has recent searches/views */}
                    {(hasSearched || recentSearches.length > 0 || recentViews.length > 0) && (
                        <MotiView
                            from={{ opacity: 0, translateY: 20 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: 'timing', duration: 600, delay: 400 }}
                            className="px-4 mt-6"
                        >
                            {/* Enhanced Section Header */}
                            <View>
                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center flex-1">
                                        <View className="flex-1">
                                            <Text className={`${isDark ? 'text-primary' : 'text-gray-900'} text-xl font-bold mb-1`}>
                                                {searchQuery.trim() ? 'Hasil Pencarian' : 'Tampilan Terbaru'}
                                            </Text>
                                            <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>
                                                {searchQuery.trim()
                                                    ? `Ditemukan ${filteredProperties.length} properti untuk "${searchQuery}"`
                                                    : 'Properti yang baru saja Anda lihat'
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    {searchQuery.trim() && filteredProperties.length > 0 && (
                                        <View className="bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/30">
                                            <Text className="text-emerald-400 text-sm font-semibold">
                                                {filteredProperties.length} ditemukan
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <View className="flex flex-col gap-4">
                                    {loading ? (
                                        <View className="items-center pt-64">
                                            <MotiView
                                                from={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: 'timing', duration: 600 }}
                                            >
                                                <View className="w-16 h-16 bg-zinc-800 rounded-full items-center justify-center mb-4">
                                                    <Ionicons name="hourglass-outline" size={32} color="#9ca3af" />
                                                </View>
                                            </MotiView>
                                            <Text className="text-zinc-400 text-lg font-medium">Mencari properti...</Text>
                                        </View>
                                    ) : hasSearched && searchQuery.trim() ? (
                                        filteredProperties.length > 0 ? (
                                            filteredProperties.map((property, index) => (
                                                <MotiView
                                                    key={property.id}
                                                    from={{ opacity: 0, translateY: 30 }}
                                                    animate={{ opacity: 1, translateY: 0 }}
                                                    transition={{ type: 'timing', duration: 500, delay: 600 + (index * 100) }}
                                                >
                                                    <SearchCard
                                                        property={property}
                                                        isDark={isDark}
                                                        onPress={() => handlePropertyClick(property)}
                                                    />
                                                </MotiView>
                                            ))
                                        ) : (
                                            <MotiView
                                                from={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: 'timing', duration: 600, delay: 600 }}
                                            >
                                                <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} rounded-3xl p-8 border`}>
                                                    <View className="items-center">
                                                        <View className={`w-24 h-24 ${isDark ? 'bg-accent-blue-600/10 border border-accent-blue-600/30' : 'bg-accent-blue-600/10 border border-accent-blue-600/30'} rounded-3xl items-center justify-center mb-6`}>
                                                            <Ionicons name="search" size={48} color="#60a5fa" />
                                                        </View>
                                                        <Text className={`${isDark ? 'text-primary' : 'text-gray-900'} text-xl font-bold mb-3`}>Tidak Ada Properti Ditemukan</Text>
                                                        <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-center text-base leading-6 mb-6`}>
                                                            Tidak ada properti ditemukan untuk &quot;{searchQuery}&quot;. Coba cari dengan kata kunci yang berbeda atau jelajahi properti unggulan kami.
                                                        </Text>
                                                        <View className="flex-row flex gap-2">
                                                            <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-4 py-2 rounded-xl border flex-row items-center`}>
                                                                <Ionicons name="home" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                                                <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>Rumah</Text>
                                                            </View>
                                                            <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-4 py-2 rounded-xl border flex-row items-center`}>
                                                                <Ionicons name="business" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                                                <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>Apartemen</Text>
                                                            </View>
                                                            <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-4 py-2 rounded-xl border flex-row items-center`}>
                                                                <Ionicons name="home-outline" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                                                <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>Villa</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </MotiView>
                                        )
                                    ) : !hasSearched && recentViews.length > 0 ? (
                                        recentViews.map((property, index) => (
                                            <MotiView
                                                key={property.id}
                                                from={{ opacity: 0, translateY: 30 }}
                                                animate={{ opacity: 1, translateY: 0 }}
                                                transition={{ type: 'timing', duration: 500, delay: 600 + (index * 100) }}
                                            >
                                                <SearchCard
                                                    property={property}
                                                    isDark={isDark}
                                                    onPress={() => handlePropertyClick(property)}
                                                />
                                            </MotiView>
                                        ))
                                    ) : (
                                        <MotiView
                                            from={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: 'timing', duration: 600, delay: 600 }}
                                        >
                                            <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} rounded-3xl p-8 border items-center justify-center`}>
                                                <MotiView
                                                    from={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ type: 'timing', duration: 600 }}
                                                >
                                                    <View className={`w-16 h-16 ${isDark ? 'bg-accent-blue-600/20' : 'bg-accent-blue-600/10'} rounded-full items-center justify-center mb-4`}>
                                                        <Ionicons name="eye" size={32} color="#60a5fa" />
                                                    </View>
                                                </MotiView>
                                                <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-lg font-medium`}>Tidak Ada Tampilan Terbaru</Text>
                                            </View>
                                        </MotiView>
                                    )}
                                </View>
                            </View>
                        </MotiView>
                    )}

                    {!hasSearched && recentSearches.length === 0 && recentViews.length === 0 && (
                        <MotiView
                            from={{ opacity: 0, translateY: 20 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: 'timing', duration: 600, delay: 400 }}
                            className="px-4 mt-12"
                        >
                            <View className="items-center py-16">
                                <MotiView
                                    from={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'timing', duration: 800, delay: 600 }}
                                >
                                    <View className={`w-24 h-24 ${isDark ? 'bg-accent-blue-600/10 border border-accent-blue-600/30' : 'bg-accent-blue-600/10 border border-accent-blue-600/30'} rounded-3xl items-center justify-center mb-6`}>
                                        <Ionicons name="search" size={48} color="#60a5fa" />
                                    </View>
                                </MotiView>

                                <MotiView
                                    from={{ opacity: 0, translateY: 20 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 600, delay: 800 }}
                                >
                                    <Text className={`${isDark ? 'text-primary' : 'text-gray-900'} text-2xl font-bold mb-3`}>Temukan Rumah Impian Anda</Text>
                                </MotiView>

                                <MotiView
                                    from={{ opacity: 0, translateY: 20 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 600, delay: 1000 }}
                                >
                                    <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-center text-base leading-6 mb-8 max-w-xs`}>
                                        Cari properti berdasarkan alamat, kota, tipe, atau kata kunci apa pun untuk menemukan rumah sempurna Anda
                                    </Text>
                                </MotiView>

                                <MotiView
                                    from={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'timing', duration: 600, delay: 1200 }}
                                >
                                    <View className="flex-row space-x-4">
                                        <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-4 py-2 rounded-xl border flex-row items-center`}>
                                            <Ionicons name="home" size={16} color={isDark ? '#a1a1aa' : '#6b7280'} style={{ marginRight: 6 }} />
                                            <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>Rumah</Text>
                                        </View>
                                        <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-4 py-2 rounded-xl border flex-row items-center`}>
                                            <Ionicons name="business" size={16} color={isDark ? '#a1a1aa' : '#6b7280'} style={{ marginRight: 6 }} />
                                            <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>Apartemen</Text>
                                        </View>
                                        <View className={`${isDark ? 'bg-card border-card-border' : 'bg-gray-100 border-gray-200'} px-4 py-2 rounded-xl border flex-row items-center`}>
                                            <Ionicons name="home-outline" size={16} color={isDark ? '#a1a1aa' : '#6b7280'} style={{ marginRight: 6 }} />
                                            <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm`}>Villa</Text>
                                        </View>
                                    </View>
                                </MotiView>
                            </View>
                        </MotiView>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}