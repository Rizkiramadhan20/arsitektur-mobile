import { Tabs } from 'expo-router';
import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/context/ThemeProvider'

export default function TabLayout() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <SafeAreaView className='flex-1' edges={['top']}>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#3b82f6',
                    tabBarInactiveTintColor: isDark ? '#a1a1aa' : '#6b7280',
                    tabBarStyle: {
                        backgroundColor: isDark ? '#18181b' : '#ffffff',
                        borderTopColor: isDark ? '#27272a' : '#e5e7eb',
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
                                <Ionicons size={20} name="home" color={focused ? '#ffffff' : (isDark ? '#a1a1aa' : '#6b7280')} />
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
                                <Ionicons size={20} name="heart" color={focused ? '#ffffff' : (isDark ? '#a1a1aa' : '#6b7280')} />
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
                                <AntDesign size={20} name="message" color={focused ? '#ffffff' : (isDark ? '#a1a1aa' : '#6b7280')} />
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
                                <Ionicons size={20} name="person" color={focused ? '#ffffff' : (isDark ? '#a1a1aa' : '#6b7280')} />
                                <Text className={`text-xs font-medium ${focused ? 'text-white' : 'opacity-0 absolute'}`}>Profile</Text>
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}