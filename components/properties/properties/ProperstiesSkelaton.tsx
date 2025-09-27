import React from 'react'
import { View, ScrollView, DimensionValue } from 'react-native'
import { MotiView } from 'moti'
import { useTheme } from '@/context/ThemeProvider'

// Skeleton component for shimmer effect
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
        className={`${isDark ? 'bg-border-secondary' : 'bg-gray-200'} rounded-lg ${className}`}
        style={{ width, height }}
    />
)

export default function ProperstiesSkelaton() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <ScrollView className={`flex-1 ${isDark ? 'bg-background' : 'bg-gray-50'}`} showsVerticalScrollIndicator={false}>
            <View className='pt-2 pb-6'>
                {/* Header Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600 }}
                    className='px-2'
                >
                    <View className='flex-row items-center justify-between mt-2'>
                        <View>
                            <SkeletonBox width={120} height={16} className="mb-2" isDark={isDark} />
                            <SkeletonBox width={180} height={24} isDark={isDark} />
                        </View>
                        <SkeletonBox width={40} height={40} className="rounded-full" isDark={isDark} />
                    </View>
                </MotiView>

                {/* Search Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                    className='px-2'
                >
                    <View className={`mt-4 border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-3`}>
                        <View className='flex-row items-center'>
                            <SkeletonBox width={36} height={36} className="rounded-xl mr-3" isDark={isDark} />
                            <SkeletonBox width={200} height={20} className="flex-1" isDark={isDark} />
                        </View>
                    </View>
                </MotiView>

                {/* Banner Skeleton */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                    className='px-2 mt-5'
                >
                    <View className={`rounded-2xl p-6 relative overflow-hidden`} style={{ backgroundColor: '#2563eb' }}>
                        <View className='flex-row items-center justify-between'>
                            <View className='flex-1'>
                                <SkeletonBox width={200} height={24} className="mb-2" isDark={false} />
                                <SkeletonBox width={280} height={16} className="mb-4" isDark={false} />
                                <SkeletonBox width={120} height={40} className="rounded-xl" isDark={false} />
                            </View>
                            <View className='ml-4'>
                                <SkeletonBox width={80} height={80} className="rounded-2xl" isDark={false} />
                            </View>
                        </View>
                    </View>
                </MotiView>

                {/* Chips Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                    className='px-2'
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6' contentContainerStyle={{ gap: 8 }}>
                        {[1, 2, 3].map((_, index) => (
                            <MotiView
                                key={index}
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 500 + (index * 75) }}
                            >
                                <SkeletonBox width={100} height={36} className="rounded-xl" delay={index * 100} isDark={isDark} />
                            </MotiView>
                        ))}
                    </ScrollView>
                </MotiView>

                {/* Featured Carousel Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6' contentContainerStyle={{ paddingLeft: 8 }}>
                        {[1, 2, 3].map((_, index) => (
                            <MotiView
                                key={index}
                                from={{ opacity: 0, translateX: 50 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 800 + (index * 75) }}
                            >
                                <View className={`mr-4 w-80 aspect-[5/5] rounded-2xl overflow-hidden relative`}>
                                    <SkeletonBox width="100%" height="100%" delay={index * 100} isDark={isDark} />
                                </View>
                            </MotiView>
                        ))}
                    </ScrollView>
                </MotiView>

                {/* Near You Section Skeleton */}
                <View className='mt-8 px-2'>
                    {/* Section Header Skeleton */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 300 }}
                    >
                        <View className='mb-6'>
                            <View className='flex-row items-center justify-between mb-4'>
                                <View className='flex-row items-center flex-1'>
                                    <SkeletonBox width={4} height={32} className="rounded-full mr-4" isDark={isDark} />
                                    <View className='flex-1'>
                                        <SkeletonBox width={120} height={24} className="mb-1" isDark={isDark} />
                                        <SkeletonBox width={200} height={16} isDark={isDark} />
                                    </View>
                                </View>
                                <SkeletonBox width={100} height={48} className="rounded-2xl" isDark={isDark} />
                            </View>
                        </View>
                    </MotiView>

                    {/* Properties List Skeleton */}
                    <View className='flex flex-col gap-4'>
                        {[1, 2, 3].map((_, index) => (
                            <MotiView
                                key={index}
                                from={{ opacity: 0, translateY: 30 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 1000 + (index * 75) }}
                            >
                                <View className={`bg-white dark:bg-background border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden`}>
                                    <View className='flex-row'>
                                        {/* Image Section Skeleton */}
                                        <SkeletonBox width={176} height={176} delay={index * 100} isDark={isDark} />

                                        {/* Text Details Section Skeleton */}
                                        <View className='flex-1 p-4 justify-between'>
                                            <SkeletonBox width="80%" height={20} className="mb-2" delay={index * 100 + 50} isDark={isDark} />
                                            <SkeletonBox width="60%" height={14} className="mb-3" delay={index * 100 + 100} isDark={isDark} />

                                            {/* Facilities Skeleton */}
                                            <View className='flex-row flex-wrap gap-2'>
                                                <SkeletonBox width={60} height={24} className="rounded-lg" delay={index * 100 + 150} isDark={isDark} />
                                                <SkeletonBox width={80} height={24} className="rounded-lg" delay={index * 100 + 200} isDark={isDark} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </MotiView>
                        ))}
                    </View>
                </View>

                {/* Blogs Section Skeleton */}
                <View className='mt-8 px-2'>
                    {/* Blog Section Header Skeleton */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 1800 }}
                    >
                        <View className=''>
                            <View className='flex-row items-center justify-between mb-4'>
                                <View className='flex-row items-center flex-1'>
                                    <SkeletonBox width={4} height={32} className="rounded-full mr-3" isDark={isDark} />
                                    <View className='flex-1'>
                                        <SkeletonBox width={150} height={24} className="mb-1" isDark={isDark} />
                                        <SkeletonBox width={200} height={14} isDark={isDark} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </MotiView>

                    {/* Blog Tabs Skeleton */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 1900 }}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-4' contentContainerStyle={{ gap: 8 }}>
                            {[1, 2, 3, 4].map((_, index) => (
                                <MotiView
                                    key={index}
                                    from={{ opacity: 0, translateX: -20 }}
                                    animate={{ opacity: 1, translateX: 0 }}
                                    transition={{ type: 'timing', duration: 500, delay: 1900 + (index * 75) }}
                                >
                                    <SkeletonBox width={80} height={36} className="rounded-xl" delay={index * 100} isDark={isDark} />
                                </MotiView>
                            ))}
                        </ScrollView>
                    </MotiView>

                    {/* Blog List Skeleton */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 2000 }}
                    >
                        <View className='mt-4'>
                            {[1, 2, 3].map((_, index) => (
                                <MotiView
                                    key={index}
                                    from={{ opacity: 0, translateX: -20 }}
                                    animate={{ opacity: 1, translateX: 0 }}
                                    transition={{ type: 'timing', duration: 300, delay: index * 50 }}
                                >
                                    <View className={`mb-4 bg-white dark:bg-background border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden`}>
                                        <View className='flex-row'>
                                            {/* Blog Image Skeleton */}
                                            <SkeletonBox width={120} height={120} delay={index * 100} isDark={isDark} />

                                            {/* Blog Content Skeleton */}
                                            <View className='flex-1 p-4 justify-between'>
                                                <View>
                                                    <SkeletonBox width="90%" height={16} className="mb-2" delay={index * 100 + 50} isDark={isDark} />
                                                    <SkeletonBox width="70%" height={14} className="mb-3" delay={index * 100 + 100} isDark={isDark} />
                                                    <SkeletonBox width="60%" height={12} delay={index * 100 + 150} isDark={isDark} />
                                                </View>

                                                {/* Blog Actions Skeleton */}
                                                <View className='flex-row items-center justify-between mt-3'>
                                                    <SkeletonBox width={60} height={20} delay={index * 100 + 200} isDark={isDark} />
                                                    <View className='flex-row gap-2'>
                                                        <SkeletonBox width={24} height={24} className="rounded-full" delay={index * 100 + 250} isDark={isDark} />
                                                        <SkeletonBox width={24} height={24} className="rounded-full" delay={index * 100 + 300} isDark={isDark} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </MotiView>
                            ))}
                        </View>
                    </MotiView>
                </View>
            </View>
        </ScrollView>
    )
}