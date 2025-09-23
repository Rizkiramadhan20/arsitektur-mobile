import React, { useEffect, useState, useCallback } from 'react'

import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

import PropertiesNotfound from "@/components/properties/properties/PropertiesNotfound"

import { LinearGradient } from 'expo-linear-gradient';

import { fetchProperties } from '@/config/lib/FetchProperties'

import { useRouter, useFocusEffect } from 'expo-router';

import { useUserLocation } from '@/hooks/useUserLocation';

import { MotiView } from 'moti'

import ProperstiesSkelaton from "@/components/properties/properties/ProperstiesSkelaton"

import Toast from 'react-native-toast-message';

export default function Index() {
    const [properties, setProperties] = useState<Property[]>([])
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeChip, setActiveChip] = useState('Recommended')
    const [searchQuery, setSearchQuery] = useState('')

    const router = useRouter();
    const { userLocation, provinceSlug, hasLocationPermission } = useUserLocation();

    const handleViewAllNearYou = () => {

        if (hasLocationPermission && userLocation) {
            router.push(`/properties/province/${provinceSlug}`);
        } else {
            Toast.show({
                type: 'warning',
                text1: 'Aktifkan lokasi',
                text2: 'Aktifkan lokasi untuk melihat properti di sekitar Anda',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 50
            });
        }
    };

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetchProperties(1)
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

        switch (activeChip) {
            case 'Top Rated':
                filtered = filtered.sort((a, b) => b.title.length - a.title.length)
                break
            case 'Most Viewed':
                filtered = filtered.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                break
            case 'Recommended':
            default:
                break
        }

        setFilteredProperties(filtered)
    }, [properties, activeChip])

    const handleChipPress = (chipLabel: string) => {
        setActiveChip(chipLabel)
    }

    const handleSearchChange = (text: string) => {
        setSearchQuery(text)
    }

    useFocusEffect(
        useCallback(() => {
            setSearchQuery('')
        }, [])
    )

    const handlePropertyClick = (property: Property) => {
        const query = new URLSearchParams({
            type: property.type,
            province: property.province,
            title: property.title,
        }).toString()
        router.push(`/properties/${property.slug}?${query}`)
    }

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

    const handleAllProperties = (() => {
        router.push('/properties/all-properties')
    })

    return (
        <ScrollView className='flex-1 bg-background' showsVerticalScrollIndicator={true}>
            <View className='pt-2 pb-6'>
                {/* Header */}
                <MotiView
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600 }}
                    className='px-2'
                >
                    <View className='flex-row items-center justify-between mt-2'>
                        <View>
                            <Text className='text-zinc-400'>Let&apos;s Find your</Text>
                            <Text className='text-white text-2xl font-semibold'>Favorite Home</Text>
                        </View>
                        <TouchableOpacity className='h-10 w-10 rounded-full overflow-hidden border border-zinc-700'>
                            <Image source={require('../../../assets/images/react-logo.png')} className='h-full w-full' resizeMode='cover' />
                        </TouchableOpacity>
                    </View>
                </MotiView>

                {/* Search */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                    className='px-2 '
                >
                    <View className='mt-4 bg-background rounded-2xl px-4 py-3 border border-zinc-800'>
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
                                onSubmitEditing={() => {
                                    if (searchQuery.trim()) {
                                        router.push(`/properties/search?q=${encodeURIComponent(searchQuery)}`)
                                    }
                                }}
                                returnKeyType="search"
                            />
                            <TouchableOpacity className='h-10 w-10 rounded-xl bg-accent-blue-600 items-center justify-center ml-3'>
                                <Text className='text-white'>⚙️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </MotiView>

                {/* Banner */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                    className='px-2 mt-5'
                >
                    <View className='rounded-2xl p-6 relative overflow-hidden' style={{ backgroundColor: '#2563eb' }}>
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
                                    <TouchableOpacity className='bg-white/20 px-6 py-3 rounded-xl border border-white/30 self-start' onPress={handleAllProperties}>
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
                        </View>
                    </View>
                </MotiView>

                {/* Chips */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                    className='px-2'
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6' contentContainerStyle={{ gap: 8 }}>
                        {['Recommended', 'Top Rated', 'Most Viewed'].map((label, index) => (
                            <MotiView
                                key={label}
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 500 + (index * 75) }}

                            >
                                <MotiView
                                    animate={{
                                        scale: activeChip === label ? 1.05 : 1,
                                        backgroundColor: activeChip === label ? '#3b82f6' : '#1f2937'
                                    }}
                                    transition={{ type: 'timing', duration: 200 }}
                                    className='border border-zinc-800 rounded-xl overflow-hidden'
                                >
                                    <TouchableOpacity
                                        className={`px-4 py-2 rounded-xl ${activeChip === label ? 'bg-chip-active' : 'bg-chip-inactive'}`}
                                        onPress={() => handleChipPress(label)}
                                    >
                                        <Text className={activeChip === label ? 'text-white' : 'text-zinc-300'}>{label}</Text>
                                    </TouchableOpacity>
                                </MotiView>
                            </MotiView>
                        ))}
                    </ScrollView>
                </MotiView>

                {/* Featured Carousel */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6' contentContainerStyle={{ paddingLeft: 8 }}>
                        {filteredProperties.slice(0, 3).map((property, index) => (
                            <MotiView
                                key={property.id}
                                from={{ opacity: 0, translateX: 50 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 800 + (index * 75) }}
                            >
                                <TouchableOpacity
                                    className='mr-4 w-80 aspect-[5/5] rounded-2xl overflow-hidden relative'
                                    onPress={() => handlePropertyClick(property)}
                                >
                                    {/* Full Background Image */}
                                    <Image
                                        source={property.thumbnail ? { uri: property.thumbnail } : require('../../../assets/HomeScreen/img-1.jpg')}
                                        className='w-full h-full'
                                        resizeMode='cover'
                                        defaultSource={require('../../../assets/HomeScreen/img-1.jpg')}
                                    />

                                    {/* Dark Overlay */}
                                    <View className='absolute inset-0 bg-black/40' />

                                    {/* Content Overlay - Fixed height container */}
                                    <View className='absolute bottom-0 left-0 right-0 h-40 p-4'>
                                        {/* Top Section - Property Type & Title */}
                                        <View className='mb-3'>
                                            {/* Property Type */}
                                            <View className='self-start mb-2'>
                                                <Text className='bg-accent-blue-600/90 px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-semibold'>{property.type}</Text>
                                            </View>

                                            {/* Property Title - Fixed height */}
                                            <View className='h-6 mb-2'>
                                                <Text className='text-white text-lg font-bold' numberOfLines={1}>
                                                    {property.title}
                                                </Text>
                                            </View>

                                            {/* Address - Fixed height */}
                                            <View className='h-4'>
                                                <View className='flex-row items-center'>
                                                    <Text className='text-white text-xs mr-1'>📍</Text>
                                                    <Text className='text-zinc-300 text-xs' numberOfLines={1}>
                                                        {property.city}, {property.province}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Bottom Section - Facilities - Fixed height */}
                                        <View className='h-8 justify-center'>
                                            {property.facilities && property.facilities.length > 0 ? (
                                                <View className='flex-row flex-wrap gap-1'>
                                                    {property.facilities.slice(0, 2).map((facility: PropertyFacility, idx: number) => (
                                                        <View key={idx} className='flex-row items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30'>
                                                            {facility.imageUrl ? (
                                                                <Image
                                                                    source={{ uri: facility.imageUrl }}
                                                                    className='w-4 h-4 rounded-full mr-1 object-cover bg-white/30 border border-white/30 p-0.5 mix-blend-screen'
                                                                    resizeMode='cover'
                                                                />
                                                            ) : (
                                                                <View className='w-2 h-2 rounded-full bg-white/30 mr-1' />
                                                            )}
                                                            <Text className='text-white text-xs font-medium' numberOfLines={1}>{facility.title}</Text>
                                                        </View>
                                                    ))}
                                                    {property.facilities.length > 2 && (
                                                        <View className='bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30'>
                                                            <Text className='text-white text-xs font-medium'>
                                                                +{property.facilities.length - 2} more
                                                            </Text>
                                                        </View>
                                                    )}
                                                </View>
                                            ) : (
                                                <View className='h-6' />
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </MotiView>
                        ))}
                    </ScrollView>
                </MotiView>

                {/* Near You */}
                <View className='mt-8 px-2'>
                    {/* Modern Section Header */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 300 }}
                    >
                        <View className='mb-6'>
                            {/* Main Header Row */}
                            <View className='flex-row items-center justify-between mb-4'>
                                <View className='flex-row items-center flex-1'>
                                    {/* Modern Accent Line with Gradient */}
                                    <LinearGradient
                                        colors={['#3b82f6', '#1d4ed8']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        className='w-1 h-8 rounded-full mr-4'
                                    />

                                    {/* Header Content */}
                                    <View className='flex-1'>
                                        <View className='flex-row items-center mb-1'>
                                            <Text className='text-white text-2xl font-bold tracking-tight'>Dekat Anda</Text>
                                        </View>

                                        <Text className='text-zinc-400 text-base leading-relaxed'>
                                            {userLocation ? `Properti terpilih di ${userLocation.province}` : 'Aktifkan lokasi untuk melihat properti di sekitar Anda'}
                                        </Text>
                                    </View>
                                </View>

                                {/* Modern Action Button with Enhanced Interactions */}
                                <MotiView
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{ type: 'timing', duration: 200 }}
                                >
                                    <TouchableOpacity
                                        onPress={handleViewAllNearYou}
                                        className='flex-row items-center bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 rounded-2xl border border-blue-500/30 shadow-lg active:scale-95'
                                        style={{
                                            shadowColor: '#3b82f6',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 8,
                                            elevation: 8,
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Text className='text-white font-semibold text-sm mr-2'>Lihat Semua</Text>
                                        <MotiView
                                            animate={{
                                                translateX: [0, 2, 0],
                                            }}
                                            transition={{
                                                type: 'timing',
                                                duration: 1500,
                                                loop: true,
                                            }}
                                        >
                                            <View className='w-5 h-5 bg-white/20 rounded-full items-center justify-center'>
                                                <Text className='text-white text-xs font-bold'>→</Text>
                                            </View>
                                        </MotiView>
                                    </TouchableOpacity>
                                </MotiView>
                            </View>
                        </View>
                    </MotiView>

                    {/* Properties List */}
                    <View className='flex flex-col gap-4'>
                        {hasLocationPermission && userLocation ? (
                            filteredProperties.slice(3).map((property, index) => (
                                <MotiView
                                    key={property.id}
                                    from={{ opacity: 0, translateY: 30 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 500, delay: 1000 + (index * 75) }}
                                >
                                    <TouchableOpacity
                                        className='bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 active:bg-zinc-700'
                                        style={{
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 4,
                                            elevation: 2,
                                        }}
                                        onPress={() => handlePropertyClick(property)}
                                    >
                                        <View className='flex-row'>
                                            {/* Image Section - Left */}
                                            <View className='w-44 h-44 relative'>
                                                <Image
                                                    source={property.thumbnail ? { uri: property.thumbnail } : require('../../../assets/HomeScreen/img-2.jpg')}
                                                    className='w-full h-full'
                                                    resizeMode='cover'
                                                    defaultSource={require('../../../assets/HomeScreen/img-2.jpg')}
                                                />
                                                {/* Property Type */}
                                                <View className='absolute bottom-2 left-2'>
                                                    <View className='bg-accent-blue-600/90 border border-white/20 px-2 py-1 rounded-md'>
                                                        <Text className='text-white text-xs font-semibold capitalize'>{property.type}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* Text Details Section - Right */}
                                            <View className='flex-1 p-4 justify-between'>
                                                {/* Property Title */}
                                                <Text className='text-white text-lg font-bold mb-2' numberOfLines={1}>
                                                    {property.title}
                                                </Text>

                                                {/* Address */}
                                                <View className='flex-row items-center mb-3'>
                                                    <Text className='text-white text-xs mr-1'>📍</Text>
                                                    <Text className='text-zinc-400 text-xs' numberOfLines={1}>
                                                        {property.city}, {property.province}
                                                    </Text>
                                                </View>

                                                {/* Facilities */}
                                                {property.facilities && property.facilities.length > 0 && (
                                                    <View className='flex-row flex-wrap gap-2'>
                                                        {property.facilities.slice(0, 2).map((facility: PropertyFacility, idx: number) => (
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
                                                        {property.facilities.length > 2 && (
                                                            <View className='bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30 flex items-center justify-center'>
                                                                <Text className='text-white text-xs font-medium'>
                                                                    +{property.facilities.length - 2} more
                                                                </Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </MotiView>
                            ))
                        ) : (
                            <MotiView
                                from={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'timing', duration: 600, delay: 1200 }}
                            >
                                <View className='bg-zinc-900/80 rounded-3xl p-8 border border-zinc-800/50 items-center justify-center'>
                                    <MotiView
                                        from={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: 'timing', duration: 500, delay: 1400 }}
                                    >
                                        <View className='w-16 h-16 bg-zinc-800 rounded-full items-center justify-center mb-4'>
                                            <Text className='text-2xl'>📍</Text>
                                        </View>
                                    </MotiView>
                                    <MotiView
                                        from={{ opacity: 0, translateY: 20 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{ type: 'timing', duration: 500, delay: 1500 }}
                                    >
                                        <Text className='text-white text-lg font-semibold mb-2'>Aktifkan Lokasi</Text>
                                    </MotiView>
                                    <MotiView
                                        from={{ opacity: 0, translateY: 20 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{ type: 'timing', duration: 500, delay: 1600 }}
                                    >
                                        <Text className='text-zinc-400 text-center mb-4'>
                                            Aktifkan akses lokasi untuk melihat properti di sekitar Anda
                                        </Text>
                                    </MotiView>
                                    <MotiView
                                        from={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: 'timing', duration: 500, delay: 1700 }}
                                    >
                                        <TouchableOpacity
                                            onPress={handleViewAllNearYou}
                                            className='bg-accent-blue-600 px-6 py-3 rounded-xl'
                                        >
                                            <Text className='text-white font-semibold'>Aktifkan Lokasi</Text>
                                        </TouchableOpacity>
                                    </MotiView>
                                </View>
                            </MotiView>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}