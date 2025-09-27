import React from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import { formatDate } from '@/hooks/formatDate';

export default function BlogCard({ blog, onBookmark, onMoreOptions }: BlogCardProps) {

    return (
        <TouchableOpacity className="flex-row p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-background">
            {/* Left side - Content */}
            <View className="flex-1 pr-3">
                {/* Author info */}
                <View className="flex-row items-center mb-2">
                    <Image
                        source={{ uri: blog.author.photoURL }}
                        className="w-6 h-6 rounded-full mr-2"
                        defaultSource={require('../../assets/images/icon.png')}
                    />
                    <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">{blog.author.name}</Text>
                </View>

                {/* Title */}
                <Text className="text-base font-semibold text-gray-900 dark:text-white mb-2 leading-5" numberOfLines={3}>
                    {blog.title}
                </Text>

                {/* Date */}
                <Text className="text-xs text-gray-500 dark:text-gray-400">{formatDate(blog.createdAt)}</Text>
            </View>

            {/* Right side - Image */}
            <View className="w-32">
                {/* Thumbnail */}
                <Image
                    source={{ uri: blog.thumbnail }}
                    className="w-full aspect-[4/3] rounded-lg mb-2"
                    defaultSource={require('../../assets/images/icon.png')}
                />
            </View>
        </TouchableOpacity>
    );
}
