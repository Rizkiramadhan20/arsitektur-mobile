import { Tabs } from 'expo-router';

import React from 'react';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context'

export default function TabLayout() {
    return (
        <SafeAreaView className='flex-1' edges={['top']}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#3b82f6',
                    tabBarInactiveTintColor: '#a1a1aa',
                    tabBarStyle: {
                        backgroundColor: '#18181b',
                        borderTopColor: '#27272a',
                        borderTopWidth: 1,
                    },
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="properties"
                    options={{
                        title: 'Properties',
                        tabBarIcon: ({ color }: { color: string }) => (
                            <Ionicons size={24} name="home" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="blog"
                    options={{
                        title: 'blog',
                        tabBarIcon: ({ color }: { color: string }) => (
                            <Ionicons size={24} name="book" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="message"
                    options={{
                        title: 'Message',
                        tabBarIcon: ({ color }: { color: string }) => (
                            <AntDesign size={24} name="message" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }: { color: string }) => (
                            <Ionicons size={24} name="person" color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}