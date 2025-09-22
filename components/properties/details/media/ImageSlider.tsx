import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Image, View, useWindowDimensions, PanResponder, Pressable } from 'react-native'

import { MotiView } from 'moti'

type ImageSliderProps = {
    images: string[]
    height?: number
    onBack?: () => void
    autoplay?: boolean
    interval?: number
    onImagePress?: (index: number) => void
}

export default function ImageSlider({ images, height = 288, onBack, autoplay = true, interval = 3000, onImagePress }: ImageSliderProps) {
    const data = useMemo(() => images, [images])
    const [activeIndex, setActiveIndex] = useState(0)
    const { width: screenWidth } = useWindowDimensions()

    // Swipe gesture support
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 10
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > 50) {
                    setActiveIndex(prev => (prev - 1 + data.length) % data.length)
                } else if (gestureState.dx < -50) {
                    setActiveIndex(prev => (prev + 1) % data.length)
                }
            },
        })
    ).current


    useEffect(() => {
        if (!autoplay || data.length <= 1) return

        const id = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % data.length)
        }, interval)

        return () => clearInterval(id)
    }, [autoplay, interval, data.length])

    return (
        <View style={{ height }} className='w-full relative bg-zinc-900' {...panResponder.panHandlers}>
            <View style={{ width: screenWidth, height: '100%' }}>
                {data.map((uri, idx) => (
                    <MotiView
                        key={idx}
                        from={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: activeIndex === idx ? 1 : 0, scale: activeIndex === idx ? 1 : 0.98 }}
                        transition={{ type: 'timing', duration: 500 }}
                        style={{ position: 'absolute', inset: 0 }}
                    >
                        <Pressable
                            style={{ width: screenWidth, height: '100%' }}
                            onPress={() => onImagePress?.(activeIndex)}
                        >
                            <Image
                                source={{ uri }}
                                style={{ width: screenWidth, height: '100%' }}
                                resizeMode='cover'
                            />
                        </Pressable>
                    </MotiView>
                ))}
            </View>

            {/* Dots */}
            <View className='absolute bottom-3 left-0 right-0 items-center'>
                <View className='flex-row items-center justify-center'>
                    {data.map((_, i) => (
                        <View
                            key={i}
                            className={`h-2 rounded-full mx-1 ${i === activeIndex ? 'bg-white' : 'bg-white/40'}`}
                            style={{ width: i === activeIndex ? 16 : 6 }}
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}


