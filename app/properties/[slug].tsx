import React, { useEffect, useState } from 'react'

import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import MediaPlayet from '@/components/properties/details/MediaPlayet'
import ImageSlider from '@/components/properties/details/ImageSlider'

import { useLocalSearchParams, useRouter } from 'expo-router'

import { fetchPropertiesBySlug } from '@/config/lib/FetchProperties'

export default function PropertiesDetails() {
    const router = useRouter()
    const { slug, type, province } = useLocalSearchParams<{ slug: string; type: string; province: string }>()

    const [data, setData] = useState<PropertyDetail | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'description' | 'related' | 'facilities'>('description')

    useEffect(() => {
        const load = async () => {
            try {
                if (!slug || !type || !province) {
                    throw new Error('Missing required params')
                }
                setLoading(true)
                setError(null)
                const res = await fetchPropertiesBySlug(type, province, slug)
                setData(res.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load property')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [slug, type, province])

    if (loading) {
        return (
            <View className='flex-1 items-center justify-center bg-zinc-900'>
                <Text className='text-white'>Loading...</Text>
            </View>
        )
    }

    if (error || !data) {
        return (
            <View className='flex-1 items-center justify-center bg-zinc-900 px-6'>
                <Text className='text-white mb-3'>Tidak dapat memuat properti</Text>
                <Text className='text-zinc-400 text-center'>{error}</Text>
                <TouchableOpacity onPress={() => router.back()} className='mt-6 bg-accent-blue-600 px-5 py-3 rounded-xl'>
                    <Text className='text-white font-semibold'>Kembali</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView className='flex-1 bg-zinc-900' showsVerticalScrollIndicator={false}>
            {/* Header image slider */}
            <ImageSlider images={data.images} height={350} onBack={() => router.back()} />

            {/* Title and meta */}
            <View className='px-4 pt-4 pb-3 border-b border-zinc-800'>
                <View className='flex-row items-center mb-2'>
                    <Text className='bg-accent-blue-600 px-3 py-1 rounded-md text-white text-xs capitalize'>{data.type}</Text>
                </View>
                <Text className='text-white text-xl font-semibold'>{data.title}</Text>
                <Text className='text-zinc-400 mt-1'>{data.city}, {data.province}</Text>
            </View>

            {/* Stats cards (mock numbers based on facilities length etc.) */}
            <View className='px-4 py-4 border-b border-zinc-800'>
                <View className='flex-row items-stretch justify-between gap-3'>
                    {data.facilities && data.facilities.length > 0 ? (
                        <View className='flex-row flex-wrap gap-2'>
                            {data.facilities.map((facility, idx) => (
                                <View key={idx} className='flex-row items-center bg-zinc-800 px-3 py-2 rounded-xl border border-zinc-700'>
                                    {facility.imageUrl ? (
                                        <Image source={{ uri: facility.imageUrl }} className='w-5 h-5 rounded-full mr-2' />
                                    ) : (
                                        <View className='w-3 h-3 rounded-full bg-white/30 mr-2' />
                                    )}
                                    <Text className='text-white text-xs'>{facility.title}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text className='text-zinc-400'>No facilities data.</Text>
                    )}
                </View>
            </View>

            {/* Tabs */}
            <View className='px-4 py-3 border-b border-zinc-800'>
                <View className='flex-row gap-6'>
                    <TouchableOpacity onPress={() => setActiveTab('description')}>
                        <Text className={activeTab === 'description' ? 'text-accent-blue-400' : 'text-zinc-400'}>Description</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('related')}>
                        <Text className={activeTab === 'related' ? 'text-accent-blue-400' : 'text-zinc-400'}>Related</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tab Content */}
            {activeTab === 'description' && (
                <View className='px-4'>
                    {data.content ? (
                        <View className='mt-2'>
                            <MediaPlayet html={data.content} />
                        </View>
                    ) : null}
                </View>
            )}

            {activeTab === 'related' && (
                <View className='px-4 py-4'>
                    <Text className='text-white mb-3'>Related Properties</Text>
                    <View className='flex flex-col gap-3'>
                        {data.related && data.related.length > 0 ? (
                            data.related.map((item) => (
                                <TouchableOpacity key={item.id} className='bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700'>
                                    <View className='flex-row'>
                                        <View className='w-32 h-24'>
                                            <Image source={item.thumbnail ? { uri: item.thumbnail } : require('../../assets/HomeScreen/img-2.jpg')} className='w-full h-full' resizeMode='cover' />
                                        </View>
                                        <View className='flex-1 p-3 justify-center'>
                                            <Text className='text-white font-semibold' numberOfLines={1}>{item.title}</Text>
                                            <Text className='text-zinc-400 text-xs mt-1' numberOfLines={1}>{item.city}, {item.province}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text className='text-zinc-400'>No related properties.</Text>
                        )}
                    </View>
                </View>
            )}

            {/* Listing Agent */}
            <View className='px-4 pb-10'>
                <Text className='text-white mb-3'>Listing Agent</Text>
                <View className='bg-zinc-800 rounded-2xl p-4 border border-zinc-700 flex-row items-center'>
                    <View className='h-12 w-12 rounded-full overflow-hidden bg-zinc-700 mr-4'>
                        {data.author?.photoURL ? (
                            <Image source={{ uri: data.author.photoURL }} className='h-full w-full' />
                        ) : (
                            <View className='h-full w-full items-center justify-center'>
                                <Text className='text-white'>👤</Text>
                            </View>
                        )}
                    </View>
                    <View className='flex-1'>
                        <Text className='text-white font-semibold'>{data.author?.name || 'Agent'}</Text>
                        <Text className='text-zinc-400 text-xs'>{data.author?.role || 'Agent'}</Text>
                    </View>
                    <TouchableOpacity className='bg-accent-blue-600 px-4 py-2 rounded-xl'>
                        <Text className='text-white'>Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}