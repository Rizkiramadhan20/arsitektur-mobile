declare module 'expo-linear-gradient' {
    import { ComponentType } from 'react';
    import { ViewStyle } from 'react-native';

    interface LinearGradientProps {
        colors: string[];
        start?: { x: number; y: number };
        end?: { x: number; y: number };
        style?: ViewStyle;
        className?: string;
        children?: React.ReactNode;
    }

    export const LinearGradient: ComponentType<LinearGradientProps>;
    export default LinearGradient;
}
