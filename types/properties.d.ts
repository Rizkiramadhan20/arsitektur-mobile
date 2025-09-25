//================== Property ==================//
interface Property {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    province: string;
    city: string;
    type: string;
    facilities: PropertyFacility[];
    statusProject: string;
    createdAt: string;
}

interface PropertyFacility {
    imageUrl: string;
    title: string;
}

interface Pagination {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
    totalItems: number;
}

interface PropertiesResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    ok: boolean;
    data: Property[];
    pagination: Pagination;
}

//================== Property By Type ==================//
interface PropertyByTypeResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    ok: boolean;
    data: Property[];
    pagination: Pagination;
}

interface TypeFilterProps {
    onOpenFilter: () => void
    onReset: () => void
    hasActiveFilters: boolean
    provinces: string[]
    cities: string[]
    statuses: string[]
}

interface UseStateTypeProps {
    type: string
}

//================== Property By Province ==================//
interface PropertiesByProvinceResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    ok: boolean;
    data: Property[];
    pagination: Pagination;
}

//================== Property By Details ==================//
interface PropertyAuthor {
    name: string;
    photoURL: string;
    uid: string;
    role: string;
    phone?: string;
}

interface PropertyDetail {
    id: string;
    title: string;
    slug: string;
    facilities: PropertyFacility[];
    images: string[];
    province: string;
    city: string;
    statusProject: string;
    type: string;
    description: string;
    author: PropertyAuthor;
    content: string;
    createdAt: string;
    related: Property[];
}

interface PropertyDetailResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    ok: boolean;
    data: PropertyDetail;
}

type ImageSliderProps = {
    images: string[]
    height?: number
    onBack?: () => void
    autoplay?: boolean
    interval?: number
    onImagePress?: (index: number) => void
}

type MediaPlayetProps = {
    html: string
}

interface ModalImagesProps {
    visible: boolean
    images: string[]
    currentIndex: number
    onClose: () => void
    onImageChange: (index: number) => void
}

interface PropertyDetail {
    title?: string
    city?: string
    province?: string
    type?: string
    content?: string
    images?: string[]
}

interface ShareModalProps {
    visible: boolean
    onClose: () => void
    data: PropertyDetail | null
}

interface PropertyDetail {
    title?: string
    city?: string
    province?: string
    type?: string
    content?: string
    images?: string[]
}

interface SocialMediaProps {
    data: PropertyDetail | null
}

type LoadingOverlayProps = {
    title?: string
}

//================== Property By Search ==================//
type UseStateSearchParams = {
    initialQuery?: string
    fetchProperties: (page: number) => Promise<{ data: Property[] }>
}

//================== Property All Properties ==================//
interface AllPropertiesCardProps {
    item: Property
    index?: number
}

type FilterModalProps = {
    visible: boolean
    onClose: () => void
    types: string[]
    statuses: string[]
    provinces: string[]
    cities: string[]
    selectedType: string | null
    selectedStatus: string | null
    selectedProvince: string | null
    selectedCity: string | null
    onSelectType: (t: string | null) => void
    onSelectStatus: (s: string | null) => void
    onSelectProvince: (p: string | null) => void
    onSelectCity: (c: string | null) => void
    onReset: () => void
    onApply?: () => void
}

type AllPropertiesFilterProps = {
    onOpenFilter?: () => void
    onReset?: () => void
    hasActiveFilters?: boolean
    types?: string[]
    statuses?: string[]
    provinces?: string[]
    cities?: string[]
}