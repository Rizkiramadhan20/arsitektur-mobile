interface BlogsAuthor {
    name: string;
    role: string;
    photoURL: string;
}

interface BlogsItem {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    thumbnail: string;
    author: BlogsAuthor;
    status: string;
    createdAt: string;
}

interface BlogsPagination {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
    totalItems: number;
}

interface BlogsResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    ok: boolean;
    data: BlogsItem[];
    pagination: BlogsPagination;
}

interface BlogCardProps {
    blog: BlogsItem;
    onBookmark?: (blogId: string) => void;
    onMoreOptions?: (blogId: string) => void;
}

interface BlogTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    blogs: BlogsItem[];
}