import React, { useMemo, useState } from 'react'

import { Image, Text, TouchableOpacity, View } from 'react-native'

import { WebView } from 'react-native-webview'

type MediaPlayetProps = {
    html: string
}

export default function MediaPlayet({ html }: MediaPlayetProps) {
    const blocks = useMemo(() => parseSimpleHtml(html), [html])

    return (
        <View className='flex-col'>
            {blocks.map((block, index) => {
                if (block.type === 'paragraph') {
                    return (
                        <Text key={index} className='text-zinc-300 leading-6 mb-3'>
                            {block.text}
                        </Text>
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
    | { type: 'youtube'; url: string; videoId: string }

function parseSimpleHtml(inputHtml: string): ParsedBlock[] {
    const blocks: ParsedBlock[] = []
    const tokens = inputHtml.match(/(<p>[\s\S]*?<\/p>)|(<iframe[\s\S]*?<\/iframe>)|(<br\s*\/>)/gi) || []

    for (const token of tokens) {
        if (/^<p>/i.test(token)) {
            const text = token
                .replace(/^<p>/i, '')
                .replace(/<\/p>$/i, '')
                .replace(/<br\s*\/>/gi, '\n')
                .replace(/<[^>]+>/g, '')
                .trim()
            if (text.length > 0) {
                blocks.push({ type: 'paragraph', text })
            }
            continue
        }

        if (/^<iframe/i.test(token)) {
            const srcMatch = token.match(/src\s*=\s*"([^"]+)"/i)
            const url = srcMatch ? srcMatch[1] : ''
            const idMatch = url.match(/embed\/([a-zA-Z0-9_-]+)/)
            if (url && idMatch && idMatch[1]) {
                blocks.push({ type: 'youtube', url, videoId: idMatch[1] })
            }
            continue
        }

        if (/^<br/i.test(token)) {
            blocks.push({ type: 'paragraph', text: '' })
        }
    }

    return blocks
}

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1&modestbranding=1&rel=0&fs=1`

    if (!isPlaying) {
        return (
            <View className='w-full mb-4'>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setIsPlaying(true)}
                    className='rounded-xl overflow-hidden border border-zinc-700'
                >
                    <View className='bg-black' style={{ aspectRatio: 16 / 9 }}>
                        <Image source={{ uri: thumbnail }} className='w-full h-full' resizeMode='cover' />
                        <View className='absolute inset-0 items-center justify-center'>
                            <View className='h-14 w-14 rounded-full bg-black/60 items-center justify-center'>
                                <Text className='text-white text-xl'>▶</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View className='w-full mb-4 rounded-xl overflow-hidden border border-zinc-700' style={{ aspectRatio: 16 / 9 }}>
            <WebView
                source={{ uri: embedUrl }}
                allowsFullscreenVideo
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled
                domStorageEnabled
                allowsInlineMediaPlayback
                automaticallyAdjustContentInsets={false}
                style={{ backgroundColor: 'black' }}
            />
        </View>
    )
}