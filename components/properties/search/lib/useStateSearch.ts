import { useState, useEffect, useRef, useCallback } from 'react'

import { TextInput } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

export type UseStateSearchParams = {
    initialQuery?: string
    fetchProperties: (page: number) => Promise<{ data: Property[] }>
}

export function useStateSearch(params: UseStateSearchParams) {
    const { initialQuery = '', fetchProperties } = params

    const [searchQuery, setSearchQuery] = useState(initialQuery)
    const [properties, setProperties] = useState<Property[]>([])
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(false)
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [recentViews, setRecentViews] = useState<Property[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [showAllRecentSearches, setShowAllRecentSearches] = useState(false)
    const searchInputRef = useRef<TextInput>(null)

    const handleSearchChange = (text: string) => {
        setSearchQuery(text)
    }

    const clearSearch = () => {
        setSearchQuery('')
    }

    const loadRecentSearches = async () => {
        try {
            const stored = await AsyncStorage.getItem('recentSearches')
            if (stored) {
                const parsedSearches = JSON.parse(stored)
                setRecentSearches(parsedSearches)
            }
        } catch {
        }
    }

    const loadRecentViews = async () => {
        try {
            const stored = await AsyncStorage.getItem('recentViews')
            if (stored) {
                const parsedViews = JSON.parse(stored)
                setRecentViews(parsedViews)
            }
        } catch {
        }
    }

    const saveRecentSearch = useCallback(async (searchTerm: string) => {
        if (!searchTerm.trim()) return
        try {
            setRecentSearches(prevSearches => {
                const filtered = prevSearches.filter(search => search !== searchTerm)
                const newSearches = [searchTerm, ...filtered].slice(0, 5)
                AsyncStorage.setItem('recentSearches', JSON.stringify(newSearches))
                return newSearches
            })
        } catch {
        }
    }, [])

    const removeRecentSearch = useCallback(async (index: number) => {
        try {
            setRecentSearches(prevSearches => {
                const newSearches = prevSearches.filter((_, i) => i !== index)
                AsyncStorage.setItem('recentSearches', JSON.stringify(newSearches))
                return newSearches
            })
        } catch {
        }
    }, [])

    const handleRecentSearchPress = (searchTerm: string) => {
        setSearchQuery(searchTerm)
        searchInputRef.current?.focus()
    }

    const handlePropertyClick = (property: Property) => {
        // placeholder for navigation/analytics
    }

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true)
                const response = await fetchProperties(1)
                setProperties(response.data)
                setFilteredProperties(response.data)
            } catch {
            } finally {
                setLoading(false)
            }
        }

        loadProperties()
        loadRecentSearches()
        loadRecentViews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            searchInputRef.current?.focus()
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (initialQuery && initialQuery.trim()) {
            setHasSearched(true)
            saveRecentSearch(initialQuery)
        }
    }, [initialQuery, saveRecentSearch])

    useEffect(() => {
        if (hasSearched && searchQuery.trim()) {
            const filtered = properties.filter(property =>
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.type.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredProperties(filtered)
        } else if (!hasSearched) {
            setFilteredProperties(properties)
        }
    }, [searchQuery, properties, hasSearched])

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            setHasSearched(true)
            saveRecentSearch(searchQuery)
        }
    }

    return {
        // state
        searchQuery,
        properties,
        filteredProperties,
        loading,
        recentSearches,
        recentViews,
        hasSearched,
        showAllRecentSearches,
        // refs
        searchInputRef,
        // actions
        setShowAllRecentSearches,
        setRecentSearches,
        handleSearchChange,
        clearSearch,
        removeRecentSearch,
        handleRecentSearchPress,
        handlePropertyClick,
        handleSearchSubmit,
    }
}
