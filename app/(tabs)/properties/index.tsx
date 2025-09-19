import React from 'react'

import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function index() {
    return (
        <SafeAreaView className='flex-1 bg-black'>
            <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 24 }}>
                <View className='px-4 pt-2'>
                    {/* Header */}
                    <View className='flex-row items-center justify-between mt-2'>
                        <View>
                            <Text className='text-zinc-400'>Let&apos;s Find your</Text>
                            <Text className='text-white text-2xl font-semibold'>Favorite Home</Text>
                        </View>
                        <TouchableOpacity className='h-10 w-10 rounded-full overflow-hidden border border-zinc-700'>
                            <Image source={require('../../../assets/images/react-logo.png')} className='h-full w-full' resizeMode='cover' />
                        </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View className='mt-4 bg-zinc-900 rounded-2xl px-4 py-3 border border-zinc-800'>
                        <View className='flex-row items-center'>
                            <View className='h-9 w-9 rounded-xl bg-zinc-800 items-center justify-center mr-3'>
                                <Text className='text-zinc-400'>🔍</Text>
                            </View>
                            <TextInput
                                placeholder='Search by Address, City, or ZIP'
                                placeholderTextColor={'#6b7280'}
                                className='flex-1 text-white'
                            />
                            <TouchableOpacity className='h-10 w-10 rounded-xl bg-blue-600 items-center justify-center ml-3'>
                                <Text className='text-white'>⚙️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chips */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4' contentContainerStyle={{ gap: 8 }}>
                        {['Recommended', 'Top Rated', 'Best Offers', 'Most Viewed'].map((label, idx) => (
                            <TouchableOpacity key={label} className={`px-4 py-2 rounded-xl ${idx === 0 ? 'bg-blue-600' : 'bg-zinc-900'} border border-zinc-800`}>
                                <Text className={idx === 0 ? 'text-white' : 'text-zinc-300'}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4 pl-4' contentContainerStyle={{ paddingRight: 16 }}>
                    {[1, 2].map((i) => (
                        <View key={i} className='mr-4 w-72'>
                            <View className='w-full aspect-[16/9] rounded-2xl overflow-hidden'>
                                <Image source={require('../../../assets/HomeScreen/img-1.jpg')} className='h-full w-full' />
                            </View>
                            <View className='mt-3'>
                                <Text className='text-white text-lg font-semibold'>Lorem House</Text>
                                <View className='flex-row items-center justify-between mt-1'>
                                    <Text className='text-white'>$240/month</Text>
                                    <TouchableOpacity className='h-9 w-9 rounded-lg bg-zinc-900 items-center justify-center border border-zinc-800'>
                                        <Text className='text-blue-500'>🔖</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text className='text-zinc-400 mt-1'>Avenue, West Side</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Near You */}
                <View className='px-4 mt-6'>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-white text-lg font-semibold'>Near You</Text>
                        <TouchableOpacity>
                            <Text className='text-blue-500'>More</Text>
                        </TouchableOpacity>
                    </View>

                    {[1, 2, 3].map((i) => (
                        <View key={i} className='flex-row mt-4 p-3 rounded-2xl bg-zinc-900 border border-zinc-800'>
                            <Image source={require('../../../assets/HomeScreen/img-2.jpg')} className='w-28 aspect-[4/3] rounded-xl' />
                            <View className='flex-1 ml-3'>
                                <View className='flex-row items-center justify-between'>
                                    <Text className='text-white font-semibold'>Woodland Apartment</Text>
                                    <Text className='text-blue-400 text-xs'>Apartment</Text>
                                </View>
                                <Text className='text-zinc-400 text-xs mt-1'>1012 Ocean drive, New york, USA</Text>
                                <View className='flex-row items-center justify-between mt-2'>
                                    <Text className='text-zinc-400 text-xs'>⭐ 4.{i}   🛏️ 2   🛁 2</Text>
                                    <Text className='text-blue-400'>$360/month</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}