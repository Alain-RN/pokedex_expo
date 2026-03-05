import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View, type ViewProps } from "react-native";

type Props = ViewProps & {
    name: string,
    value: number,
    color: string
}

function statShortName(name: string): string {
    return name
            .replaceAll("special", "S")
            .replaceAll("-", ".")
            .replaceAll("attack", "ATK")
            .replaceAll("defense", "DEf")
            .replaceAll("speed", "SPD")
            .toUpperCase()
}

export function PokemonStat({ style, name, value, color, ...rest }: Props) {
    const colors = useThemeColors();
    const percentage = (value / 255) * 100;

    return (
        <Row gap={8} style={[styles.root, style]} {...rest}>
            <View style={[styles.name, { borderColor: colors.grayLight }]}>
                <ThemedText variant="subtitle3" style={{ color: color }}>
                    {statShortName(name)}
                </ThemedText>
            </View>

            <View style={styles.number}>
                <ThemedText>
                    {value.toString().padStart(3, "0")}
                </ThemedText>
            </View>

            <View style={styles.bar}>
                <View
                    style={[
                        styles.barInner,
                        { backgroundColor: color, width: `${percentage}%` }
                    ]}
                />
            </View>
        </Row>
    );
}

const styles = StyleSheet.create({
    root: {},

    name: {
        width: 48,
        paddingRight: 8,
        borderRightWidth: 1,
    },

    number: {
        width: 23
    },

    bar: {
        flex: 1,
        height: 4,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#eee"
    },

    barInner: {
        height: "100%"
    }
});