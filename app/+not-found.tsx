// import Notfound from '@/assets/images/notfound.json';
import { Stack, useRouter } from 'expo-router';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';

export default function NotFoundScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleBackToHome = () => {
        router.replace('/');
    }

    const handleContactUs = () => {
        Linking.openURL('http://wa.me/+6283150102523?text=Halo, saya membutuhkan bantuan');
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View className={`flex-1 items-center justify-center ${isDark ? 'bg-background' : 'bg-gray-50'}`}>
                <View className="flex-row gap-2 items-center mb-4">
                    <Text className={`text-[64px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>4</Text>
                    {/* <LottieView source={Notfound} autoPlay loop style={{ width: 50, height: 50 }} resizeMode='contain' /> */}
                    <Text className={`text-[64px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>4</Text>
                </View>

                <Text className={`text-[20px] font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1 text-center`}>Oops! We can&#39;t find that page.</Text>

                <Text className={`text-[14px] ${isDark ? 'text-gray-300' : 'text-gray-500'} mb-8 text-center`}>The page you&#39;re looking for doesn&#39;t seem to exist.</Text>

                <TouchableOpacity className="bg-accent-primary py-3 px-8 rounded-lg mb-6" onPress={handleBackToHome}>
                    <Text className="text-white text-[16px] font-semibold">Back to home</Text>
                </TouchableOpacity>

                <Text className={`text-[14px] ${isDark ? 'text-gray-300' : 'text-gray-500'} text-center`} onPress={handleContactUs}>
                    Need help? <Text className="text-accent-primary font-bold underline">Contact Us</Text>
                </Text>
            </View>
        </>
    );
}