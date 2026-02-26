import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import Row from "@/components/Row";
import SearchBar from "@/components/searchBar";
import ThemedText from "@/components/ThemedText";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getPokemonId } from "@/utils/pokemon";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery("/pokemon?limit=21");
  const [search, setSearch] = useState("");
  const pokemons = data?.pages.flatMap(page=> page.results) ?? [];
  const filteredPokemons = search ? pokemons.filter( p => p.name.includes(search.toLowerCase()) || getPokemonId(p.url).toString() === search) : pokemons

  return (
    <SafeAreaView edges={["top"]} style={[styles.container, { backgroundColor: colors.tint }]}>
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
        <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
      </Row>
      <Row>
        <SearchBar value={search} onChange={setSearch}></SearchBar>
      </Row>
      <Card style={styles.body}>
        <FlatList 
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          numColumns={3}
          data={filteredPokemons} 
          onEndReached={search ? undefined : () => fetchNextPage()}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint}/> : null
          }
          renderItem={
            ({item, index}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}}/>
          } 
          keyExtractor={
            (item)=> item.url
          }/>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  header : {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  body: {
    flex: 1,
    marginTop: 24
  },
  gridGap: {
    gap:8
  },
  list: {
    padding: 12
  }
})