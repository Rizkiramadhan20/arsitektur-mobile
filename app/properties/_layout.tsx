import { Stack } from 'expo-router';

export default function PropertiesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="search" />
            <Stack.Screen name="province/[province]" />
        </Stack>
    );
}
