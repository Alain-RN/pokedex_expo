import Card from "@/components/Card";
import { Radio } from "@/components/radio";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Shadows } from "@/constants/shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Text } from "@react-navigation/elements";
import { useRef, useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";

type Props = {
    value: "id" | "name",
    onChange: (v: "id" | "name") => void
}

const options = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" }
] as const

export function SortButton({ value, onChange }: Props) {
    const buttonRef = useRef<View>(null)
    const colors = useThemeColors();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [position, setPosition] = useState<null | { top: number, right: number }>(null)

    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height + 12,
                right: Dimensions.get("window").width - x - width
            })
            setIsModalVisible(true)
        })
    }

    const onClose = () => {
        setIsModalVisible(false)
    }
    return <>
        <Pressable onPress={onButtonPress}>
            <View
                ref={buttonRef}
                style={[styles.button, { backgroundColor: colors.grayLight }]}>
                <Text style={styles.text}>{value === "name" ? "A" : "#"}</Text>
            </View>
        </Pressable>
        <Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType="fade">
            <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
            <View style={[styles.popup, { backgroundColor: colors.tint, ...position}]}>
                <ThemedText variant="subtitle2" color="grayWhite" style={styles.title}>
                    Sort by :
                </ThemedText>
                <Card style={styles.card}>
                    {
                        options.map(
                            o => <Pressable key={o.value} onPress={() => onChange(o.value)}>
                                <Row gap={8}>
                                    <Radio checked={o.value === value} />
                                    <ThemedText>{o.label}</ThemedText>
                                </Row>
                            </Pressable>
                        )
                    }
                </Card>
            </View>
        </Modal>
    </>
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: 36,
        flex: 0,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold"
    },
    backdrop: {
        backgroundColor: "#ffffff30",
        flex: 1
    },
    popup: {
        position: "absolute",
        width: 124,
        padding: 4,
        borderRadius: 12,
        ...Shadows.dp2
    },
    title: {
        paddingLeft: 20,
        paddingVertical: 16,
    },
    card: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 16
    }
})