import React, { useState } from 'react'

import { Text, View, TextInput, Pressable, ScrollView } from 'react-native'

import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

export default function SignInScreen() {
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        router.replace('/(tabs)/properties')
    }

    return (
        <ScrollView className='flex-1 bg-black' contentContainerStyle={{ paddingBottom: 24 }}>
            <View className='px-4 pt-16 flex flex-col h-screen justify-between'>
                <View className='flex flex-col gap-4'>
                    <Text className='text-white text-5xl font-bold mt-10'>Welcome to</Text>
                    <Text className='text-white text-5xl font-bold mt-1'>Homz</Text>

                    <View className='flex flex-col gap-4 pt-32'>
                        <View className='border border-white/10 rounded-xl px-4 py-3'>
                            <View className='flex-row items-center gap-3'>
                                <Ionicons name='mail-outline' size={20} color={'#9CA3AF'} />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder='Email'
                                    placeholderTextColor={'#7A7A7A'}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    className='text-white flex-1'
                                />
                            </View>
                        </View>

                        <View className='border border-white/10 rounded-xl px-4 py-3'>
                            <View className='flex-row items-center gap-3'>
                                <Ionicons name='lock-closed-outline' size={20} color={'#9CA3AF'} />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder='Password'
                                    placeholderTextColor={'#7A7A7A'}
                                    secureTextEntry
                                    className='text-white flex-1'
                                />
                            </View>
                        </View>

                        <Pressable className='self-end mt-2' onPress={() => { }}>
                            <Text className='text-blue-400 text-sm'>Forgot Password?</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={handleSignIn}
                        className='mt-6 bg-blue-600 py-4 rounded-xl items-center'
                        accessibilityLabel='Sign In'
                    >
                        <Text className='text-white font-semibold'>Sign In</Text>
                    </Pressable>

                    <View className='mt-4 flex-row justify-center'>
                        <Text className='text-white/60'>Don&apos;t have an account? </Text>
                        <Pressable onPress={() => router.push('/auth/signup')} accessibilityLabel='Go to Sign Up'>
                            <Text className='text-blue-400'>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>

                <Pressable className='mt-6 items-center' onPress={() => router.replace('/(tabs)/properties')}>
                    <Text className='text-blue-400'>Skip and Start Browsing</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}