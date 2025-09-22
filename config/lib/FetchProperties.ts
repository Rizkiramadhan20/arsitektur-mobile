export const fetchProperties = async (page: number): Promise<PropertiesResponse> => {
    try {
        const envUrl = `${process.env.EXPO_PUBLIC_API}/properties?page=${page}`;
        const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;

        if (!envUrl) {
            throw new Error("EXPO_PUBLIC_API/properties?page=${page} not configured");
        }

        if (!apiSecret) {
            throw new Error("EXPO_PUBLIC_API_SECRET not configured?page=${page}");
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
            throw new Error("No properties data available?page=${page}");
        }

        return json;
    } catch (error) {
        throw new Error(
            `Failed to fetch properties data?page=${page}: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
};

export const fetchPropertiesByProvince = async (type: string, province: string, page: number): Promise<PropertiesByProvinceResponse> => {
    try {
        const envUrl = `${process.env.EXPO_PUBLIC_API}/properties/${type}/${province}?page=${page}`;
        const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;

        if (!envUrl) {
            throw new Error("EXPO_PUBLIC_API not configured");
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

        const json: PropertiesByProvinceResponse = await response.json();

        if (!json.ok || !json.data || json.data.length === 0) {
            throw new Error("No properties data available for this province");
        }

        return json;
    } catch (error) {
        throw new Error(
            `Failed to fetch properties data by province: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
};