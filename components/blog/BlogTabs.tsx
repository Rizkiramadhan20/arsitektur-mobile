import React from 'react';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function BlogTabs({ activeTab, onTabChange, blogs }: BlogTabsProps) {
    const getUniqueCategories = () => {
        const categories = blogs.map(blog => blog.category);
        const uniqueCategories = [...new Set(categories)];

        const tabs = [
            { id: 'all', label: 'Semua' }
        ];

        uniqueCategories.forEach(category => {
            tabs.push({
                id: category.toLowerCase().replace(/\s+/g, '-'),
                label: category
            });
        });

        return tabs;
    };

    const tabs = getUniqueCategories();
    return (
        <View className="bg-white dark:bg-background border-b border-gray-200 dark:border-gray-700">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-4"
            >
                {/* Tab buttons */}
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => onTabChange(tab.id)}
                        className={`mr-6 py-3 ${activeTab === tab.id ? 'border-b-2 border-blue-500' : ''
                            }`}
                    >
                        <Text
                            className={`text-sm font-medium capitalize ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
                                }`}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
