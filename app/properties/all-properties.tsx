import React, { useCallback, useEffect, useState } from 'react'

import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useRouter } from 'expo-router'

import PropertiesNotfound from '@/components/properties/properties/PropertiesNotfound'

import ProperstiesSkelaton from '@/components/properties/properties/ProperstiesSkelaton'

import { fetchProperties } from '@/config/lib/FetchProperties'

import { Ionicons } from '@expo/vector-icons'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function AllProperties() {
    const router = useRouter()

    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const load = useCallback(async (pageToLoad: number) => {
        try {
            if (pageToLoad === 1) setLoading(true)
            else setIsLoadingMore(true)
            setError(null)
            const res = await fetchProperties(pageToLoad)
            const data = res?.data ?? []
            setProperties(prev => pageToLoad === 1 ? data : [...prev, ...data])
            // Heuristic for pagination fallback
            setHasMore(Array.isArray(data) ? data.length > 0 : false)
            setPage(pageToLoad)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load properties'
            // If next page has no data, just stop pagination instead of erroring the whole screen
            if (pageToLoad > 1 && message.toLowerCase().includes('no properties data')) {
                setHasMore(false)
                setError(null)
            } else {
                setError(message)
            }
        } finally {
            setLoading(false)
            setIsLoadingMore(false)
        }
    }, [])

    useEffect(() => {
        load(1)
    }, [load])

    const loadMore = () => {
        if (isLoadingMore || !hasMore) return
        load(page + 1)
    }

    const onRefresh = () => {
        load(1)
    }

    const handlePropertyClick = (property: Property) => {
        const query = new URLSearchParams({
            type: property.type,
            province: property.province,
            title: property.title,
        }).toString()
        router.push(`/properties/${property.slug}?${query}`)
    }

    const renderItem = ({ item }: { item: Property }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            className='bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700'
            onPress={() => handlePropertyClick(item)}
        >
            <View className='h-36 w-full relative'>
                <Image
                    source={item.thumbnail ? { uri: item.thumbnail } : require('../../assets/HomeScreen/img-1.jpg')}
                    className='w-full h-full'
                    resizeMode='cover'
                    defaultSource={require('../../assets/HomeScreen/img-1.jpg')}
                />
                <View className='absolute inset-0 bg-black/25' />
                <View className='absolute top-2 left-2 bg-accent-blue-600/90 px-2 py-1 rounded-md border border-white/20'>
                    <Text className='text-white text-[10px] font-semibold capitalize'>{item.type}</Text>
                </View>
            </View>
            <View className='p-3'>
                <Text className='text-white font-semibold' numberOfLines={1}>{item.title}</Text>
                <Text className='text-zinc-400 text-xs mt-1' numberOfLines={1}>📍 {item.city}, {item.province}</Text>
            </View>
        </TouchableOpacity>
    )

    if (loading) {
        return (
            <ProperstiesSkelaton />
        )
    }

    if (error) {
        return (
            <PropertiesNotfound />
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-background'>
            {/* Header + Search */}
            <View className='px-2 pt-2 pb-3'>
                {/* Header */}
                <View className='flex-row items-center justify-between mt-2 mb-2'>
                    <TouchableOpacity onPress={() => router.back()} className='h-10 w-10 rounded-full items-center justify-center border border-zinc-800 bg-zinc-900'>
                        <Ionicons name='chevron-back' size={22} color={'#ffffff'} />
                    </TouchableOpacity>
                    <Text className='text-white text-lg font-semibold'>Search</Text>
                    <View className='h-10 w-10' />
                </View>

                <View className='mt-2 bg-background rounded-2xl px-4 py-3 border border-zinc-800'>
                    <View className='flex-row items-center'>
                        <View className='h-9 w-9 rounded-xl bg-zinc-800 items-center justify-center mr-3'>
                            <Text className='text-zinc-400'>🔍</Text>
                        </View>
                        <TextInput
                            placeholder='Search by Address, City, or ZIP'
                            placeholderTextColor="#6b7280"
                            className='flex-1 text-white'
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={() => {
                                if (searchQuery.trim()) {
                                    router.push(`/properties/search?q=${encodeURIComponent(searchQuery)}`)
                                }
                            }}
                            returnKeyType='search'
                        />
                        <TouchableOpacity className='h-10 w-10 rounded-xl bg-accent-blue-600 items-center justify-center ml-3'>
                            <Text className='text-white'>⚙️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Grid */}
            <FlatList
                data={properties}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                columnWrapperStyle={{ gap: 8, paddingHorizontal: 8 }}
                contentContainerStyle={{ paddingBottom: 24, gap: 8 }}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        {renderItem({ item })}
                    </View>
                )}
                onEndReachedThreshold={0.4}
                onEndReached={loadMore}
                refreshing={loading}
                onRefresh={onRefresh}
                ListFooterComponent={isLoadingMore ? (
                    <View className='px-2 py-4'>
                        <Text className='text-center text-zinc-400'>Loading more...</Text>
                    </View>
                ) : null}
                ListEmptyComponent={!loading ? (
                    <View className='px-2'>
                        <PropertiesNotfound />
                    </View>
                ) : null}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}