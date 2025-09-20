import React, { useEffect, useState } from 'react'

import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { fetchProperties } from '@/config/lib/FetchProperties'

export default function Index() {
    const [properties, setProperties] = useState<Property[]>([])
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeChip, setActiveChip] = useState('Recommended')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetchProperties()
                setProperties(response.data)
                setFilteredProperties(response.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load properties')
            } finally {
                setLoading(false)
            }
        }

        loadProperties()
    }, [])

    // Filter properties based on active chip and search query
    useEffect(() => {
        let filtered = [...properties]

        // Apply search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.type.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Apply chip filter
        switch (activeChip) {
            case 'Top Rated':
                // Sort by a mock rating system (you can implement real rating later)
                filtered = filtered.sort((a, b) => b.title.length - a.title.length)
                break
            case 'Most Viewed':
                // Sort by creation date (newest first as a proxy for most viewed)
                filtered = filtered.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                break
            case 'Recommended':
            default:
                break
        }

        setFilteredProperties(filtered)
    }, [properties, activeChip, searchQuery])

    const handleChipPress = (chipLabel: string) => {
        setActiveChip(chipLabel)
    }

    const handleSearchChange = (text: string) => {
        setSearchQuery(text)
    }

    if (loading) {
        return (
            <SafeAreaView className='flex-1 bg-background items-center justify-center'>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text className='text-white mt-4'>Loading properties...</Text>
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <SafeAreaView className='flex-1 bg-background items-center justify-center px-4'>
                <Text className='text-status-error text-center mb-4'>Error: {error}</Text>
                <TouchableOpacity
                    className='px-6 py-3 rounded-xl bg-accent-blue-600'
                    onPress={() => {
                        setError(null)
                        setLoading(true)
                        // Retry loading
                        const loadProperties = async () => {
                            try {
                                const response = await fetchProperties()
                                setProperties(response.data)
                            } catch (err) {
                                setError(err instanceof Error ? err.message : 'Failed to load properties')
                            } finally {
                                setLoading(false)
                            }
                        }
                        loadProperties()
                    }}
                >
                    <Text className='text-white font-semibold'>Retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-background'>
            <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 24 }}>
                <View className='px-4 pt-2'>
                    {/* Header */}
                    <View className='flex-row items-center justify-between mt-2'>
                        <View>
                            <Text className='text-zinc-400'>Let&apos;s Find your</Text>
                            <Text className='text-white text-2xl font-semibold'>Favorite Home</Text>
                        </View>
                        <TouchableOpacity className='h-10 w-10 rounded-full overflow-hidden border border-zinc-700'>
                            <Image source={require('../../../assets/images/react-logo.png')} className='h-full w-full' resizeMode='cover' />
                        </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View className='mt-4 bg-zinc-900 rounded-2xl px-4 py-3 border border-zinc-800'>
                        <View className='flex-row items-center'>
                            <View className='h-9 w-9 rounded-xl bg-zinc-800 items-center justify-center mr-3'>
                                <Text className='text-zinc-400'>🔍</Text>
                            </View>
                            <TextInput
                                placeholder='Search by Address, City, or ZIP'
                                placeholderTextColor="#6b7280"
                                className='flex-1 text-white'
                                value={searchQuery}
                                onChangeText={handleSearchChange}
                            />
                            <TouchableOpacity className='h-10 w-10 rounded-xl bg-accent-blue-600 items-center justify-center ml-3'>
                                <Text className='text-white'>⚙️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chips */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4' contentContainerStyle={{ gap: 8 }}>
                        {['Recommended', 'Top Rated', 'Most Viewed'].map((label) => (
                            <TouchableOpacity
                                key={label}
                                className={`px-4 py-2 rounded-xl border border-zinc-800 ${activeChip === label ? 'bg-chip-active' : 'bg-chip-inactive'}`}
                                onPress={() => handleChipPress(label)}
                            >
                                <Text className={activeChip === label ? 'text-white' : 'text-zinc-300'}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4 pl-4' contentContainerStyle={{ paddingRight: 16 }}>
                    {filteredProperties.slice(0, 3).map((property) => (
                        <View key={property.id} className='mr-4 w-72'>
                            <View className='w-full aspect-[16/9] rounded-2xl overflow-hidden'>
                                <Image
                                    source={{ uri: property.thumbnail }}
                                    className='h-full w-full'
                                    defaultSource={require('../../../assets/HomeScreen/img-1.jpg')}
                                />
                            </View>
                            <View className='mt-3'>
                                <Text className='text-white text-lg font-semibold' numberOfLines={1}>{property.title}</Text>
                                <View className='flex-row items-center justify-between mt-1'>
                                    <Text className='text-white'>{property.type}</Text>
                                    <TouchableOpacity className='h-9 w-9 rounded-lg bg-card items-center justify-center border border-zinc-800'>
                                        <Text className='text-accent-blue-500'>🔖</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text className='text-zinc-400 mt-1' numberOfLines={1}>{property.city}, {property.province}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Near You */}
                <View className='px-4 mt-6'>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-white text-lg font-semibold'>Near You</Text>
                        <TouchableOpacity>
                            <Text className='text-accent-blue-500'>More</Text>
                        </TouchableOpacity>
                    </View>

                    {filteredProperties.slice(3).map((property) => (
                        <View key={property.id} className='flex-row mt-4 p-3 rounded-2xl bg-zinc-900 border border-zinc-800'>
                            <Image
                                source={{ uri: property.thumbnail }}
                                className='w-28 aspect-[4/3] rounded-xl'
                                defaultSource={require('../../../assets/HomeScreen/img-2.jpg')}
                            />
                            <View className='flex-1 ml-3'>
                                <View className='flex-row items-center justify-between'>
                                    <Text className='text-white font-semibold' numberOfLines={1}>{property.title}</Text>
                                    <Text className='text-accent-blue-400 text-xs'>{property.type}</Text>
                                </View>
                                <Text className='text-zinc-400 text-xs mt-1' numberOfLines={1}>{property.city}, {property.province}</Text>
                                <View className='flex-row items-center justify-between mt-2'>
                                    <Text className='text-accent-blue-400'>{property.statusProject}</Text>
                                </View>

                                {property.facilities && property.facilities.length > 0 && (
                                    <View className='flex-row flex-wrap mt-2'>
                                        {property.facilities.map((facility: PropertyFacility, idx: number) => (
                                            <View key={idx} className='flex-row items-center'>
                                                <Image source={{ uri: facility.imageUrl }} className='w-4 h-4 rounded-full' resizeMode='cover' />
                                                <Text className='text-zinc-400 text-xs mr-2'>• {facility.title}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}