import { useState, useEffect, useMemo } from 'react'

import { fetchPropertiesByType } from '@/config/lib/FetchProperties'

export function useStateType({ type }: UseStateTypeProps) {
    // State
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<Property[]>([])
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const [endReachedDuringMomentum, setEndReachedDuringMomentum] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [hasNextPage, setHasNextPage] = useState<boolean>(true)

    // Filter states
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetchPropertiesByType(type, 1)
                setData(response.data)
                setHasNextPage(response.pagination.hasNextPage)
                setCurrentPage(1)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load properties')
            } finally {
                setLoading(false)
            }
        }

        if (type) {
            loadData()
        }
    }, [type])

    // Load more data
    const loadMore = async () => {
        if (!hasNextPage || isLoadingMore) return

        try {
            setIsLoadingMore(true)
            const nextPage = currentPage + 1
            const response = await fetchPropertiesByType(type, nextPage)

            setData(prev => [...prev, ...response.data])
            setHasNextPage(response.pagination.hasNextPage)
            setCurrentPage(nextPage)
        } catch (err) {
            console.error('Failed to load more properties:', err)
        } finally {
            setIsLoadingMore(false)
        }
    }

    // Refresh data
    const onRefresh = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetchPropertiesByType(type, 1)
            setData(response.data)
            setHasNextPage(response.pagination.hasNextPage)
            setCurrentPage(1)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refresh properties')
        } finally {
            setLoading(false)
        }
    }

    // Reset filters
    const resetFilters = () => {
        setSelectedProvince(null)
        setSelectedCity(null)
        setSelectedStatus(null)
        setSearchQuery('')
    }

    // Computed values
    const types = useMemo(() => {
        const uniqueTypes = Array.from(new Set(data.map(item => item.type)))
        return uniqueTypes
    }, [data])

    const provinces = useMemo(() => {
        const uniqueProvinces = Array.from(new Set(data.map(item => item.province)))
        return uniqueProvinces
    }, [data])

    const cities = useMemo(() => {
        const filteredData = selectedProvince
            ? data.filter(item => item.province === selectedProvince)
            : data
        const uniqueCities = Array.from(new Set(filteredData.map(item => item.city)))
        return uniqueCities
    }, [data, selectedProvince])

    const statuses = useMemo(() => {
        const uniqueStatuses = Array.from(new Set(data.map(item => item.statusProject)))
        return uniqueStatuses
    }, [data])

    const hasActiveFilters = useMemo(() => {
        return selectedProvince !== null || selectedCity !== null || selectedStatus !== null || searchQuery.trim() !== ''
    }, [selectedProvince, selectedCity, selectedStatus, searchQuery])

    const displayed = useMemo(() => {
        let filtered = data

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.city.toLowerCase().includes(query) ||
                item.province.toLowerCase().includes(query)
            )
        }

        // Apply province filter
        if (selectedProvince) {
            filtered = filtered.filter(item => item.province === selectedProvince)
        }

        // Apply city filter
        if (selectedCity) {
            filtered = filtered.filter(item => item.city === selectedCity)
        }

        // Apply status filter
        if (selectedStatus) {
            filtered = filtered.filter(item => item.statusProject === selectedStatus)
        }

        return filtered
    }, [data, searchQuery, selectedProvince, selectedCity, selectedStatus])

    return {
        // State
        loading,
        error,
        isLoadingMore,
        endReachedDuringMomentum,
        searchQuery,
        showFilter,
        selectedProvince,
        selectedCity,
        selectedStatus,

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
        setSelectedProvince,
        setSelectedCity,
        setSelectedStatus,
        setEndReachedDuringMomentum,
        loadMore,
        onRefresh,
        resetFilters
    }
}
