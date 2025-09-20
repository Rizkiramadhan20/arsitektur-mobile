export const fetchProperties = async (): Promise<PropertiesResponse> => {
    try {
        const envUrl = `${process.env.EXPO_PUBLIC_API}/properties`;
        const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;

        if (!envUrl) {
            throw new Error("EXPO_PUBLIC_API/properties not configured");
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

        const json: PropertiesResponse = await response.json();

        if (!json.ok || !json.data || json.data.length === 0) {
            throw new Error("No properties data available");
        }

        return json;
    } catch (error) {
        throw new Error(
            `Failed to fetch properties data: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
};