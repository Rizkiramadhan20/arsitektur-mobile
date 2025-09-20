interface PropertyFacility {
    imageUrl: string;
    title: string;
}

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