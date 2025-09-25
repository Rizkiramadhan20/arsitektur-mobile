import React from 'react'

import { View, Text, TouchableOpacity, Image } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

type SearchCardProps = {
    property: Property
    isDark: boolean
    onPress: () => void
}

export default function SearchCard({ property, isDark, onPress }: SearchCardProps) {
    return (
        <TouchableOpacity
            className={`${isDark ? 'bg-card border-card-border active:bg-card' : 'bg-white border-gray-200 active:bg-gray-50'} rounded-3xl overflow-hidden border`}
            onPress={onPress}
            style={{
                shadowColor: isDark ? '#000' : '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isDark ? 0.3 : 0.1,
                shadowRadius: 8,
                elevation: 4,
            }}
        >
            {/* Full Width Image Section */}
            <View className="aspect-[4/3] relative">
                <Image
                    source={property.thumbnail ? { uri: property.thumbnail } : require('../../../assets/HomeScreen/img-1.jpg')}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {/* Type and Status Row */}
                <View className="absolute bottom-3 left-3 right-3 flex-row gap-2">
                    {/* Property Type */}
                    <View className="bg-accent-blue-600 px-3 py-1.5 rounded-xl border border-white/20">
                        <Text className="text-white text-xs font-bold capitalize">{property.type}</Text>
                    </View>

                    {/* Project Status */}
                    <View className="flex-row items-center bg-status-success px-3 py-1.5 rounded-xl border border-white/20">
                        <View className="w-2 h-2 bg-white/80 rounded-full mr-2" />
                        <Text className="text-white text-xs font-bold capitalize">
                            {property.statusProject}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Content Section */}
            <View className="p-5">
                {/* Property Title */}
                <Text className={`${isDark ? 'text-primary' : 'text-gray-900'} text-lg font-bold mb-3`} numberOfLines={2}>
                    {property.title}
                </Text>

                {/* Address */}
                <View className="flex-row items-center mb-4">
                    <Ionicons
                        name="location"
                        size={16}
                        color={isDark ? "#9ca3af" : "#6b7280"}
                        style={{ marginRight: 6 }}
                    />
                    <Text className={`${isDark ? 'text-secondary' : 'text-gray-600'} text-sm font-medium`} numberOfLines={1}>
                        {property.city}, {property.province}
                    </Text>
                </View>

                {/* Facilities */}
                {property.facilities && property.facilities.length > 0 && (
                    <View className="flex-row flex-wrap gap-2">
                        {property.facilities.slice(0, 2).map((facility: PropertyFacility, idx: number) => (
                            <View key={idx} className={`flex-row items-center ${isDark ? 'bg-zinc-800/80' : 'bg-gray-100'} px-3 py-2 rounded-xl border ${isDark ? 'border-zinc-700/50' : 'border-gray-200'}`}>
                                {facility.imageUrl ? (
                                    <Image
                                        source={{ uri: facility.imageUrl }}
                                        className="w-4 h-4 rounded-full mr-2 object-cover"
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View className={`w-2 h-2 rounded-full ${isDark ? 'bg-zinc-600' : 'bg-gray-400'} mr-2`} />
                                )}
                                <Text className={`${isDark ? 'text-secondary' : 'text-gray-700'} text-xs font-semibold`}>{facility.title}</Text>
                            </View>
                        ))}
                        {property.facilities.length > 2 && (
                            <View className={`${isDark ? 'bg-card' : 'bg-gray-100'} px-3 py-2 rounded-xl border ${isDark ? 'border-card-border' : 'border-gray-200'}`}>
                                <Text className={`${isDark ? 'text-secondary' : 'text-gray-700'} text-xs font-semibold`}>
                                    +{property.facilities.length - 2} more
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}