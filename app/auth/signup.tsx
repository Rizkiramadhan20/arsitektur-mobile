import React, { useState } from 'react'

import { Text, View, TextInput, Pressable, ScrollView } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { router } from 'expo-router'

import { useAuth } from '@/context/AuthContext'

import { MotiView } from 'moti'

export default function SignUpScreen() {
    const { register, loading } = useAuth()

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {
        if (!displayName || !email || !password || !confirmPassword) return
        if (password !== confirmPassword) return
        const ok = await register({ email, password, displayName, phone })
        if (ok) {
            router.replace('/auth/verification')
        }
    }

    return (
        <ScrollView className='flex-1 bg-background' contentContainerStyle={{ paddingBottom: 24 }}>
            <View className='px-4 pt-16 flex flex-col h-screen justify-between'>
                <View className='flex flex-col gap-4'>
                    <MotiView
                        from={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600 }}
                    >
                        <View className='flex-row items-center'>
                            <Pressable onPress={() => router.back()} className='p-2 -ml-2' accessibilityLabel='Go back'>
                                <Ionicons name='chevron-back' size={24} color='#FFFFFF' />
                            </Pressable>
                            <View className='flex-1 items-center -ml-6'>
                                <Text className='text-text-primary text-base font-semibold'>Create Account</Text>
                            </View>
                            <View style={{ width: 24 }} />
                        </View>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: 30 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 200 }}
                    >
                        <View className='flex flex-col gap-4 pt-10'>
                            <MotiView
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 400 }}
                            >
                                <View className='border border-white/10 rounded-xl px-4 py-3'>
                                    <View className='flex-row items-center gap-3'>
                                        <Ionicons name='person-outline' size={20} color='#9CA3AF' />
                                        <TextInput
                                            value={displayName}
                                            onChangeText={setDisplayName}
                                            placeholder='Name'
                                            placeholderTextColor='#7A7A7A'
                                            className='text-text-primary flex-1'
                                        />
                                    </View>
                                </View>
                            </MotiView>

                            <MotiView
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 500 }}
                            >
                                <View className='border border-white/10 rounded-xl px-4 py-3'>
                                    <View className='flex-row items-center gap-3'>
                                        <Ionicons name='mail-outline' size={20} color='#9CA3AF' />
                                        <TextInput
                                            value={email}
                                            onChangeText={setEmail}
                                            placeholder='Email'
                                            placeholderTextColor='#7A7A7A'
                                            keyboardType='email-address'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            className='text-text-primary flex-1'
                                        />
                                    </View>
                                </View>
                            </MotiView>

                            <MotiView
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 600 }}
                            >
                                <View className='border border-white/10 rounded-xl px-4 py-3'>
                                    <View className='flex-row items-center gap-3'>
                                        <Ionicons name='call-outline' size={20} color='#9CA3AF' />
                                        <TextInput
                                            value={phone}
                                            onChangeText={setPhone}
                                            placeholder='Mobile Number'
                                            placeholderTextColor='#7A7A7A'
                                            keyboardType='phone-pad'
                                            className='text-text-primary flex-1'
                                        />
                                    </View>
                                </View>
                            </MotiView>

                            <MotiView
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 700 }}
                            >
                                <View className='border border-white/10 rounded-xl px-4 py-3'>
                                    <View className='flex-row items-center gap-3'>
                                        <Ionicons name='lock-closed-outline' size={20} color='#9CA3AF' />
                                        <TextInput
                                            value={password}
                                            onChangeText={setPassword}
                                            placeholder='Password'
                                            placeholderTextColor='#7A7A7A'
                                            secureTextEntry
                                            className='text-text-primary flex-1'
                                        />
                                    </View>
                                </View>
                            </MotiView>

                            <MotiView
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 800 }}
                            >
                                <View className='border border-white/10 rounded-xl px-4 py-3'>
                                    <View className='flex-row items-center gap-3'>
                                        <Ionicons name='lock-closed-outline' size={20} color='#9CA3AF' />
                                        <TextInput
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            placeholder='Confirm Password'
                                            placeholderTextColor='#7A7A7A'
                                            secureTextEntry
                                            className='text-text-primary flex-1'
                                        />
                                    </View>
                                </View>
                            </MotiView>
                        </View>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'timing', duration: 500, delay: 900 }}
                    >
                        <Pressable
                            disabled={loading}
                            onPress={handleSignUp}
                            className='mt-6 bg-accent-blue-600 py-4 rounded-xl items-center'
                            accessibilityLabel='Sign Up'
                        >
                            <Text className='text-text-primary font-semibold'>Sign Up</Text>
                        </Pressable>
                    </MotiView>
                </View>
            </View>
        </ScrollView>
    )
}   