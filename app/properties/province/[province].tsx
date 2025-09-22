import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { fetchProperties } from '@/config/lib/FetchProperties'

export default function ProvincePage() {
    const { province } = useLocalSearchParams<{ province: string }>()
    const router = useRouter()
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [refreshing, setRefreshing] = useState(false)

    const loadProperties = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            // Fetch all properties
            const response = await fetchProperties(1)

            // Filter properties by province
            const provinceDisplayName = getProvinceDisplayName(province || '')
            const filteredProperties = response.data.filter(property =>
                property.province.toLowerCase() === provinceDisplayName.toLowerCase()
            )


            setProperties(filteredProperties)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load properties')
        } finally {
            setLoading(false)
        }
    }, [province])

    const onRefresh = async () => {
        setRefreshing(true)
        await loadProperties()
        setRefreshing(false)
    }

    useEffect(() => {
        if (province) {
            loadProperties()
        }
    }, [province, loadProperties])

    const getProvinceDisplayName = (slug: string) => {
        const provinceMap: { [key: string]: string } = {
            'dki-jakarta': 'DKI Jakarta',
            'jawa-barat': 'Jawa Barat',
            'jawa-tengah': 'Jawa Tengah',
            'jawa-timur': 'Jawa Timur',
            'banten': 'Banten',
            'yogyakarta': 'Yogyakarta',
            'bali': 'Bali',
            'sumatera-utara': 'Sumatera Utara',
            'sumatera-barat': 'Sumatera Barat',
            'sumatera-selatan': 'Sumatera Selatan',
            'lampung': 'Lampung',
            'riau': 'Riau',
            'kepulauan-riau': 'Kepulauan Riau',
            'jambi': 'Jambi',
            'bengkulu': 'Bengkulu',
            'aceh': 'Aceh',
            'kalimantan-barat': 'Kalimantan Barat',
            'kalimantan-tengah': 'Kalimantan Tengah',
            'kalimantan-selatan': 'Kalimantan Selatan',
            'kalimantan-timur': 'Kalimantan Timur',
            'kalimantan-utara': 'Kalimantan Utara',
            'sulawesi-utara': 'Sulawesi Utara',
            'sulawesi-tengah': 'Sulawesi Tengah',
            'sulawesi-selatan': 'Sulawesi Selatan',
            'sulawesi-tenggara': 'Sulawesi Tenggara',
            'sulawesi-barat': 'Sulawesi Barat',
            'gorontalo': 'Gorontalo',
            'maluku': 'Maluku',
            'maluku-utara': 'Maluku Utara',
            'papua': 'Papua',
            'papua-barat': 'Papua Barat',
            'papua-selatan': 'Papua Selatan',
            'papua-tengah': 'Papua Tengah',
            'papua-pegunungan': 'Papua Pegunungan',
            'papua-barat-daya': 'Papua Barat Daya'
        }
        return provinceMap[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
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
                    onPress={loadProperties}
                >
                    <Text className='text-white font-semibold'>Retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-background'>
            <ScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#3b82f6"
                    />
                }
            >
                {/* Header */}
                <View className='px-4 pt-4 pb-6'>
                    <View className='flex-row items-center justify-between mb-6'>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className='w-10 h-10 rounded-full bg-zinc-800 items-center justify-center'
                        >
                            <Text className='text-white text-lg'>←</Text>
                        </TouchableOpacity>
                        <View className='flex-1 items-center'>
                            <Text className='text-white text-lg font-semibold'>
                                {getProvinceDisplayName(province || '')}
                            </Text>
                            <Text className='text-zinc-400 text-sm'>
                                {properties.length} properti tersedia
                            </Text>
                        </View>
                        <View className='w-10' />
                    </View>

                    {/* Properties List */}
                    <View className='flex flex-col gap-4'>
                        {properties.map((property) => (
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

                    {/* Empty State */}
                    {properties.length === 0 && (
                        <View className='bg-zinc-900/80 rounded-3xl p-8 border border-zinc-800/50 items-center justify-center mt-8'>
                            <View className='w-16 h-16 bg-zinc-800 rounded-full items-center justify-center mb-4'>
                                <Text className='text-2xl'>🏠</Text>
                            </View>
                            <Text className='text-white text-lg font-semibold mb-2'>Tidak Ada Properti</Text>
                            <Text className='text-zinc-400 text-center'>
                                Belum ada properti yang tersedia di {getProvinceDisplayName(province || '')}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}