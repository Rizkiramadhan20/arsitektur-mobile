import React from 'react'

import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'

import { Ionicons, Feather } from '@expo/vector-icons'

import { useRouter } from 'expo-router'

import { useTheme } from '@/context/ThemeProvider'

function ListItem({ icon, label, value, onPress, theme }: { icon: React.ReactNode; label: string; value?: string; onPress?: () => void; theme: 'light' | 'dark' }) {
    const isDark = theme === 'dark'
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className={`flex-row items-center justify-between px-4 py-3.5 ${isDark ? 'bg-black' : 'bg-white'}`}
        >
            <View className="flex-row items-center gap-3">
                <View className={`w-7 h-7 rounded-full items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {icon}
                </View>
                <Text className={`text-sm ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{label}</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
                {value ? <Text className={`text-xs mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{value}</Text> : null}
                <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
            </View>
        </TouchableOpacity>
    )
}

export default function ProfileScreen() {
    const router = useRouter()
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <ScrollView
            className={`flex-1 ${isDark ? 'bg-black' : 'bg-gray-50'}`}
            contentContainerStyle={{ paddingBottom: 24 }}
        >
            <View className="flex-row items-center justify-between px-4 pt-3.5 pb-2.5">
                <TouchableOpacity
                    onPress={() => router.back()}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons name="chevron-back" size={24} color={isDark ? '#fff' : '#1F2937'} />
                </TouchableOpacity>
                <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    My Account
                </Text>
                <View className="w-6" />
            </View>

            <TouchableOpacity activeOpacity={0.8} className="flex-row items-center px-4 py-3 gap-3">
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100?img=13' }}
                    className="w-11 h-11 rounded-full"
                />
                <View className="flex-1">
                    <Text className={`text-base font-semibold mb-0.5 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Johan marshal
                    </Text>
                    <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        View profile
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
            </TouchableOpacity>

            <View className="mt-2">
                <ListItem
                    icon={<Ionicons name="notifications-outline" size={18} color={isDark ? '#E5E7EB' : '#6B7280'} />}
                    label="Notifications"
                    theme={theme}
                />
                <View className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'} ml-14`} />
                <ListItem
                    icon={<Feather name="type" size={18} color={isDark ? '#E5E7EB' : '#6B7280'} />}
                    label="Language"
                    value="English"
                    theme={theme}
                />
                <View className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'} ml-14`} />
                <ListItem
                    icon={<Ionicons name="globe-outline" size={18} color={isDark ? '#E5E7EB' : '#6B7280'} />}
                    label="Country"
                    value="Canada"
                    theme={theme}
                />
            </View>

            <View className="mt-2">
                <ListItem
                    icon={<Ionicons name="information-circle-outline" size={18} color={isDark ? '#E5E7EB' : '#6B7280'} />}
                    label="About"
                    theme={theme}
                />
                <View className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'} ml-14`} />
                <ListItem
                    icon={<Ionicons name="star-outline" size={18} color={isDark ? '#E5E7EB' : '#6B7280'} />}
                    label="Rate Us"
                    theme={theme}
                />
            </View>

            <View className="mt-2">
                <ListItem
                    icon={<Ionicons name={isDark ? 'moon' : 'sunny'} size={18} color={isDark ? '#E5E7EB' : '#6B7280'} />}
                    label="Theme"
                    value={isDark ? 'Dark' : 'Light'}
                    onPress={toggleTheme}
                    theme={theme}
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                className={`mt-2 px-4 py-3.5 ${isDark ? 'bg-black' : 'bg-white'}`}
            >
                <View className="flex-row items-center gap-3">
                    <View className="w-7 h-7 rounded-full items-center justify-center bg-transparent">
                        <Ionicons name="log-out-outline" size={18} color="#F87171" />
                    </View>
                    <Text className="text-sm text-red-400 font-medium">Log Out</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}