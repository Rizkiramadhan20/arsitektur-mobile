export const fetchBlogs = async (page: number): Promise<BlogsResponse> => {
    try {
        const envUrl = `${process.env.EXPO_PUBLIC_API}/blog?page=${page}`;
        const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;

        if (!envUrl) {
            throw new Error("EXPO_PUBLIC_API/blog?page=${page} not configured");
        }

        if (!apiSecret) {
            throw new Error("EXPO_PUBLIC_API_SECRET not configured");
        }

        const response = await fetch(envUrl, {
            headers: {
                Authorization: `Bearer ${apiSecret}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json: BlogsResponse = await response.json();

        if (!json.ok || !json.data || json.data.length === 0) {
            throw new Error("No blogs data available?page=${page}");
        }

        return json;
    } catch (error) {
        throw new Error(
            `Failed to fetch blogs data?page=${page}: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
};