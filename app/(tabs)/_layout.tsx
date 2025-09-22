import { Tabs } from 'expo-router';

import React from 'react';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import { View, Text } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function TabLayout() {
    return (
        <SafeAreaView className='flex-1' edges={['top']}>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#3b82f6',
                    tabBarInactiveTintColor: '#a1a1aa',
                    tabBarStyle: {
                        backgroundColor: '#18181b',
                        borderTopColor: '#27272a',
                        borderTopWidth: 1,
                        height: 56,
                        paddingHorizontal: 12,
                    },
                    tabBarItemStyle: {
                        paddingVertical: 8,
                    },
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="properties"
                    options={{
                        title: 'Properties',
                        tabBarIcon: ({ focused }: { focused: boolean }) => (
                            <View className={`relative flex-row items-center gap-2 rounded-full px-3 h-[36px] w-[92px] justify-center ${focused ? 'bg-[#3b82f6]' : ''}`}>
                                <Ionicons size={20} name="home" color={focused ? '#ffffff' : '#a1a1aa'} />
                                <Text className={`text-xs font-medium ${focused ? 'text-white' : 'opacity-0 absolute'}`}>Home</Text>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="blog"
                    options={{
                        title: 'blog',
                        tabBarIcon: ({ focused }: { focused: boolean }) => (
                            <View className={`relative flex-row items-center gap-2 rounded-full px-3 h-[36px] w-[92px] justify-center ${focused ? 'bg-[#3b82f6]' : ''}`}>
                                <Ionicons size={20} name="heart" color={focused ? '#ffffff' : '#a1a1aa'} />
                                <Text className={`text-xs font-medium ${focused ? 'text-white' : 'opacity-0 absolute'}`}>Saved</Text>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="message"
                    options={{
                        title: 'Message',
                        tabBarIcon: ({ focused }: { focused: boolean }) => (
                            <View className={`relative flex-row items-center gap-2 rounded-full px-3 h-[36px] w-[92px] justify-center ${focused ? 'bg-[#3b82f6]' : ''}`}>
                                <AntDesign size={20} name="message" color={focused ? '#ffffff' : '#a1a1aa'} />
                                <Text className={`text-xs font-medium ${focused ? 'text-white' : 'opacity-0 absolute'}`}>Message</Text>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ focused }: { focused: boolean }) => (
                            <View className={`relative flex-row items-center gap-2 rounded-full px-3 h-[36px] w-[92px] justify-center ${focused ? 'bg-[#3b82f6]' : ''}`}>
                                <Ionicons size={20} name="person" color={focused ? '#ffffff' : '#a1a1aa'} />
                                <Text className={`text-xs font-medium ${focused ? 'text-white' : 'opacity-0 absolute'}`}>Profile</Text>
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}