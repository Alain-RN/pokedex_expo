import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { RootView } from "@/components/rootView";
import Row from "@/components/Row";
import SearchBar from "@/components/searchBar";
import { SortButton } from "@/components/sortButton";
import ThemedText from "@/components/ThemedText";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getPokemonId } from "@/utils/pokemon";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";


export default function Index() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery("/pokemon?limit=21");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id")
  const pokemons = data?.pages.flatMap(page=> page.results).map(p => ({name: p.name, id: getPokemonId(p.url)})) ?? [];
  const filteredPokemons = [...(search ? 
    pokemons.filter( p => p.name.includes(search.toLowerCase()) || p.id.toString() === search) 
    : 
    pokemons)
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1))

  return (
    <RootView >
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
        <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
      </Row>
      <Row style={styles.form}>
        <SearchBar value={search} onChange={setSearch}></SearchBar>
        <SortButton value={sortKey} onChange={setSortKey}></SortButton>
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
          renderItem= {
            ({item}) => <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}}/>
          }
          keyExtractor={
            (item)=> item.id.toString()
          }/>
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
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
  },
  form: {
    paddingRight: 12
  }
})