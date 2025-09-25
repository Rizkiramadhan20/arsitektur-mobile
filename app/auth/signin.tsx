import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MotiView } from 'moti'
import { useTheme } from '@/context/ThemeProvider'

export default function SignInScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const handleSignIn = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        // Mark that user has visited auth page
        await AsyncStorage.setItem('has_visited_auth', 'true');
        router.replace('/(tabs)/properties')
    }

    const handleSkip = async () => {
        // Mark that user has visited auth page
        await AsyncStorage.setItem('has_visited_auth', 'true');
        router.replace('/(tabs)/properties')
    }

    return (
        <ScrollView className={`flex-1 ${isDark ? 'bg-background' : 'bg-gray-50'}`} contentContainerStyle={{ paddingBottom: 24 }}>
            <View className='px-4 pt-16 flex flex-col h-screen justify-between'>
                <View className='flex flex-col gap-4'>
                    <MotiView
                        from={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600 }}
                    >
                        <Text className={`${isDark ? 'text-text-primary' : 'text-gray-900'} text-5xl font-bold mt-10`}>Welcome to</Text>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 200 }}
                    >
                        <Text className={`${isDark ? 'text-text-primary' : 'text-gray-900'} text-5xl font-bold mt-1`}>Homz</Text>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: 30 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 600, delay: 400 }}
                    >
                        <View className='flex flex-col gap-4 pt-32'>
                            <MotiView
                                from={{ opacity: 0, translateX: -20 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 600 }}
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
                                <Pressable className='self-end mt-2' onPress={() => { }}>
                                    <Text className='text-accent-blue-400 text-sm'>Forgot Password?</Text>
                                </Pressable>
                            </MotiView>
                        </View>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'timing', duration: 500, delay: 900 }}
                    >
                        <Pressable
                            onPress={handleSignIn}
                            disabled={isLoading}
                            className={`mt-6 py-4 rounded-xl items-center ${isLoading ? 'bg-accent-blue-400' : 'bg-accent-blue-600'}`}
                            accessibilityLabel='Sign In'
                        >
                            {isLoading ? (
                                <MotiView
                                    from={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'timing', duration: 300 }}
                                >
                                    <Text className='text-text-primary font-semibold'>Signing In...</Text>
                                </MotiView>
                            ) : (
                                <Text className='text-text-primary font-semibold'>Sign In</Text>
                            )}
                        </Pressable>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 1000 }}
                    >
                        <View className='mt-4 flex-row justify-center'>
                            <Text className='text-text-secondary'>Don&apos;t have an account? </Text>
                            <Pressable onPress={() => router.push('/auth/signup')} accessibilityLabel='Go to Sign Up'>
                                <Text className='text-accent-blue-400'>Sign Up</Text>
                            </Pressable>
                        </View>
                    </MotiView>
                </View>

                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 500, delay: 1100 }}
                >
                    <Pressable className='mt-6 items-center' onPress={handleSkip}>
                        <Text className='text-accent-blue-400'>Skip and Start Browsing</Text>
                    </Pressable>
                </MotiView>
            </View>
        </ScrollView>
    )
}