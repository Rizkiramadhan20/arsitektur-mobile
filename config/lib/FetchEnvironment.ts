export const fetchEnvironment = async (): Promise<EnvironmentResponse> => {
    try {
        const envUrl = process.env.EXPO_PUBLIC_COLLECTIONS_ENVIRONMENT;
        const apiSecret = process.env.EXPO_PUBLIC_API_SECRET_ENV;

        if (!envUrl) {
            throw new Error("EXPO_PUBLIC_COLLECTIONS_ENVIRONMENT not configured");
        }

        if (!apiSecret) {
            throw new Error("EXPO_PUBLIC_API_SECRET_ENV not configured");
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

        const json: EnvironmentResponse = await response.json();

        if (!json.ok || !json.data || json.data.length === 0) {
            throw new Error("No environment data available");
        }

        return json;
    } catch (error) {
        throw new Error(
            `Failed to fetch environment data: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
};