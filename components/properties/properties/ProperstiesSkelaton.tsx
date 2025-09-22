import React from 'react'
import { View, ScrollView, DimensionValue } from 'react-native'
import { MotiView } from 'moti'

// Skeleton component for shimmer effect
const SkeletonBox = ({ width, height, className = '', delay = 0 }: { width: DimensionValue, height: DimensionValue, className?: string, delay?: number }) => (
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
        className={`bg-zinc-800 rounded-lg ${className}`}
        style={{ width, height }}
    />
)

export default function ProperstiesSkelaton() {
    return (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <View className='pt-2 pb-6'>
                {/* Header Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600 }}
                    className='px-4'
                >
                    <View className='flex-row items-center justify-between mt-2 px-4'>
                        <View>
                            <SkeletonBox width={120} height={16} className="mb-2" />
                            <SkeletonBox width={180} height={24} />
                        </View>
                        <SkeletonBox width={40} height={40} className="rounded-full" />
                    </View>
                </MotiView>

                {/* Search Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 200 }}
                    className='px-4'
                >
                    <View className='mt-4 bg-zinc-900 rounded-2xl px-4 py-3 border border-zinc-800'>
                        <View className='flex-row items-center'>
                            <SkeletonBox width={36} height={36} className="rounded-xl mr-3" />
                            <SkeletonBox width={200} height={20} className="flex-1" />
                            <SkeletonBox width={40} height={40} className="rounded-xl ml-3" />
                        </View>
                    </View>
                </MotiView>

                {/* Banner Skeleton */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'timing', duration: 600, delay: 400 }}
                    className='px-4'
                >
                    <View className='mt-4 rounded-2xl p-6 bg-zinc-800 border border-zinc-700'>
                        <View className='flex-row items-center justify-between'>
                            <View className='flex-1'>
                                <SkeletonBox width={200} height={24} className="mb-2" />
                                <SkeletonBox width={280} height={16} className="mb-4" />
                                <SkeletonBox width={120} height={40} className="rounded-xl" />
                            </View>
                            <View className='ml-4'>
                                <SkeletonBox width={80} height={80} className="rounded-2xl" />
                            </View>
                        </View>

                        {/* Stats Row Skeleton */}
                        <View className='flex-row mt-6 space-x-6'>
                            <View className='flex-1'>
                                <SkeletonBox width={60} height={20} className="mb-1" />
                                <SkeletonBox width={80} height={14} />
                            </View>
                            <View className='flex-1'>
                                <SkeletonBox width={40} height={20} className="mb-1" />
                                <SkeletonBox width={60} height={14} />
                            </View>
                            <View className='flex-1'>
                                <SkeletonBox width={60} height={20} className="mb-1" />
                                <SkeletonBox width={100} height={14} />
                            </View>
                        </View>
                    </View>
                </MotiView>

                {/* Chips Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 600 }}
                    className='px-4'
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6' contentContainerStyle={{ gap: 8 }}>
                        {[1, 2, 3].map((_, index) => (
                            <MotiView
                                key={index}
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 600 + (index * 75) }}
                            >
                                <SkeletonBox width={100} height={36} className="rounded-xl" delay={index * 100} />
                            </MotiView>
                        ))}
                    </ScrollView>
                </MotiView>

                {/* Featured Carousel Skeleton */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 800 }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-6' contentContainerStyle={{ paddingLeft: 8 }}>
                        {[1, 2, 3].map((_, index) => (
                            <MotiView
                                key={index}
                                from={{ opacity: 0, translateX: 50 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 800 + (index * 75) }}
                            >
                                <View className='mr-4 w-80 h-64 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden'>
                                    <SkeletonBox width="100%" height="100%" delay={index * 100} />
                                </View>
                            </MotiView>
                        ))}
                    </ScrollView>
                </MotiView>

                {/* Near You Section Skeleton */}
                <View className='mt-6 px-4'>
                    {/* Section Header Skeleton */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 1000 }}
                    >
                        <View className='flex-row items-center justify-between mb-6'>
                            <View className='flex-row items-center'>
                                <SkeletonBox width={4} height={24} className="rounded-full mr-3" />
                                <View>
                                    <SkeletonBox width={120} height={20} className="mb-1" />
                                    <SkeletonBox width={200} height={14} />
                                </View>
                            </View>
                            <SkeletonBox width={100} height={36} className="rounded-xl" />
                        </View>
                    </MotiView>

                    {/* Properties List Skeleton */}
                    <View className='flex flex-col gap-4'>
                        {[1, 2, 3].map((_, index) => (
                            <MotiView
                                key={index}
                                from={{ opacity: 0, translateY: 30 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 1200 + (index * 75) }}
                            >
                                <View className='bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden'>
                                    <View className='flex-row'>
                                        {/* Image Section Skeleton */}
                                        <SkeletonBox width={160} height={160} delay={index * 100} />

                                        {/* Text Details Section Skeleton */}
                                        <View className='flex-1 p-4 justify-between'>
                                            <SkeletonBox width="80%" height={20} className="mb-2" delay={index * 100 + 50} />
                                            <SkeletonBox width="60%" height={14} className="mb-3" delay={index * 100 + 100} />

                                            {/* Facilities Skeleton */}
                                            <View className='flex-row flex-wrap gap-2'>
                                                <SkeletonBox width={60} height={24} className="rounded-lg" delay={index * 100 + 150} />
                                                <SkeletonBox width={80} height={24} className="rounded-lg" delay={index * 100 + 200} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </MotiView>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}