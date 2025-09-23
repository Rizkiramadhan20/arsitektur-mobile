import React, { useEffect, useState } from 'react'

import { Image, ScrollView, Text, TouchableOpacity, View, Platform, Linking } from 'react-native'

import Toast from 'react-native-toast-message'

import { BlurView } from 'expo-blur'

import { Ionicons } from '@expo/vector-icons'

import MediaPlayet from '@/components/properties/details/media/MediaPlayet'

import ImageSlider from '@/components/properties/details/media/ImageSlider'

import ShareModal from '@/components/properties/details/social-media/ShareModal'

import { useLocalSearchParams, useRouter } from 'expo-router'

import { fetchPropertiesBySlug } from '@/config/lib/FetchProperties'

import { db } from '@/config/firebase/Firebase'

import { collection, getDocs, limit, query, where } from 'firebase/firestore'

import LoadingOverlay from '@/components/properties/details/LoadingOverlay'

import PropertiesNotfound from "@/components/properties/details/PropertiesNotfound"

export default function PropertiesDetails() {
    const router = useRouter()
    const { slug, type, province, title } = useLocalSearchParams<{ slug: string; type: string; province: string; title?: string }>()

    const [data, setData] = useState<PropertyDetail | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'description' | 'related' | 'facilities'>('description')

    const [scrollY, setScrollY] = useState(0)
    const [showCallSheet, setShowCallSheet] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [fullscreenIndex, setFullscreenIndex] = useState(0)

    const handleCallPress = () => {
        const phone = data?.author?.phone
        if (!phone) {
            Toast.show({
                type: 'info',
                text1: 'Nomor telepon tidak tersedia',
                text2: 'Silakan hubungi agen melalui pesan.'
            })
            return
        }
        setShowCallSheet(true)
    }

    const callNow = () => {
        const phone = data?.author?.phone
        if (!phone) return
        const phoneUri = `tel:${phone}`
        Linking.openURL(phoneUri)
        setShowCallSheet(false)
    }

    useEffect(() => {
        const load = async () => {
            try {
                if (!slug || !type || !province) {
                    throw new Error('Missing required params')
                }
                setLoading(true)
                setError(null)
                const res = await fetchPropertiesBySlug(type, province, slug)

                let adminPhone: string | undefined = undefined
                try {
                    const accountsRef = collection(db, 'accounts')
                    // Try multiple role casings first
                    let snap = await getDocs(query(accountsRef, where('role', 'in', ['admin', 'Admin', 'ADMIN']), limit(1)))
                    if (snap.empty) {
                        // Fallback: any account with phoneNumber
                        const all = await getDocs(query(accountsRef, limit(10)))
                        const withPhone = all.docs.find(d => (d.data() as { phoneNumber?: unknown }).phoneNumber)
                        if (withPhone) {
                            snap = { empty: false, docs: [withPhone] } as unknown as typeof snap
                        }
                    }
                    if (!snap.empty) {
                        const doc = snap.docs[0]
                        const dataDoc = doc.data() as { phoneNumber?: string | number }
                        const raw = dataDoc?.phoneNumber
                        adminPhone = typeof raw === 'number' ? String(raw) : (raw ?? undefined)
                        if (adminPhone) {
                            adminPhone = adminPhone.toString().trim()
                        }
                    }
                } catch {
                    // ignore phone fetch errors, keep page working
                }

                const merged: PropertyDetail = {
                    ...res.data,
                    author: {
                        ...res.data.author,
                        phone: res.data.author?.phone ?? adminPhone
                    }
                }

                setData(merged)
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
            <LoadingOverlay title={typeof title === 'string' ? title : undefined} />
        )
    }

    if (error || !data) {
        return (
            <PropertiesNotfound />
        )
    }

    return (
        <View className='flex-1 bg-zinc-900'>
            <ScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={16}
            >
                <ImageSlider
                    images={data.images}
                    height={350}
                    onBack={() => router.back()}
                    onImagePress={(idx) => { setFullscreenIndex(idx); setIsFullscreen(true) }}
                />

                {/* Title and meta */}
                <View className='px-2 pt-4 pb-3 border-b border-zinc-800 flex flex-col gap-2'>
                    <View className='flex-row items-center gap-2'>
                        <Text className='bg-accent-blue-600 px-3 py-1 rounded-md text-white text-md capitalize'>{data.type}</Text>
                        <View className='flex-row items-center bg-emerald-500/90 px-3 py-1 rounded-md border border-white/10'>
                            <View className='w-2 h-2 bg-emerald-300 rounded-full mr-2' />
                            <Text className='text-white text-md font-semibold capitalize'>{data.statusProject}</Text>
                        </View>
                    </View>

                    <Text className='text-white text-lg font-semibold mb-1'>{data.title}</Text>
                    <Text className='text-zinc-400 text-sm mb-1'>{data.city}, {data.province}</Text>
                </View>

                {/* Facilities List */}
                <View className='px-2 py-4 border-b border-zinc-800'>
                    <View className='flex-row flex-wrap gap-3'>
                        {data.facilities.map((facility, idx) => (
                            <View
                                key={idx}
                                className='flex-row items-center bg-zinc-800 px-3 py-2 rounded-xl border border-zinc-700 w-[48%]'
                            >
                                {facility.imageUrl ? (
                                    <Image source={{ uri: facility.imageUrl }} className='w-10 h-10 rounded-full mr-2' resizeMode='cover' />
                                ) : (
                                    <View className='w-3 h-3 rounded-full bg-white/30 mr-2' />
                                )}
                                <Text className='text-white text-base'>{facility.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Tabs */}
                <View className='px-2 py-3 border-b border-zinc-800'>
                    <View className='bg-zinc-800 rounded-2xl p-1 border border-zinc-700 flex-row items-center'>
                        <TouchableOpacity
                            onPress={() => setActiveTab('description')}
                            className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'description' ? 'bg-accent-blue-600' : ''}`}
                            activeOpacity={0.8}
                        >
                            <Text className={activeTab === 'description' ? 'text-white font-semibold' : 'text-zinc-300'}>
                                Description
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('related')}
                            className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'related' ? 'bg-accent-blue-600' : ''}`}
                            activeOpacity={0.8}
                        >
                            <Text className={activeTab === 'related' ? 'text-white font-semibold' : 'text-zinc-300'}>
                                Related
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tab Content */}
                {
                    activeTab === 'description' && (
                        <View className='px-2'>
                            {data.content ? (
                                <View className='mt-2'>
                                    <MediaPlayet html={data.content} />
                                </View>
                            ) : null}
                        </View>
                    )
                }

                {
                    activeTab === 'related' && (
                        <View className='px-2 mt-2'>
                            <View className='flex flex-col gap-3'>
                                {data.related.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        activeOpacity={0.9}
                                        className='bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg'
                                    >
                                        <View className='flex-row'>
                                            <View className='w-36 h-36 relative'>
                                                <Image
                                                    source={item.thumbnail ? { uri: item.thumbnail } : require('../../assets/HomeScreen/img-2.jpg')}
                                                    className='w-full h-full'
                                                    resizeMode='cover'
                                                />
                                                <View className='absolute inset-0 bg-black/20' />

                                                <View className='absolute bottom-2 left-2 bg-accent-blue-600/90 px-2 py-1 rounded-md border border-white/20'>
                                                    <Text className='text-white text-[10px] font-semibold capitalize'>{item.type}</Text>
                                                </View>
                                            </View>

                                            <View className='flex-1 p-3 justify-between'>
                                                <View>
                                                    <Text className='text-white font-semibold text-base mb-1' numberOfLines={1}>{item.title}</Text>
                                                    <Text className='text-zinc-400 text-xs mt-1' numberOfLines={1}>📍{item.city}, {item.province}</Text>
                                                </View>

                                                {item.facilities && item.facilities.length > 0 && (
                                                    <View className='flex-row flex-wrap gap-2 mt-2'>
                                                        {item.facilities.slice(0, 2).map((facility, idx) => (
                                                            <View key={idx} className='flex-row items-center bg-white/10 px-2 py-1 rounded-md border border-white/20'>
                                                                {facility.imageUrl ? (
                                                                    <Image source={{ uri: facility.imageUrl }} className='w-4 h-4 rounded-full mr-1' resizeMode='cover' />
                                                                ) : (
                                                                    <View className='w-2 h-2 rounded-full bg-white/30 mr-1' />
                                                                )}
                                                                <Text className='text-white text-[10px]'>{facility.title}</Text>
                                                            </View>
                                                        ))}

                                                        {item.facilities.length > 2 && (
                                                            <View className='bg-white/10 px-2 py-1 rounded-md border border-white/20'>
                                                                <Text className='text-white text-[10px]'>+{item.facilities.length - 2} more</Text>
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
                    )
                }

                {/* Listing Agent */}
                <View className='px-2 pb-12 pt-5'>
                    <View className='bg-zinc-800 rounded-2xl p-4 border border-zinc-700 flex-row items-center'>
                        <View className='h-12 w-12 rounded-full overflow-hidden bg-zinc-700 mr-4'>
                            {data.author?.photoURL ? (
                                <Image source={{ uri: data.author.photoURL }} className='h-full w-full' />
                            ) : (
                                <View className='h-full w-full items-center justify-center'>
                                    <Ionicons name='person-circle-outline' size={28} color={'#ffffff'} />
                                </View>
                            )}
                        </View>
                        <View className='flex-1'>
                            <Text className='text-white font-semibold'>{data.author?.name || 'Agent'}</Text>
                            <Text className='text-zinc-400 text-xs'>{data.author?.role || 'Agent'}</Text>
                        </View>
                        <View className='flex-row items-center gap-2'>
                            <TouchableOpacity className='bg-accent-blue-600 px-3 py-2 rounded-xl flex-row items-center gap-2'>
                                <Ionicons name='chatbubble-ellipses-outline' size={18} color={'#ffffff'} />
                                <Text className='text-white'>Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCallPress} className='bg-emerald-600 px-3 py-2 rounded-xl flex-row items-center gap-2'>
                                <Ionicons name='call-outline' size={18} color={'#ffffff'} />
                                <Text className='text-white'>Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView >

            {/* Persistent sticky top actions overlay */}
            <BlurView
                className='absolute top-2 left-0 right-0 z-50 py-2 pb-2 rounded-b-3xl overflow-hidden bg-black/40'
                tint='dark'
                intensity={Math.floor(Math.min(scrollY / 120, 1) * 80)}
                experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
            >
                <View className='mt-10 px-4 flex-row justify-between'>
                    <TouchableOpacity onPress={() => router.back()} className='h-10 w-10 rounded-full items-center justify-center border border-white/10 bg-black/45 shadow-md'>
                        <Ionicons name='chevron-back' size={22} color={'#ffffff'} />
                    </TouchableOpacity>

                    <View className='flex-row gap-2'>
                        <TouchableOpacity onPress={() => setShowShareModal(true)} className='h-10 w-10 rounded-full items-center justify-center border border-white/10 bg-black/45 shadow-md'>
                            <Ionicons name='share-outline' size={22} color={'#ffffff'} />
                        </TouchableOpacity>
                        <TouchableOpacity className='h-10 w-10 rounded-full items-center justify-center border border-white/10 bg-black/45 shadow-md'>
                            <Ionicons name='heart-outline' size={22} color={'#ffffff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>

            {/* Inline Bottom Sheet for Call (no Modal) */}
            {showCallSheet && (
                <View className='absolute inset-0 z-50'>
                    <TouchableOpacity
                        activeOpacity={1}
                        className='absolute inset-0 bg-black/60'
                        onPress={() => setShowCallSheet(false)}
                    />
                    <View className='absolute left-0 right-0 bottom-0 px-4 pb-12 pt-2'>
                        <View className='bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden'>
                            <TouchableOpacity onPress={callNow} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-2'>
                                <Ionicons name='call-outline' size={20} color={'#6aa6ff'} />
                                <Text className='text-accent-blue-400 font-semibold'>Call {data?.author?.phone || ''}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShowCallSheet(false)} activeOpacity={0.9} className='mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-4 items-center'>
                            <Text className='text-zinc-200 font-semibold'>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Share Modal */}
            <ShareModal
                visible={showShareModal}
                onClose={() => setShowShareModal(false)}
                data={data}
            />

            {/* Fullscreen image overlay moved to page level */}
            {isFullscreen && (
                <View className='absolute inset-0 z-50 bg-black'>
                    <TouchableOpacity className='flex-1' activeOpacity={1} onPress={() => setFullscreenIndex((prev) => (prev + 1) % (data.images?.length || 1))}>
                        <View className='flex-1'>
                            {data.images.map((uri, idx) => (
                                <View key={idx} className={`absolute inset-0 ${fullscreenIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                                    <Image source={{ uri }} className='w-full h-full' resizeMode='contain' />
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsFullscreen(false)} className='absolute top-16 right-4 h-10 w-10 rounded-full items-center justify-center bg-black/45'>
                        <Ionicons name='close' size={22} color={'#ffffff'} />
                    </TouchableOpacity>
                    <View pointerEvents='none' className='absolute bottom-6 left-0 right-0 items-center'>
                        <View className='flex-row items-center justify-center'>
                            {data.images.map((_, i) => (
                                <View key={i} className={`h-2 rounded-full mx-1 ${i === fullscreenIndex ? 'bg-white w-4' : 'bg-white/40 w-1.5'}`} />
                            ))}
                        </View>
                    </View>
                </View>
            )}
        </View >
    )
}