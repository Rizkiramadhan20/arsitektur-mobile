import React from 'react'

import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native'

import { useRouter, useLocalSearchParams } from 'expo-router'

import { MotiView } from 'moti'

import { Ionicons } from '@expo/vector-icons'

import { fetchProperties } from '@/config/lib/FetchProperties'

import { useStateSearch } from '@/components/properties/search/lib/useStateSearch'

export default function Search() {
    const router = useRouter()
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
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="h-10 w-10 rounded-full bg-zinc-800 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-semibold">Cari</Text>
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
                            className="bg-zinc-900/90 rounded-3xl px-5 py-4 border border-zinc-700/50"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                elevation: 4,
                            }}
                        >
                            <View className="flex-row items-center">
                                <View className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 items-center justify-center mr-4">
                                    <Ionicons name="search" size={20} color="white" />
                                </View>
                                <TextInput
                                    ref={searchInputRef}
                                    placeholder="Cari properti, lokasi, atau tipe..."
                                    placeholderTextColor="#6b7280"
                                    className="flex-1 text-white text-base font-medium"
                                    value={searchQuery}
                                    onChangeText={handleSearchChange}
                                    onSubmitEditing={handleSearchSubmit}
                                    returnKeyType="search"
                                />
                                {searchQuery.length > 0 && (
                                    <TouchableOpacity
                                        onPress={clearSearch}
                                        className="h-8 w-8 rounded-full bg-zinc-700 items-center justify-center ml-3"
                                    >
                                        <Ionicons name="close" size={16} color="#9ca3af" />
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
                                    <View className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3" />
                                    <Text className="text-white text-xl font-bold">Pencarian Terbaru</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => setRecentSearches([])}
                                    className="bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-700"
                                >
                                    <Text className="text-zinc-400 text-sm">Hapus Semua</Text>
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
                                                className="bg-zinc-800/80 rounded-2xl px-4 py-3 border border-zinc-700/50 flex-row items-center space-x-3"
                                                onPress={() => handleRecentSearchPress(search)}
                                                style={{
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 4,
                                                    elevation: 2,
                                                }}
                                            >
                                                <View className="h-8 w-8 rounded-full bg-blue-500/20 items-center justify-center">
                                                    <Ionicons name="search" size={14} color="#60a5fa" />
                                                </View>

                                                <Text className="text-white text-sm font-medium" numberOfLines={1}>
                                                    {search}
                                                </Text>

                                                <TouchableOpacity
                                                    onPress={() => removeRecentSearch(showAllRecentSearches ? index : recentSearches.findIndex(s => s === search))}
                                                    className="h-5 w-5 rounded-full bg-zinc-700 items-center justify-center"
                                                >
                                                    <Ionicons name="close" size={12} color="#9ca3af" />
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
                                            className="bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700/50 flex-row items-center justify-center"
                                        >
                                            <Text className="text-zinc-400 text-sm font-medium mr-2">
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
                            <View className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-700/30">
                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center flex-1">
                                        <View className="flex-1">
                                            <Text className="text-white text-xl font-bold mb-1">
                                                {searchQuery.trim() ? 'Hasil Pencarian' : 'Tampilan Terbaru'}
                                            </Text>
                                            <Text className="text-zinc-400 text-sm">
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
                                                    <TouchableOpacity
                                                        className="bg-zinc-800/90 rounded-3xl overflow-hidden border border-zinc-700/50 active:bg-zinc-700/90"
                                                        onPress={() => handlePropertyClick(property)}
                                                        style={{
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 6 },
                                                            shadowOpacity: 0.2,
                                                            shadowRadius: 12,
                                                            elevation: 6,
                                                        }}
                                                    >
                                                        {/* Full Width Image Section */}
                                                        <View className="aspect-[4/3] relative">
                                                            <Image
                                                                source={property.thumbnail ? { uri: property.thumbnail } : require('../../assets/HomeScreen/img-1.jpg')}
                                                                className="w-full h-full"
                                                                resizeMode="cover"
                                                            />
                                                            {/* Enhanced Gradient Overlay */}
                                                            <View className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

                                                            {/* Type and Status Row */}
                                                            <View className="absolute bottom-3 left-3 flex-row gap-2">
                                                                {/* Property Type */}
                                                                <View className="bg-blue-600/90 px-3 py-1.5 rounded-lg border border-white/20">
                                                                    <Text className="text-white text-xs font-semibold capitalize">{property.type}</Text>
                                                                </View>

                                                                {/* Project Status */}
                                                                <View className="flex-row items-center bg-emerald-500/90 px-3 py-1.5 rounded-lg border border-white/20">
                                                                    <View className="w-2 h-2 bg-emerald-300 rounded-full mr-2" />
                                                                    <Text className="text-white text-xs font-semibold capitalize">
                                                                        {property.statusProject}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                            {/* Image Pagination Dots */}
                                                            <View className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex-row space-x-1.5">
                                                                <View className="w-2 h-2 bg-white rounded-full" />
                                                                <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                                <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                                <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                                <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                            </View>
                                                        </View>

                                                        {/* Content Section */}
                                                        <View className="p-4 bg-zinc-800/90">
                                                            {/* Property Title */}
                                                            <Text className="text-white text-lg font-bold mb-2" numberOfLines={1}>
                                                                {property.title}
                                                            </Text>

                                                            {/* Address */}
                                                            <View className="flex-row items-center mb-3">
                                                                <Ionicons name="location" size={14} color="white" style={{ marginRight: 4 }} />
                                                                <Text className="text-zinc-400 text-sm" numberOfLines={1}>
                                                                    {property.city}, {property.province}
                                                                </Text>
                                                            </View>

                                                            {/* Facilities */}
                                                            {property.facilities && property.facilities.length > 0 && (
                                                                <View className="flex-row flex-wrap gap-2">
                                                                    {property.facilities.slice(0, 2).map((facility: PropertyFacility, idx: number) => (
                                                                        <View key={idx} className="flex-row items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">
                                                                            {facility.imageUrl ? (
                                                                                <Image
                                                                                    source={{ uri: facility.imageUrl }}
                                                                                    className="w-4 h-4 rounded-full mr-1 object-cover bg-white/30 border border-white/30 p-0.5 mix-blend-screen"
                                                                                    resizeMode="cover"
                                                                                />
                                                                            ) : (
                                                                                <View className="w-2 h-2 rounded-full bg-white/30 mr-1" />
                                                                            )}
                                                                            <Text className="text-white text-xs font-medium">{facility.title}</Text>
                                                                        </View>
                                                                    ))}
                                                                    {property.facilities.length > 2 && (
                                                                        <View className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">
                                                                            <Text className="text-white text-xs font-medium">
                                                                                +{property.facilities.length - 2} more
                                                                            </Text>
                                                                        </View>
                                                                    )}
                                                                </View>
                                                            )}
                                                        </View>
                                                    </TouchableOpacity>
                                                </MotiView>
                                            ))
                                        ) : (
                                            <MotiView
                                                from={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: 'timing', duration: 600, delay: 600 }}
                                            >
                                                <View className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-700/30">
                                                    <View className="items-center">
                                                        <View className="w-24 h-24 bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 rounded-3xl items-center justify-center mb-6 border border-zinc-600/30">
                                                            <Ionicons name="search" size={48} color="#9ca3af" />
                                                        </View>
                                                        <Text className="text-white text-xl font-bold mb-3">Tidak Ada Properti Ditemukan</Text>
                                                        <Text className="text-zinc-400 text-center text-base leading-6 mb-6">
                                                            Tidak ada properti ditemukan untuk &quot;{searchQuery}&quot;. Coba cari dengan kata kunci yang berbeda atau jelajahi properti unggulan kami.
                                                        </Text>
                                                        <View className="flex-row flex gap-2">
                                                            <View className="bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700/50 flex-row items-center">
                                                                <Ionicons name="home" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                                                <Text className="text-zinc-400 text-sm">Rumah</Text>
                                                            </View>
                                                            <View className="bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700/50 flex-row items-center">
                                                                <Ionicons name="business" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                                                <Text className="text-zinc-400 text-sm">Apartemen</Text>
                                                            </View>
                                                            <View className="bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700/50 flex-row items-center">
                                                                <Ionicons name="home-outline" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                                                <Text className="text-zinc-400 text-sm">Villa</Text>
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
                                                <TouchableOpacity
                                                    className="bg-zinc-800/90 rounded-3xl overflow-hidden border border-zinc-700/50 active:bg-zinc-700/90"
                                                    onPress={() => handlePropertyClick(property)}
                                                    style={{
                                                        shadowColor: '#000',
                                                        shadowOffset: { width: 0, height: 6 },
                                                        shadowOpacity: 0.2,
                                                        shadowRadius: 12,
                                                        elevation: 6,
                                                    }}
                                                >
                                                    {/* Full Width Image Section */}
                                                    <View className="aspect-[4/3] relative">
                                                        <Image
                                                            source={property.thumbnail ? { uri: property.thumbnail } : require('../../assets/HomeScreen/img-1.jpg')}
                                                            className="w-full h-full"
                                                            resizeMode="cover"
                                                        />
                                                        {/* Enhanced Gradient Overlay */}
                                                        <View className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

                                                        {/* Type and Status Row */}
                                                        <View className="absolute bottom-3 left-3 flex-row gap-2">
                                                            {/* Property Type */}
                                                            <View className="bg-blue-600/90 px-3 py-1.5 rounded-lg border border-white/20">
                                                                <Text className="text-white text-xs font-semibold capitalize">{property.type}</Text>
                                                            </View>

                                                            {/* Project Status */}
                                                            <View className="flex-row items-center bg-emerald-500/90 px-3 py-1.5 rounded-lg border border-white/20">
                                                                <View className="w-2 h-2 bg-emerald-300 rounded-full mr-2" />
                                                                <Text className="text-white text-xs font-semibold capitalize">
                                                                    {property.statusProject}
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        {/* Image Pagination Dots */}
                                                        <View className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex-row space-x-1.5">
                                                            <View className="w-2 h-2 bg-white rounded-full" />
                                                            <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                            <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                            <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                            <View className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                        </View>
                                                    </View>

                                                    {/* Content Section */}
                                                    <View className="p-4 bg-zinc-800/90">
                                                        {/* Property Title */}
                                                        <Text className="text-white text-lg font-bold mb-2" numberOfLines={1}>
                                                            {property.title}
                                                        </Text>

                                                        {/* Address */}
                                                        <View className="flex-row items-center mb-3">
                                                            <Ionicons name="location" size={14} color="white" style={{ marginRight: 4 }} />
                                                            <Text className="text-zinc-400 text-sm" numberOfLines={1}>
                                                                {property.city}, {property.province}
                                                            </Text>
                                                        </View>

                                                        {/* Facilities */}
                                                        {property.facilities && property.facilities.length > 0 && (
                                                            <View className="flex-row flex-wrap gap-2">
                                                                {property.facilities.slice(0, 2).map((facility: PropertyFacility, idx: number) => (
                                                                    <View key={idx} className="flex-row items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">
                                                                        {facility.imageUrl ? (
                                                                            <Image
                                                                                source={{ uri: facility.imageUrl }}
                                                                                className="w-4 h-4 rounded-full mr-1 object-cover bg-white/30 border border-white/30 p-0.5 mix-blend-screen"
                                                                                resizeMode="cover"
                                                                            />
                                                                        ) : (
                                                                            <View className="w-2 h-2 rounded-full bg-white/30 mr-1" />
                                                                        )}
                                                                        <Text className="text-white text-xs font-medium">{facility.title}</Text>
                                                                    </View>
                                                                ))}
                                                                {property.facilities.length > 2 && (
                                                                    <View className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">
                                                                        <Text className="text-white text-xs font-medium">
                                                                            +{property.facilities.length - 2} more
                                                                        </Text>
                                                                    </View>
                                                                )}
                                                            </View>
                                                        )}
                                                    </View>
                                                </TouchableOpacity>
                                            </MotiView>
                                        ))
                                    ) : (
                                        <MotiView
                                            from={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: 'timing', duration: 600, delay: 600 }}
                                        >
                                            <View className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-700/30 items-center justify-center">
                                                <MotiView
                                                    from={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ type: 'timing', duration: 600 }}
                                                >
                                                    <View className="w-16 h-16 bg-zinc-800 rounded-full items-center justify-center mb-4">
                                                        <Ionicons name="eye" size={32} color="#9ca3af" />
                                                    </View>
                                                </MotiView>
                                                <Text className="text-zinc-400 text-lg font-medium">Tidak Ada Tampilan Terbaru</Text>
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
                                    <View className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-3xl items-center justify-center mb-6 border border-blue-500/30">
                                        <Ionicons name="search" size={48} color="#60a5fa" />
                                    </View>
                                </MotiView>

                                <MotiView
                                    from={{ opacity: 0, translateY: 20 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 600, delay: 800 }}
                                >
                                    <Text className="text-white text-2xl font-bold mb-3">Temukan Rumah Impian Anda</Text>
                                </MotiView>

                                <MotiView
                                    from={{ opacity: 0, translateY: 20 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 600, delay: 1000 }}
                                >
                                    <Text className="text-zinc-400 text-center text-base leading-6 mb-8 max-w-xs">
                                        Cari properti berdasarkan alamat, kota, tipe, atau kata kunci apa pun untuk menemukan rumah sempurna Anda
                                    </Text>
                                </MotiView>

                                <MotiView
                                    from={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'timing', duration: 600, delay: 1200 }}
                                >
                                    <View className="flex-row space-x-4">
                                        <View className="bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700/50 flex-row items-center">
                                            <Ionicons name="home" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                            <Text className="text-zinc-400 text-sm">Rumah</Text>
                                        </View>
                                        <View className="bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700/50 flex-row items-center">
                                            <Ionicons name="business" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                            <Text className="text-zinc-400 text-sm">Apartemen</Text>
                                        </View>
                                        <View className="bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700/50 flex-row items-center">
                                            <Ionicons name="home-outline" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                            <Text className="text-zinc-400 text-sm">Villa</Text>
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