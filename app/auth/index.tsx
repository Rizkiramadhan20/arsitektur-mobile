import React, { useState } from 'react'

import { Pressable, View, Text, Image } from 'react-native'

import { router } from 'expo-router'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { MotiView } from 'moti'

import img1 from "@/assets/HomeScreen/img-1.jpg"

import img2 from "@/assets/HomeScreen/img-2.jpg"

import img3 from "@/assets/HomeScreen/img-3.jpg"

const slides = [
    {
        image: img1,
        title: 'Explore Amazing\nReal Estate',
        subtitle: 'Find what you want',
    },
    {
        image: img2,
        title: 'Compare and\nchoose',
        subtitle: 'Find what you want',
    },
    {
        image: img3,
        title: 'choose the\nmore comfort',
        subtitle: 'Find what you want',
    },
]

export default function AuthIndexScreen() {
    const [slideIndex, setSlideIndex] = useState(0)

    const isLastSlide = slideIndex >= slides.length - 1
    const current = slides[slideIndex]

    const handleNext = async () => {
        if (!isLastSlide) {
            setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))
            return
        }
        // Mark that user has visited auth page
        await AsyncStorage.setItem('has_visited_auth', 'true');
        router.push('/auth/signin')
    }

    return (
        <View className='flex-1'>
            <MotiView
                from={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 1000 }}
            >
                <Image
                    source={current.image}
                    className='absolute inset-0 w-full h-full'
                />
            </MotiView>

            <View className='absolute inset-0 bg-black/50' />

            {/* Bottom content */}
            <MotiView
                from={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 800, delay: 300 }}
                className='absolute left-6 right-6 bottom-14'
            >
                <MotiView
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                >
                    <Text className='text-text-primary text-4xl font-bold leading-tight w-4/5'>
                        {current.title}
                    </Text>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 700 }}
                >
                    <Text className='text-text-secondary text-base'>{current.subtitle}</Text>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'timing', duration: 500, delay: 900 }}
                >
                    {isLastSlide ? (
                        <Pressable
                            accessibilityLabel='Get Started'
                            onPress={handleNext}
                            className='mt-5 bg-accent-blue-600 py-4 rounded-xl items-center'
                        >
                            <Text className='text-text-primary font-semibold'>Get Started</Text>
                        </Pressable>
                    ) : (
                        <View className='mt-3 flex-row items-center justify-between'>
                            <View />
                            <Pressable
                                accessibilityLabel='Next slide'
                                onPress={handleNext}
                                className='w-10 h-10 rounded-full border border-white/80 items-center justify-center'
                            >
                                <Text className='text-text-primary text-xl'>{'>'}</Text>
                            </Pressable>
                        </View>
                    )}
                </MotiView>
            </MotiView>
        </View>
    )
}