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