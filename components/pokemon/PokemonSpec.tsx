import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Image, StyleSheet, View, type ImageSourcePropType, type ViewProps } from "react-native";

type Props = ViewProps & {
    title?: string,
    description?: string,
    image?: ImageSourcePropType
}

export function PokemonSpec({
    style,
    image,
    title,
    description,
    ...rest
}: Props) {
    return <View style={[style, styles.root]} {...rest}>
        <Row style={styles.row}>
            {image && <Image source={image} style={{ width: 16, height: 16 }} />}
            <ThemedText>{title}</ThemedText>
        </Row>
        <ThemedText variant={"caption"} color={"grayMedium"}>{description}</ThemedText>
    </View>
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
    },
    row: {
        height: 36,
        alignItems: "center"
    }
})