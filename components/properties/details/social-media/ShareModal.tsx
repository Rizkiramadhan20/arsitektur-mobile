import React from 'react'
import { View, Text, TouchableOpacity, Share } from 'react-native'
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

interface ShareModalProps {
    visible: boolean
    onClose: () => void
    data: PropertyDetail | null
}

export default function ShareModal({ visible, onClose, data }: ShareModalProps) {
    if (!visible) return null

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

    const handleShare = () => {
        const message = createShareMessage()

        Share.share({
            message: message,
            title: data?.title || 'Property Details',
            url: 'https://play.google.com/store/apps/details?id=com.rineta.arsitektur'
        }).catch(() => {
            Toast.show({
                type: 'error',
                text1: 'Gagal membagikan',
                text2: 'Silakan coba lagi'
            })
        })
        onClose()
    }

    const handleCopyToClipboard = () => {
        Toast.show({
            type: 'success',
            text1: 'Copied to clipboard',
            text2: 'Property details copied!'
        })
        onClose()
    }

    return (
        <View className='absolute inset-0 z-50'>
            <TouchableOpacity
                activeOpacity={1}
                className='absolute inset-0 bg-black/60'
                onPress={onClose}
            />
            <View className='absolute left-0 right-0 bottom-0 px-4 pb-12 pt-2'>
                <View className='bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden'>
                    <View className='px-4 py-3 border-b border-zinc-700'>
                        <Text className='text-white font-semibold text-center'>Share Property</Text>
                    </View>

                    {/* Instagram */}
                    <TouchableOpacity onPress={handleShare} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3'>
                        <View className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 items-center justify-center' style={{ backgroundColor: '#E4405F' }}>
                            <Ionicons name='logo-instagram' size={20} color={'#ffffff'} />
                        </View>
                        <View className='flex-1'>
                            <Text className='text-white font-semibold'>Instagram</Text>
                            <Text className='text-zinc-400 text-xs'>Share via Instagram</Text>
                        </View>
                    </TouchableOpacity>

                    {/* WhatsApp */}
                    <TouchableOpacity onPress={handleShare} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                        <View className='w-10 h-10 rounded-full bg-green-600 items-center justify-center'>
                            <Ionicons name='logo-whatsapp' size={20} color={'#ffffff'} />
                        </View>
                        <View className='flex-1'>
                            <Text className='text-white font-semibold'>WhatsApp</Text>
                            <Text className='text-zinc-400 text-xs'>Share via WhatsApp</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Telegram */}
                    <TouchableOpacity onPress={handleShare} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                        <View className='w-10 h-10 rounded-full bg-blue-500 items-center justify-center'>
                            <Ionicons name='paper-plane-outline' size={20} color={'#ffffff'} />
                        </View>
                        <View className='flex-1'>
                            <Text className='text-white font-semibold'>Telegram</Text>
                            <Text className='text-zinc-400 text-xs'>Share via Telegram</Text>
                        </View>
                    </TouchableOpacity>

                    {/* X (Twitter) */}
                    <TouchableOpacity onPress={handleShare} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                        <View className='w-10 h-10 rounded-full bg-black items-center justify-center'>
                            <Ionicons name='logo-twitter' size={20} color={'#ffffff'} />
                        </View>
                        <View className='flex-1'>
                            <Text className='text-white font-semibold'>X (Twitter)</Text>
                            <Text className='text-zinc-400 text-xs'>Share via X</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Copy Link */}
                    <TouchableOpacity onPress={handleCopyToClipboard} activeOpacity={0.9} className='px-4 py-4 flex-row items-center gap-3 border-t border-zinc-700'>
                        <View className='w-10 h-10 rounded-full bg-zinc-600 items-center justify-center'>
                            <Ionicons name='copy-outline' size={20} color={'#ffffff'} />
                        </View>
                        <View className='flex-1'>
                            <Text className='text-white font-semibold'>Copy Details</Text>
                            <Text className='text-zinc-400 text-xs'>Copy property information</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onClose} activeOpacity={0.9} className='mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-4 items-center'>
                    <Text className='text-zinc-200 font-semibold'>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}