import Row from "@/components/Row"
import { useThemeColors } from "@/hooks/useThemeColors"
import { Image, StyleSheet, TextInput } from "react-native"

type Props = {
    value: string,
    onChange: (s: string) => void
}
export default function SearchBar({value, onChange}: Props) {
    const colors = useThemeColors()
    return <Row style={[styles.wrapper, {backgroundColor: colors.grayWhite}]} gap={8}>
        <Image source={require("@/assets/images/search.png")} style={{ width: 16, height: 16 }}/>
        <TextInput style={styles.input} onChangeText={onChange} value={value}/>
    </Row>
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 18,
        height: 36,
        paddingHorizontal: 12,
        marginHorizontal: 12
    },
    input: {
        flex: 1,
        height: 36,
        fontSize: 11,
        lineHeight: 9
    }
})