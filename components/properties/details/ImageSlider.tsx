import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'

type ImageSliderProps = {
    images: string[]
    height?: number
    onBack?: () => void
    autoplay?: boolean
    interval?: number
}

export default function ImageSlider({ images, height = 288, onBack, autoplay = true, interval = 3000 }: ImageSliderProps) {
    const data = useMemo(() => images, [images])
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<ScrollView | null>(null)
    const { width: screenWidth } = useWindowDimensions()

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, layoutMeasurement } = e.nativeEvent
        const nextIndex = Math.round(contentOffset.x / layoutMeasurement.width)
        if (nextIndex !== activeIndex) {
            setActiveIndex(nextIndex)
        }
    }

    // Autoplay logic
    useEffect(() => {
        if (!autoplay || data.length <= 1) return

        const id = setInterval(() => {
            const next = (activeIndex + 1) % data.length
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ x: next * screenWidth, animated: true })
            }
            setActiveIndex(next)
        }, interval)

        return () => clearInterval(id)
    }, [autoplay, interval, data.length, activeIndex, screenWidth])

    return (
        <View style={{ height }} className='w-full relative bg-zinc-900'>
            <ScrollView
                horizontal
                pagingEnabled
                snapToInterval={screenWidth}
                snapToAlignment='center'
                decelerationRate='fast'
                disableIntervalMomentum
                overScrollMode='never'
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ref={scrollRef}
            >
                {data.map((uri, idx) => (
                    <View key={idx} style={{ width: screenWidth, height: '100%' }} className='relative'>
                        <Image
                            source={{ uri }}
                            style={{ width: screenWidth, height: '100%' }}
                            resizeMode='cover'
                        />
                    </View>
                ))}
            </ScrollView>

            {/* Top actions */}
            <View className='absolute top-10 left-4 right-4 flex-row justify-between'>
                <TouchableOpacity onPress={onBack} className='h-10 w-10 rounded-full bg-black/50 items-center justify-center'>
                    <Text className='text-white'>←</Text>
                </TouchableOpacity>
                <View className='flex-row gap-2'>
                    <TouchableOpacity className='h-10 w-10 rounded-full bg-black/50 items-center justify-center'>
                        <Text className='text-white'>🔗</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='h-10 w-10 rounded-full bg-black/50 items-center justify-center'>
                        <Text className='text-white'>♡</Text>
                    </TouchableOpacity>
                </View>
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


