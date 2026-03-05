import ThemedText from "@/components/ThemedText"
import { Colors } from "@/constants/Colors"
import { View, type ViewStyle } from "react-native"

type Props = {
    name: keyof typeof Colors["type"]
}

export function PokemonType({name}: Props) {
    return <View style={[rootstyle, {backgroundColor: Colors["type"][name]}]}>
        <ThemedText color="grayWhite" variant={"subtitle3"} style={{textTransform: "capitalize"}}>
            {name}
        </ThemedText>
    </View>
}

const rootstyle = {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    height: 20,
    flex: 0,
    borderRadius: 8
} satisfies ViewStyle