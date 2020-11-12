// Modules
import React from "react";
import { Dimensions } from "react-native";
import { connect } from "react-redux";

// Components
import { FlatList, SafeAreaView, Text, TouchableOpacity, Image, View } from "react-native";

// Styles
import coreStyles from "../styles/Core";
import styles from "../styles/Library";

function Library ({ onMangaPress, favoriteManga }) {
  return (
      <SafeAreaView>
        <Text style = { coreStyles.titleText }>Library</Text>
        <View style = { styles.mangaListContainer }>
          <FlatList
              data = { Object.values(favoriteManga) }
              keyExtractor = { manga => manga.id }
              numColumns = { Math.floor((Dimensions.get("window").width - (24 * 2)) / (97 + 9)) }
              renderItem = { ({ item: manga }) => (
                <TouchableOpacity
                  style = { styles.mangaContainer }
                  onPress = { () => onMangaPress(manga.id) }
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

export default connect(({ favoriteManga }) => ({ favoriteManga }))(Library);