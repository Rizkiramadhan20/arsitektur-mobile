import { View, TouchableOpacity, Dimensions } from 'react-native'

import React, { useState, useEffect } from 'react'

import { Ionicons } from '@expo/vector-icons'

import { MotiView } from 'moti'

import ImageViewer from 'react-native-image-zoom-viewer'

interface ModalImagesProps {
    visible: boolean
    images: string[]
    currentIndex: number
    onClose: () => void
    onImageChange: (index: number) => void
}

export default function ModalImages({ visible, images, currentIndex, onClose, onImageChange }: ModalImagesProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

    useEffect(() => {
        setCurrentImageIndex(currentIndex)
    }, [currentIndex])

    const imageUrls = images.map((uri) => ({
        url: uri,
        props: {}
    }))

    const handleImageChange = (index?: number) => {
        if (index !== undefined && index !== currentImageIndex) {
            setCurrentImageIndex(index)
            onImageChange(index)
        }
    }

    const renderHeader = () => (
        <TouchableOpacity
            onPress={onClose}
            className='absolute top-16 right-4 h-10 w-10 rounded-full items-center justify-center bg-black/45 z-10'
            activeOpacity={0.7}
        >
            <Ionicons name='close' size={22} color={'#ffffff'} />
        </TouchableOpacity>
    )

    if (!visible) return null

    return (
        <View className='absolute inset-0 z-50 bg-black'>
            <ImageViewer
                imageUrls={imageUrls}
                index={currentImageIndex}
                onChange={handleImageChange}
                enableSwipeDown={true}
                onSwipeDown={onClose}
                enablePreload={true}
                saveToLocalByLongPress={false}
                menuContext={{
                    saveToLocal: 'Simpan ke Galeri',
                    cancel: 'Batal'
                }}
                renderHeader={renderHeader}
                backgroundColor="rgba(0,0,0,1)"
                enableImageZoom={true}
                minScale={0.5}
                maxScale={3}
                doubleClickInterval={175}
                flipThreshold={0}
                swipeDownThreshold={80}
                maxOverflow={0}
                useNativeDriver={false}
                loadingRender={() => <View />}
                renderIndicator={() => <View />}
                style={{
                    width: screenWidth,
                    height: screenHeight
                }}
            />

            {/* Dots Indicator */}
            <View
                pointerEvents='none'
                className='absolute bottom-8 z-30'
                style={{
                    left: 0,
                    right: 0,
                    alignItems: 'center'
                }}
            >
                <View className='flex-row items-center justify-center bg-black/40 px-4 py-2.5 rounded-full backdrop-blur-sm'>
                    {images.map((_, i) => (
                        <MotiView
                            key={i}
                            animate={{
                                width: i === currentImageIndex ? 28 : 8,
                                backgroundColor: i === currentImageIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                                scale: i === currentImageIndex ? 1.1 : 1
                            }}
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 300,
                                mass: 0.8
                            }}
                            className='h-2.5 rounded-full mx-1.5'
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}