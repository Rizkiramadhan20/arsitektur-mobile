import { Stack } from 'expo-router';

export default function BlogLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="all-blogs" />
        </Stack>
    );
}
