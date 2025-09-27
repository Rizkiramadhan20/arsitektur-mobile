import React from 'react'

import { View, ScrollView, DimensionValue } from 'react-native'

import { MotiView } from 'moti'

import { useTheme } from '@/context/ThemeProvider'

const SkeletonBox = ({ width, height, className = '', delay = 0, isDark = true }: { width: DimensionValue, height: DimensionValue, className?: string, delay?: number, isDark?: boolean }) => (
    <MotiView
        from={{ opacity: 0.3 }}
        animate={{ opacity: 0.7 }}
        transition={{
            type: 'timing',
            duration: 1000,
            delay,
            loop: true,
            repeatReverse: true,
        }}
        className={`${isDark ? 'bg-zinc-800' : 'bg-gray-200'} rounded-lg ${className}`}
        style={{ width, height }}
    />
)

export default function TypeSkeleton() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const placeholderItems = Array.from({ length: 10 }).map((_, index) => index)

    return (
        <ScrollView className={`flex-1 ${isDark ? 'bg-background' : 'bg-gray-50'}`} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <MotiView
                from={{ opacity: 0, translateY: -12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 450 }}
                className='px-2 pt-2'
            >
                <View className='flex-row items-center justify-between mt-2 mb-2'>
                    <SkeletonBox width={40} height={40} className="rounded-full" isDark={isDark} />
                    <SkeletonBox width={140} height={20} isDark={isDark} />
                    <View className='h-10 w-10' />
                </View>
            </MotiView>

            {/* Search */}
            <MotiView
                from={{ opacity: 0, translateY: 12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 450, delay: 150 }}
                className='px-2'
            >
                <View className={`mt-2 ${isDark ? 'bg-background border-zinc-800' : 'bg-white border-gray-200'} rounded-2xl px-4 py-3 border`}>
                    <View className='flex-row items-center'>
                        <SkeletonBox width={36} height={36} className="rounded-xl mr-3" isDark={isDark} />
                        <SkeletonBox width={'70%'} height={20} className='flex-1' isDark={isDark} />
                        <SkeletonBox width={40} height={40} className='rounded-xl ml-3' isDark={isDark} />
                    </View>
                </View>
            </MotiView>

            {/* Grid (2 columns) */}
            <View className='px-2 py-3'>
                <View className='flex-row flex-wrap' style={{ gap: 8 }}>
                    {placeholderItems.map((index) => (
                        <MotiView
                            key={index}
                            from={{ opacity: 0, translateY: 10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: 'timing', duration: 350, delay: 80 + index * 40 }}
                            style={{ width: '48%' }}
                        >
                            <View className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-200 border-gray-300'} rounded-2xl overflow-hidden border`}>
                                <View style={{ height: 176 }}>
                                    <SkeletonBox width={'100%'} height={'100%'} isDark={isDark} />
                                </View>
                                <View className='p-3'>
                                    <SkeletonBox width={'80%'} height={16} className='mb-2' isDark={isDark} />
                                    <SkeletonBox width={'60%'} height={12} isDark={isDark} />
                                </View>
                            </View>
                        </MotiView>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}