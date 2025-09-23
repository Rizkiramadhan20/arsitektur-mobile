import React from 'react'

import { View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { MotiView } from 'moti'

export default function TypeSkeleton() {
    return (
        <SafeAreaView className='flex-1 bg-background'>
            {/* Header Skeleton */}
            <View className='px-2 pt-2 pb-3'>
                <MotiView
                    from={{ opacity: 0, translateY: -12 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 450 }}
                >
                    <View className='flex-row items-center justify-between mt-2 mb-2'>
                        <View className='h-10 w-10 rounded-full bg-zinc-800' />
                        <View className='h-6 w-32 bg-zinc-800 rounded-lg' />
                        <View className='h-10 w-10' />
                    </View>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 12 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 450, delay: 150 }}
                >
                    <View className='mt-2 bg-zinc-900 rounded-2xl px-4 py-3 border border-zinc-800'>
                        <View className='flex-row items-center'>
                            <View className='h-9 w-9 rounded-xl bg-zinc-800 mr-3' />
                            <View className='flex-1 h-6 bg-zinc-800 rounded-lg' />
                            <View className='h-10 w-10 rounded-xl bg-zinc-800 ml-3' />
                        </View>
                    </View>
                </MotiView>
            </View>

            {/* Grid Skeleton */}
            <View className='flex-1 px-2'>
                <View className='flex-row flex-wrap gap-2'>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <MotiView
                            key={index}
                            from={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                                delay: index * 100
                            }}
                            className='w-[48%] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800'
                        >
                            <View className='h-48 bg-zinc-800' />
                            <View className='p-3'>
                                <View className='h-4 bg-zinc-800 rounded-lg mb-2' />
                                <View className='h-3 bg-zinc-800 rounded-lg w-3/4 mb-2' />
                                <View className='flex-row gap-2'>
                                    <View className='h-6 bg-zinc-800 rounded-lg w-16' />
                                    <View className='h-6 bg-zinc-800 rounded-lg w-20' />
                                </View>
                            </View>
                        </MotiView>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}
