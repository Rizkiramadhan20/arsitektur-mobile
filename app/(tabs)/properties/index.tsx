import React, { useEffect, useState } from 'react'

import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { LinearGradient } from 'expo-linear-gradient';

import { fetchProperties } from '@/config/lib/FetchProperties'

import { useRouter } from 'expo-router';

import { useUserLocation } from '@/hooks/useUserLocation';

export default function Index() {
    const [properties, setProperties] = useState<Property[]>([])
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeChip, setActiveChip] = useState('Recommended')
    const [searchQuery, setSearchQuery] = useState('')

    const router = useRouter();
    const { userLocation, provinceSlug, hasLocationPermission, loading: locationLoading, error: locationError, retry } = useUserLocation();

    const handleViewAllNearYou = () => {
        console.log('handleViewAllNearYou called');
        console.log('hasLocationPermission:', hasLocationPermission);
        console.log('userLocation:', userLocation);
        console.log('provinceSlug:', provinceSlug);

        if (hasLocationPermission && userLocation) {
            console.log('Navigating to user province:', provinceSlug);
            // Navigate to province page based on user location
            router.push(`/properties/province/${provinceSlug}`);
        } else {
            console.log('Fallback to Jakarta');
            // Fallback to default province (Jakarta) if location not available
            router.push('/properties/province/dki-jakarta');
        }
    };

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

    useEffect(() => {
        let filtered = [...properties]

        if (searchQuery.trim()) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.type.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

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
        <ScrollView className='flex-1' showsVerticalScrollIndicator={true}>
            <View className='px-4 pt-2 pb-6'>
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

                {/* Banner */}
                <View className='mt-4 rounded-2xl p-6 relative overflow-hidden' style={{ backgroundColor: '#2563eb' }}>
                    <LinearGradient
                        colors={['#2563eb', '#3b82f6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16 }}
                    />
                    {/* Background Pattern */}
                    <View className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16' />
                    <View className='absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12' />

                    {/* Content */}
                    <View className='relative z-10'>
                        <View className='flex-row items-center justify-between'>
                            <View className='flex-1'>
                                <Text className='text-white text-2xl font-bold mb-2'>Find Your Dream Home</Text>
                                <Text className='text-blue-100 text-base mb-4 leading-5'>
                                    Discover exclusive properties with premium amenities and modern designs
                                </Text>
                                <TouchableOpacity className='bg-white/20 px-6 py-3 rounded-xl border border-white/30 self-start'>
                                    <Text className='text-white font-semibold'>Explore Now</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Property Icon */}
                            <View className='ml-4'>
                                <View className='w-20 h-20 bg-white/20 rounded-2xl items-center justify-center border border-white/30'>
                                    <Text className='text-4xl'>🏠</Text>
                                </View>
                            </View>
                        </View>

                        {/* Stats Row */}
                        <View className='flex-row mt-6 space-x-6'>
                            <View className='flex-1'>
                                <Text className='text-white text-xl font-bold'>500+</Text>
                                <Text className='text-blue-100 text-sm'>Properties</Text>
                            </View>
                            <View className='flex-1'>
                                <Text className='text-white text-xl font-bold'>50+</Text>
                                <Text className='text-blue-100 text-sm'>Cities</Text>
                            </View>
                            <View className='flex-1'>
                                <Text className='text-white text-xl font-bold'>1000+</Text>
                                <Text className='text-blue-100 text-sm'>Happy Clients</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Chips */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6' contentContainerStyle={{ gap: 8 }}>
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

                {/* Featured Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6'>
                    {filteredProperties.slice(0, 3).map((property) => (
                        <View key={property.id} className='mr-4 w-72'>
                            <View className='w-full aspect-[16/9] rounded-2xl overflow-hidden'>
                                <Image
                                    source={property.thumbnail ? { uri: property.thumbnail } : require('../../../assets/HomeScreen/img-1.jpg')}
                                    className='h-full w-full'
                                    defaultSource={require('../../../assets/HomeScreen/img-1.jpg')}
                                />
                            </View>
                            <View className='mt-3'>
                                <Text className='text-white text-lg font-semibold' numberOfLines={1}>{property.title}</Text>
                                <Text className='text-white mt-1 capitalize'>{property.type}</Text>
                                <Text className='text-zinc-400 mt-1' numberOfLines={1}>{property.city}, {property.province}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Debug Info */}
                <View className='mt-6 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700'>
                    <Text className='text-white font-bold mb-2'>Debug Info:</Text>
                    <Text className='text-zinc-400 text-sm'>Permission: {hasLocationPermission ? 'Granted' : 'Denied'}</Text>
                    <Text className='text-zinc-400 text-sm'>Loading: {locationLoading ? 'Yes' : 'No'}</Text>
                    <Text className='text-zinc-400 text-sm'>Error: {locationError || 'None'}</Text>
                    <Text className='text-zinc-400 text-sm'>Location: {userLocation ? `${userLocation.province} (${userLocation.latitude}, ${userLocation.longitude})` : 'None'}</Text>
                    <Text className='text-zinc-400 text-sm'>Province Slug: {provinceSlug}</Text>

                    {locationError && (
                        <TouchableOpacity
                            onPress={retry}
                            className='mt-3 bg-accent-blue-500 px-4 py-2 rounded-lg'
                        >
                            <Text className='text-white font-semibold text-center'>Retry Location</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Near You */}
                <View className='mt-6'>
                    {/* Section Header */}
                    <View className='flex-row items-center justify-between mb-6'>
                        <View className='flex-row items-center'>
                            <View className='w-1 h-6 bg-gradient-to-b from-accent-blue-500 to-accent-blue-600 rounded-full' />
                            <View>
                                <Text className='text-white text-xl font-bold'>Dekat Anda</Text>
                                <Text className='text-zinc-400 text-sm'>
                                    {userLocation ? `Properti di ${userLocation.province}` : 'Properti di area Anda'}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleViewAllNearYou}
                            className='flex-row items-center bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-700'
                        >
                            <Text className='text-accent-blue-500 font-medium mr-1'>Lihat Semua</Text>
                            <Text className='text-accent-blue-500'>→</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Properties List */}
                    <View className='flex flex-col gap-4'>
                        {filteredProperties.slice(3).map((property, index) => (
                            <TouchableOpacity
                                key={property.id}
                                className='bg-zinc-900/80 rounded-3xl overflow-hidden border border-zinc-800/50 active:bg-zinc-800/60'
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 8,
                                    elevation: 4,
                                }}
                            >
                                {/* Property Image with Overlay Details */}
                                <View className='w-full h-80 relative overflow-hidden'>
                                    <Image
                                        source={property.thumbnail ? { uri: property.thumbnail } : require('../../../assets/HomeScreen/img-2.jpg')}
                                        className='w-full h-full'
                                        resizeMode='cover'
                                        defaultSource={require('../../../assets/HomeScreen/img-2.jpg')}
                                    />

                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                    />

                                    {/* Property Type Badge */}
                                    <View className='absolute top-3 right-3 bg-accent-blue-600/90 px-3 py-1.5 rounded-lg border border-white/20'>
                                        <Text className='text-white text-xs font-semibold'>{property.type}</Text>
                                    </View>

                                    {/* Property Details Overlay */}
                                    <View className='absolute bottom-0 left-0 right-0 p-4'>
                                        {/* Title */}
                                        <Text className='text-white text-xl font-bold mb-2' numberOfLines={2}>
                                            {property.title}
                                        </Text>

                                        {/* Status and Location */}
                                        <View className='flex-row items-center justify-between mb-3'>
                                            <View className='flex-row items-center'>
                                                <View className='w-2 h-2 bg-green-500 rounded-full mr-2' />
                                                <Text className='text-green-400 text-sm font-medium'>{property.statusProject}</Text>
                                            </View>

                                            <View className='flex-row items-center'>
                                                <Text className='text-zinc-300 text-sm'>📍</Text>
                                                <Text className='text-zinc-300 text-sm ml-1' numberOfLines={1}>
                                                    {property.city}, {property.province}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Facilities */}
                                        {property.facilities && property.facilities.length > 0 && (
                                            <View className='flex-row flex-wrap gap-2'>
                                                {property.facilities.slice(0, 3).map((facility: PropertyFacility, idx: number) => (
                                                    <View key={idx} className='flex-row items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30'>
                                                        {facility.imageUrl ? (
                                                            <Image
                                                                source={{ uri: facility.imageUrl }}
                                                                className='w-6 h-6 rounded-full mr-1 object-cover bg-white/30 border border-white/30 p-1 mix-blend-screen'
                                                                resizeMode='cover'
                                                            />
                                                        ) : (
                                                            <View className='w-3 h-3 rounded-full bg-white/30 mr-1' />
                                                        )}
                                                        <Text className='text-white text-xs font-medium'>{facility.title}</Text>
                                                    </View>
                                                ))}
                                                {property.facilities.length > 3 && (
                                                    <View className='bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30'>
                                                        <Text className='text-white text-xs font-medium'>
                                                            +{property.facilities.length - 3} more
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}