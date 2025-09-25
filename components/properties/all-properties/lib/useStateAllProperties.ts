import { useCallback, useEffect, useState } from 'react'

import { fetchProperties } from '@/config/lib/FetchProperties'

export const useStateAllProperties = () => {
    // Core data state
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [endReachedDuringMomentum, setEndReachedDuringMomentum] = useState<boolean>(false)

    // Search state
    const [searchQuery, setSearchQuery] = useState<string>('')

    // Filter state
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
    const [filtered, setFiltered] = useState<Property[] | null>(null)

    // Load properties function
    const load = useCallback(async (pageToLoad: number) => {
        try {
            if (pageToLoad === 1) setLoading(true)
            else setIsLoadingMore(true)
            setError(null)
            const res = await fetchProperties(pageToLoad)
            const data = res?.data ?? []
            setProperties(prev => pageToLoad === 1 ? data : [...prev, ...data])
            setHasMore(Array.isArray(data) ? data.length > 0 : false)
            setPage(pageToLoad)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load properties'
            if (pageToLoad > 1 && message.toLowerCase().includes('no properties data')) {
                setHasMore(false)
                setError(null)
            } else {
                setError(message)
            }
        } finally {
            setLoading(false)
            setIsLoadingMore(false)
        }
    }, [])

    // Load more function
    const loadMore = useCallback(() => {
        if (isLoadingMore || !hasMore) return
        load(page + 1)
    }, [isLoadingMore, hasMore, page, load])

    // Refresh function
    const onRefresh = useCallback(() => {
        load(1)
    }, [load])

    // Reset filters function
    const resetFilters = useCallback(() => {
        setSelectedType(null)
        setSelectedProvince(null)
        setSelectedCity(null)
        setSelectedStatus(null)
        setFiltered(null)
    }, [])

    // Computed values
    const types = Array.from(new Set(properties.map(p => p.type))).filter(Boolean)
    const allProvinces = Array.from(new Set(properties.map(p => p.province))).filter(Boolean)
    const allCities = Array.from(new Set(properties.map(p => p.city))).filter(Boolean)
    const statuses = Array.from(new Set(properties.map(p => p.statusProject))).filter(Boolean as unknown as (v: unknown) => v is string)

    const provinces = selectedCity
        ? Array.from(new Set(properties.filter(p => p.city === selectedCity).map(p => p.province))).filter(Boolean)
        : allProvinces

    const cities = selectedProvince
        ? Array.from(new Set(properties.filter(p => p.province === selectedProvince).map(p => p.city))).filter(Boolean)
        : allCities

    const hasActiveFilters = Boolean(selectedType || selectedProvince || selectedCity || selectedStatus)
    const displayed = filtered ?? properties

    // Effects
    useEffect(() => {
        load(1)
    }, [load])

    // Filter effect
    useEffect(() => {
        if (!hasActiveFilters) {
            setFiltered(null)
            return
        }
        const next = properties.filter(p => {
            if (selectedType && p.type !== selectedType) return false
            if (selectedProvince && p.province !== selectedProvince) return false
            if (selectedCity && p.city !== selectedCity) return false
            if (selectedStatus && p.statusProject !== selectedStatus) return false
            return true
        })
        setFiltered(next)
    }, [selectedType, selectedProvince, selectedCity, selectedStatus, properties, hasActiveFilters])

    // Keep selections compatible when either side changes
    useEffect(() => {
        if (selectedCity && !provinces.includes(selectedProvince || '')) {
            setSelectedProvince(null)
        }
    }, [selectedCity, provinces, selectedProvince])

    useEffect(() => {
        if (selectedProvince && !cities.includes(selectedCity || '')) {
            setSelectedCity(null)
        }
    }, [selectedProvince, cities, selectedCity])

    return {
        // State
        properties,
        loading,
        error,
        page,
        isLoadingMore,
        hasMore,
        endReachedDuringMomentum,
        searchQuery,
        showFilter,
        selectedType,
        selectedProvince,
        selectedCity,
        selectedStatus,
        filtered,

        // Computed values
        types,
        provinces,
        cities,
        statuses,
        hasActiveFilters,
        displayed,

        // Actions
        setSearchQuery,
        setShowFilter,
        setSelectedType,
        setSelectedProvince,
        setSelectedCity,
        setSelectedStatus,
        setEndReachedDuringMomentum,
        load,
        loadMore,
        onRefresh,
        resetFilters
    }
}
