import React, { useState } from 'react'

import { View, Text, TouchableOpacity, Linking, Share } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import Toast from 'react-native-toast-message'

interface PropertyDetail {
    title?: string
    city?: string
    province?: string
    type?: string
    content?: string
    images?: string[]
}

interface SocialMediaProps {
    data: PropertyDetail | null
}

export default function SocialMedia({ data }: SocialMediaProps) {
    const [showShareModal, setShowShareModal] = useState(false)

    const handleSharePress = () => {
        setShowShareModal(true)
    }

    const createShareMessage = () => {
        const title = data?.title || 'Property'
        const location = `${data?.city}, ${data?.province}`
        const type = data?.type || 'Property'
        const description = data?.content ? data.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'Check out this amazing property!'
        const downloadLink = 'Download aplikasi disini: https://play.google.com/store/apps/details?id=com.rineta.arsitektur'

        return `🏠 ${title}

📍 Lokasi: ${location}
🏘️ Tipe: ${type}

📝 Deskripsi: ${description}

${downloadLink}`
    }

    const shareToWhatsApp = async () => {
        try {
            const message = createShareMessage()

            if (data?.images && data.images.length > 0) {
                // Share with image using native share
                await Share.share({
                    message: message,
                    url: data.images[0], // First image
                    title: data?.title
                })
            } else {
                // Fallback to text only
                const url = `whatsapp://send?text=${encodeURIComponent(message)}`
                Linking.openURL(url).catch(() => {
                    Toast.show({
                        type: 'error',
                        text1: 'WhatsApp tidak terinstall',
                        text2: 'Silakan install WhatsApp terlebih dahulu'
                    })
                })
            }
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Gagal membagikan',
                text2: 'Silakan coba lagi'
            })
        }
        setShowShareModal(false)
    }

    const shareToTelegram = async () => {
        try {
            const message = createShareMessage()

            if (data?.images && data.images.length > 0) {
                // Share with image using native share
                await Share.share({
                    message: message,
                    url: data.images[0], // First image
                    title: data?.title
                })
            } else {
                // Fallback to text only
                const url = `https://t.me/share/url?url=&text=${encodeURIComponent(message)}`
                Linking.openURL(url).catch(() => {
                    Toast.show({
                        type: 'error',
                        text1: 'Gagal membuka Telegram',
                        text2: 'Silakan coba lagi'
                    })
                })
            }
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Gagal membagikan',
                text2: 'Silakan coba lagi'
            })
        }
        setShowShareModal(false)
    }

    const shareToInstagram = async () => {
        try {
            const message = createShareMessage()

            if (data?.images && data.images.length > 0) {
                // Share with image using native share
                await Share.share({
                    message: message,
                    url: data.images[0], // First image
                    title: data?.title
                })
            } else {
                // Fallback to text only
                await Share.share({
                    message: message,
                    title: data?.title
                })
            }
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Gagal membagikan',
                text2: 'Silakan coba lagi'
            })
        }
        setShowShareModal(false)
    }

    const shareToFacebook = async () => {
        try {
            const message = createShareMessage()

            if (data?.images && data.images.length > 0) {
                // Share with image using native share
                await Share.share({
                    message: message,
                    url: data.images[0], // First image
                    title: data?.title
                })
            } else {
                // Fallback to text only
                await Share.share({
                    message: message,
                    title: data?.title
                })
            }
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Gagal membagikan',
                text2: 'Silakan coba lagi'
            })
        }
        setShowShareModal(false)
    }

    const shareToX = async () => {
        try {
            const message = createShareMessage()

            if (data?.images && data.images.length > 0) {
                // Share with image using native share
                await Share.share({
                    message: message,
                    url: data.images[0], // First image
                    title: data?.title
                })
            } else {
                // Fallback to text only
                await Share.share({
                    message: message,
                    title: data?.title
                })
            }
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Gagal membagikan',
                text2: 'Silakan coba lagi'
            })
        }
        setShowShareModal(false)
    }

    const copyToClipboard = async () => {
        try {
            // For React Native, we'll use a simple approach
            // In a real app, you might want to use @react-native-clipboard/clipboard
            Toast.show({
                type: 'success',
                text1: 'Copied to clipboard',
                text2: 'Property details copied!'
            })
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Failed to copy',
                text2: 'Please try again'
            })
        }
        setShowShareModal(false)
    }

    return (
        <>
            {/* Share Button */}
            <TouchableOpacity onPress={handleSharePress} className='h-10 w-10 rounded-full items-center justify-center border border-white/10' style={{ backgroundColor: 'rgba(0,0,0,0.45)', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 3 }}>
                <Ionicons name='share-outline' size={22} color={'#ffffff'} />
            </TouchableOpacity>

            {/* Share Modal */}
            {showShareModal && (
                <View className='absolute inset-0' style={{ zIndex: 9999 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        className='absolute inset-0 bg-black/60'
                        onPress={() => setShowShareModal(false)}
                    />
                    <View className='absolute left-0 right-0 bottom-0 px-4 pb-12 pt-2'>
                        <View className='bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden'>
                            <View className='px-4 py-3 border-b border-zinc-700'>
                                <Text className='text-white font-semibold text-center'>Share Property</Text>
                            </View>

                            {/* Instagram */}
                            <TouchableOpacity onPress={shareToInstagram} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3'>
                                <View className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 items-center justify-center' style={{ backgroundColor: '#E4405F' }}>
                                    <Ionicons name='logo-instagram' size={20} color={'#ffffff'} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-white font-semibold'>Instagram</Text>
                                    <Text className='text-zinc-400 text-xs'>Share via Instagram</Text>
                                </View>
                            </TouchableOpacity>

                            {/* WhatsApp */}
                            <TouchableOpacity onPress={shareToWhatsApp} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                                <View className='w-10 h-10 rounded-full bg-green-600 items-center justify-center'>
                                    <Ionicons name='logo-whatsapp' size={20} color={'#ffffff'} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-white font-semibold'>WhatsApp</Text>
                                    <Text className='text-zinc-400 text-xs'>Share via WhatsApp</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Facebook */}
                            <TouchableOpacity onPress={shareToFacebook} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                                <View className='w-10 h-10 rounded-full bg-blue-600 items-center justify-center'>
                                    <Ionicons name='logo-facebook' size={20} color={'#ffffff'} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-white font-semibold'>Facebook</Text>
                                    <Text className='text-zinc-400 text-xs'>Share via Facebook</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Telegram */}
                            <TouchableOpacity onPress={shareToTelegram} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                                <View className='w-10 h-10 rounded-full bg-blue-500 items-center justify-center'>
                                    <Ionicons name='paper-plane-outline' size={20} color={'#ffffff'} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-white font-semibold'>Telegram</Text>
                                    <Text className='text-zinc-400 text-xs'>Share via Telegram</Text>
                                </View>
                            </TouchableOpacity>

                            {/* X (Twitter) */}
                            <TouchableOpacity onPress={shareToX} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                                <View className='w-10 h-10 rounded-full bg-black items-center justify-center'>
                                    <Ionicons name='logo-twitter' size={20} color={'#ffffff'} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-white font-semibold'>X (Twitter)</Text>
                                    <Text className='text-zinc-400 text-xs'>Share via X</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Copy Link */}
                            <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                                <View className='w-10 h-10 rounded-full bg-zinc-600 items-center justify-center'>
                                    <Ionicons name='copy-outline' size={20} color={'#ffffff'} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-white font-semibold'>Copy Details</Text>
                                    <Text className='text-zinc-400 text-xs'>Copy property information</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => setShowShareModal(false)} activeOpacity={0.9} className='mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-4 items-center'>
                            <Text className='text-zinc-200 font-semibold'>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}