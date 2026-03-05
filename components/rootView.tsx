import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps

export function RootView({ style, ...rest }: Props) {
    const colors = useThemeColors();
    return <SafeAreaView 
        edges={["top"]} 
        style={[styles.container, { backgroundColor: colors.tint }, style]}
        {...rest}/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4
    }
});