import Card from "@/components/Card";
import { PokemonType } from "@/components/pokemonType";
import { RootView } from "@/components/rootView";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getPokemonArtWork } from "@/utils/pokemon";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";


export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as { id: string };
    const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
    const mainType = pokemon?.types?.[0].type.name
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    const types = pokemon?.types?? [];
    return <RootView style={{ backgroundColor: colorType }}>
        <View style={{flex: 1}}>
            <Image style={[styles.pokeball, { height: 208, width: 208 }]} source={require("@/assets/images/pokeball_big.png")} />
            <Row style={styles.header}>
                <Row gap={8}>
                    <Pressable onPress={router.back} android_ripple={{ color: "#ffffff6b", foreground: true }}>
                        <Image style={{ height: 42, width: 42 }} source={require("@/assets/images/left.png")} />
                    </Pressable>
                    <ThemedText variant={"headline"} color={"grayWhite"} style={{textTransform: "capitalize"}}>{pokemon?.name}</ThemedText>
                </Row>
                <ThemedText variant={"subtitle2"} color={"grayWhite"}>#{params.id.toString().padStart(3, '0')}</ThemedText>
            </Row>
            <View style={styles.body}>
                <Image
                    style={[styles.artWork, { width: 200, height: 200 }]}
                    source={{ uri: getPokemonArtWork(params.id) }}
                />
                <Card style={styles.card}>
                    <Row gap={18}>
                        {
                            types.map( 
                                type => <PokemonType key={type.type.name} name={type.type.name}></PokemonType>
                            )
                        }
                    </Row>
                    <ThemedText variant={"subtitle1"} style={{color: colorType}}>
                        About
                    </ThemedText>
                    <ThemedText variant={"subtitle1"} style={{color: colorType}}>
                        About
                    </ThemedText>
                </Card>
            </View>
        </View>
    </RootView>
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingRight: 20,
        justifyContent: "space-between"
    },
    pokeball: {
        position: "absolute",
        right: 8,
        top: 8
    },
    artWork: {
        position: "absolute",
        alignSelf: "center",
        top: -140,
        zIndex: 2
    },
    body: {
        marginTop: 144,
        flex: 1,
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        flex: 1,
        gap: 16, 
        alignItems: "center"
    }
})