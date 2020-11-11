// Modules
import React from "react";
import { Dimensions } from "react-native";

// Components
import { FlatList, SafeAreaView, Text, TouchableOpacity, Image, View } from "react-native";

// Styles
import coreStyles from "../styles/Core";
import styles from "../styles/Library";

// Contexts
import FavoriteManga from "../stores/FavoriteManga";

export default function Library ({ setPreviewWindowManga }) {

  const favorites = FavoriteManga(state => state.favorites);

  return (
      <SafeAreaView>
        <Text style = { coreStyles.titleText }>Library</Text>
        <View style = { styles.mangaListContainer }>
          <FlatList
              data = { Object.values(favorites) }
              keyExtractor = { manga => manga.id }
              numColumns = { Math.floor((Dimensions.get("window").width - (24 * 2)) / (97 + 9)) }
              renderItem = { ({ item: manga }) => (
                <TouchableOpacity
                  style = { styles.mangaContainer }
                  onPress = { () => setPreviewWindowManga(manga.id) }
                >
                  <Image
                    style = { styles.mangaArtwork }
                    source = {{ uri: manga.artwork }}
                    resizeMode = "cover"
                  />
                </TouchableOpacity>
              ) }
            />
        </View>
      </SafeAreaView>
  );  
};