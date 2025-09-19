import React, { useState } from 'react'

import { Pressable, View, Text, Image } from 'react-native'

import { router } from 'expo-router'

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

    const handleNext = () => {
        if (!isLastSlide) {
            setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))
            return
        }
        router.push('/auth/signin')
    }

    return (
        <View className='flex-1'>
            <Image
                source={current.image}
                className='absolute inset-0 w-full h-full'
            />

            <View className='absolute inset-0 bg-black/50' />

            {/* Bottom content */}
            <View className='absolute left-6 right-6 bottom-14'>
                <Text className='text-white text-4xl font-bold leading-tight w-4/5'>
                    {current.title}
                </Text>
                <View className='mt-3'>
                    <Text className='text-white/80 text-base'>{current.subtitle}</Text>
                    {isLastSlide ? (
                        <Pressable
                            accessibilityLabel='Get Started'
                            onPress={handleNext}
                            className='mt-5 bg-blue-600 py-4 rounded-xl items-center'
                        >
                            <Text className='text-white font-semibold'>Get Started</Text>
                        </Pressable>
                    ) : (
                        <View className='mt-3 flex-row items-center justify-between'>
                            <View />
                            <Pressable
                                accessibilityLabel='Next slide'
                                onPress={handleNext}
                                className='w-10 h-10 rounded-full border border-white/80 items-center justify-center'
                            >
                                <Text className='text-white text-xl'>{'>'}</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}