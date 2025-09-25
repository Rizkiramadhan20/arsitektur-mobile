import React, { useEffect, useRef, useState } from 'react'

import { Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { router } from 'expo-router'

import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

import Toast from 'react-native-toast-message'

import { API_CONFIG, getApiUrl, isApiAvailable } from '@/config/api/api'

import { useTheme } from '@/context/ThemeProvider'

interface TempUserData {
    uid: string
    email: string
    phone?: string
    displayName: string
    createdAt: string
}

export default function Verification() {
    const [code, setCode] = useState(['', '', '', ''])
    const [submitting, setSubmitting] = useState(false)
    const [resending, setResending] = useState(false)
    const inputs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]
    const [tempUser, setTempUser] = useState<TempUserData | null>(null)
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem('temp_user_data')
                if (raw) setTempUser(JSON.parse(raw))
            } catch { }
        })()
    }, [])

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1)
        const next = [...code]
        next[index] = value.replace(/[^0-9]/g, '')
        setCode(next)
        if (value && index < inputs.length - 1) {
            inputs[index + 1].current?.focus()
        }
    }

    const handleKeyPress = (index: number, key: string) => {
        if (key === 'Backspace' && !code[index] && index > 0) {
            inputs[index - 1].current?.focus()
        }
    }

    const verify = async () => {
        const otp = code.join('')
        if (otp.length !== 4 || !tempUser) return
        if (!isApiAvailable()) {
            Toast.show({ type: 'error', text1: 'API tidak tersedia.' })
            return
        }
        setSubmitting(true)
        try {
            const url = await getApiUrl(API_CONFIG.ENDPOINTS.VERIFY_OTP_EMAIL)
            await axios.post(url, { email: tempUser.email, uid: tempUser.uid, code: otp })
            Toast.show({ type: 'success', text1: 'Verifikasi berhasil' })
            router.replace('/auth/verification-success')
        } catch {
            Toast.show({ type: 'error', text1: 'Kode salah atau kedaluwarsa' })
        } finally {
            setSubmitting(false)
        }
    }

    const resend = async () => {
        if (!tempUser) return
        if (!isApiAvailable()) {
            Toast.show({ type: 'error', text1: 'API tidak tersedia.' })
            return
        }
        setResending(true)
        try {
            const url = await getApiUrl(API_CONFIG.ENDPOINTS.SEND_OTP_EMAIL)
            await axios.post(url, { email: tempUser.email, displayName: tempUser.displayName })
            Toast.show({ type: 'success', text1: 'Kode dikirim ulang ke email' })
        } catch {
            Toast.show({ type: 'error', text1: 'Gagal mengirim ulang kode' })
        } finally {
            setResending(false)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className={`flex-1 ${isDark ? 'bg-background' : 'bg-gray-50'}`}>
            <View className='px-4 pt-16 flex-1'>
                <View className='flex-row items-center'>
                    <Pressable onPress={() => router.back()} className='p-2 -ml-2' accessibilityLabel='Go back'>
                        <Ionicons name='chevron-back' size={24} color={isDark ? '#FFFFFF' : '#000000'} />
                    </Pressable>
                    <View className='flex-1 items-center -ml-6'>
                        <Text className={`${isDark ? 'text-text-primary' : 'text-gray-900'} text-base font-semibold`}>Verification Code</Text>
                    </View>
                    <View style={{ width: 24 }} />
                </View>

                <View className='mt-6'>
                    <Text className={`${isDark ? 'text-text-primary' : 'text-gray-900'} text-base font-semibold`}>Enter the Verification Code.</Text>
                    <Text className={`${isDark ? 'text-text-secondary' : 'text-gray-500'} text-xs mt-1`}>We have sent a verification code to your email.</Text>
                </View>

                <View className='flex-row justify-between mt-6'>
                    {code.map((digit, idx) => (
                        <View key={idx} className={`w-16 h-16 border ${isDark ? 'border-white/10' : 'border-gray-300'} rounded-xl items-center justify-center`}>
                            <TextInput
                                ref={inputs[idx]}
                                value={digit}
                                onChangeText={(v) => handleChange(idx, v)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(idx, nativeEvent.key)}
                                keyboardType='number-pad'
                                maxLength={1}
                                placeholder=''
                                placeholderTextColor={isDark ? '#7A7A7A' : '#9CA3AF'}
                                className={`${isDark ? 'text-text-primary' : 'text-gray-900'} text-2xl text-center w-full h-full`}
                            />
                        </View>
                    ))}
                </View>

                <Pressable
                    disabled={submitting}
                    onPress={verify}
                    className='mt-6 bg-accent-blue-600 py-4 rounded-xl items-center'
                    accessibilityLabel='Continue'
                >
                    <Text className={`${isDark ? 'text-text-primary' : 'text-white'} font-semibold`}>Continue</Text>
                </Pressable>

                <View className='mt-4 flex-row'>
                    <Text className={`${isDark ? 'text-text-secondary' : 'text-gray-500'} text-sm`}>If you didn&apos;t receive the code?</Text>
                    <Pressable disabled={resending} onPress={resend} className='ml-1'>
                        <Text className='text-accent-blue-400 text-sm'>Resend</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}