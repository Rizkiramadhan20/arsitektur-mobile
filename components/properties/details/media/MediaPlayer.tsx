import React, { useMemo, useState, useEffect, useRef } from 'react'

import { Image, Text, TouchableOpacity, View, ActivityIndicator, Animated, StyleSheet } from 'react-native'

import { WebView } from 'react-native-webview'

import { Ionicons } from '@expo/vector-icons'

type MediaPlayetProps = {
    html: string
}

export default function MediaPlayet({ html }: MediaPlayetProps) {
    const blocks = useMemo(() => parseSimpleHtml(html), [html])

    return (
        <View className='flex-col mb-4'>
            {blocks.map((block, index) => {
                if (block.type === 'paragraph') {
                    return (
                        <Text key={index} className='text-zinc-300 leading-6 mb-4 mt-2'>
                            {block.text}
                        </Text>
                    )
                }

                if (block.type === 'heading') {
                    const headingSizes = {
                        1: 'text-3xl',
                        2: 'text-2xl',
                        3: 'text-xl',
                        4: 'text-lg',
                        5: 'text-base',
                        6: 'text-sm'
                    }
                    return (
                        <Text key={index} className={`${headingSizes[block.level as keyof typeof headingSizes] || 'text-lg'} font-bold text-white mb-4 mt-6`}>
                            {block.text}
                        </Text>
                    )
                }

                if (block.type === 'orderedList') {
                    return (
                        <View key={index} className='mb-4 mt-2'>
                            {block.items.map((item, itemIndex) => (
                                <View key={itemIndex} className='flex-row mb-2'>
                                    <Text className='text-zinc-300 mr-2 min-w-[20px]'>{itemIndex + 1}.</Text>
                                    <Text className='text-zinc-300 flex-1 leading-6'>{item}</Text>
                                </View>
                            ))}
                        </View>
                    )
                }

                if (block.type === 'unorderedList') {
                    return (
                        <View key={index} className='mb-4 mt-2'>
                            {block.items.map((item, itemIndex) => (
                                <View key={itemIndex} className='flex-row mb-2'>
                                    <Text className='text-zinc-300 mr-2'>•</Text>
                                    <Text className='text-zinc-300 flex-1 leading-6'>{item}</Text>
                                </View>
                            ))}
                        </View>
                    )
                }

                if (block.type === 'youtube') {
                    return <YouTubeEmbed key={index} videoId={block.videoId} />
                }

                return null
            })}
        </View>
    )
}

type ParsedBlock =
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; level: number; text: string }
    | { type: 'orderedList'; items: string[] }
    | { type: 'unorderedList'; items: string[] }
    | { type: 'youtube'; url: string; videoId: string }

function parseSimpleHtml(inputHtml: string): ParsedBlock[] {
    const blocks: ParsedBlock[] = []

    const tokens = inputHtml.match(/(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)|(<ol[^>]*>[\s\S]*?<\/ol>)|(<ul[^>]*>[\s\S]*?<\/ul>)|(<p[^>]*>[\s\S]*?<\/p>)|(<iframe[\s\S]*?<\/iframe>)|(<br\s*\/?>)/gi) || []

    for (const token of tokens) {
        if (/^<h[1-6]/i.test(token)) {
            const levelMatch = token.match(/^<h([1-6])/i)
            const level = levelMatch ? parseInt(levelMatch[1]) : 3

            const text = token
                .replace(/^<h[1-6][^>]*>/i, '')
                .replace(/<\/h[1-6]>$/i, '')
                .replace(/<[^>]+>/g, '')
                .trim()

            if (text.length > 0) {
                blocks.push({ type: 'heading', level, text })
            }
            continue
        }

        if (/^<ol/i.test(token)) {
            const items = extractListItems(token)
            if (items.length > 0) {
                blocks.push({ type: 'orderedList', items })
            }
            continue
        }

        // Handle unordered lists (ul)
        if (/^<ul/i.test(token)) {
            const items = extractListItems(token)
            if (items.length > 0) {
                blocks.push({ type: 'unorderedList', items })
            }
            continue
        }

        // Handle paragraphs
        if (/^<p/i.test(token)) {
            const text = token
                .replace(/^<p[^>]*>/i, '')
                .replace(/<\/p>$/i, '')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]+>/g, '')
                .trim()
            if (text.length > 0) {
                blocks.push({ type: 'paragraph', text })
            }
            continue
        }

        // Handle iframe (YouTube)
        if (/^<iframe/i.test(token)) {
            const srcMatch = token.match(/src\s*=\s*"([^"]+)"/i)
            const url = srcMatch ? srcMatch[1] : ''
            const idMatch = url.match(/embed\/([a-zA-Z0-9_-]+)/)
            if (url && idMatch && idMatch[1]) {
                blocks.push({ type: 'youtube', url, videoId: idMatch[1] })
            }
            continue
        }

        // Handle line breaks
        if (/^<br/i.test(token)) {
            blocks.push({ type: 'paragraph', text: '' })
        }
    }

    return blocks
}

function extractListItems(listHtml: string): string[] {
    const items: string[] = []
    const liMatches = listHtml.match(/<li[^>]*>[\s\S]*?<\/li>/gi) || []

    for (const li of liMatches) {
        const text = li
            .replace(/^<li[^>]*>/i, '')
            .replace(/<\/li>$/i, '')
            .replace(/<[^>]+>/g, '')
            .trim()

        if (text.length > 0) {
            items.push(text)
        }
    }

    return items
}

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1&modestbranding=1&rel=0&fs=1&showinfo=0&iv_load_policy=3`

    // Animation values
    const pulseAnim = useRef(new Animated.Value(1)).current
    const scaleAnim = useRef(new Animated.Value(1)).current
    const rotateAnim = useRef(new Animated.Value(0)).current
    const iconScaleAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (!isPlaying && !isLoading) {
            // Synchronized animations with larger scale ranges
            const animationDuration = 2000 // Base duration for synchronization

            // Pulse animation - smaller range
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.15,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }),
                ])
            )

            // Scale animation for play button - smaller range
            const scaleAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.2,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 0.95,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }),
                ])
            )

            // Rotation animation - synchronized with scale
            const rotateAnimation = Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: animationDuration * 2, // Full rotation in 2 cycles
                    useNativeDriver: true,
                })
            )

            // Icon scale animation - smaller range
            const iconScaleAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(iconScaleAnim, {
                        toValue: 1.25,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(iconScaleAnim, {
                        toValue: 0.9,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }),
                ])
            )

            pulseAnimation.start()
            scaleAnimation.start()
            rotateAnimation.start()
            iconScaleAnimation.start()

            return () => {
                pulseAnimation.stop()
                scaleAnimation.stop()
                rotateAnimation.stop()
                iconScaleAnimation.stop()
            }
        }
    }, [isPlaying, isLoading, pulseAnim, scaleAnim, rotateAnim, iconScaleAnim])

    const handlePlayPress = () => {
        setIsLoading(true)
        setIsPlaying(true)

        // Simulate loading time - in real app, you might want to listen to WebView events
        setTimeout(() => {
            setIsLoading(false)
        }, 2000) // 2 seconds loading time
    }

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
            tension: 300,
            friction: 10,
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 300,
            friction: 10,
        }).start()
    }

    if (!isPlaying) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePlayPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={styles.thumbnailContainer}
                >
                    <View style={styles.videoContainer}>
                        <Image
                            source={{ uri: thumbnail }}
                            style={styles.thumbnailImage}
                            resizeMode='cover'
                        />

                        {/* Gradient overlay for better contrast */}
                        <View style={styles.gradientOverlay} />

                        {/* YouTube branding */}
                        <View style={styles.youtubeBadge}>
                            <Text style={styles.youtubeText}>YouTube</Text>
                        </View>

                        {/* Play button with enhanced styling */}
                        <View style={styles.playButtonContainer}>
                            <Animated.View
                                style={[
                                    styles.playButton,
                                    {
                                        transform: [{ scale: scaleAnim }]
                                    }
                                ]}
                            >
                                <Animated.View
                                    style={[
                                        styles.playIcon,
                                        {
                                            transform: [
                                                {
                                                    rotate: rotateAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['0deg', '360deg'],
                                                    })
                                                },
                                                {
                                                    scale: iconScaleAnim
                                                }
                                            ]
                                        }
                                    ]}
                                >
                                    <Ionicons
                                        name="play-circle"
                                        size={32}
                                        color="#ffffff"
                                    />
                                </Animated.View>
                            </Animated.View>
                        </View>

                        {/* Animated pulse ring */}
                        <View style={styles.pulseContainer}>
                            <Animated.View
                                style={[
                                    styles.pulseRing,
                                    {
                                        transform: [{ scale: pulseAnim }]
                                    }
                                ]}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[styles.container, styles.playingContainer]}>
            <View style={styles.webViewContainer}>
                <WebView
                    source={{ uri: embedUrl }}
                    allowsFullscreenVideo
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled
                    domStorageEnabled
                    allowsInlineMediaPlayback
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    onLoadStart={() => {
                        // WebView started loading
                        console.log('WebView started loading')
                    }}
                    onLoadEnd={() => {
                        // WebView finished loading
                        console.log('WebView finished loading')
                        setIsLoading(false)
                    }}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent
                        console.warn('WebView error: ', nativeEvent)
                        setIsLoading(false)
                    }}
                    onHttpError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent
                        console.warn('WebView HTTP error: ', nativeEvent)
                        setIsLoading(false)
                    }}
                />

                {/* Loading Overlay */}
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                size="large"
                                color="#3b82f6"
                                style={styles.loadingSpinner}
                            />
                            <Text style={styles.loadingText}>Loading video...</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
    },
    thumbnailContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    videoContainer: {
        aspectRatio: 16 / 9,
        backgroundColor: '#60a5fa', // YouTube red
        position: 'relative',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    youtubeBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#3b82f6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    youtubeText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    playButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(24, 24, 27, 0.7)',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulseContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulseRing: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    playingContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    webViewContainer: {
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
    },
    webView: {
        backgroundColor: '#000',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    loadingSpinner: {
        marginBottom: 12,
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
})
