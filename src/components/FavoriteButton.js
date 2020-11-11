// Modules
import React from "react";
import * as Haptics from "expo-haptics";

// Components
import RoundIconButton from "./RoundIconButton";

// Contexts
import FavoriteManga from "../stores/FavoriteManga";

export default function FavoriteButton ({ manga }) {
    
    const
        { favorites, addFavorite, removeFavorite } = FavoriteManga(),
        isFavorite = favorites.hasOwnProperty(manga.id),
        [ _, forceRender ] = React.useState({});

    return (
        <RoundIconButton
            icon = { isFavorite ? "ios-heart" : "ios-heart-empty" }
            onPress = { () => {

                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                isFavorite
                ? removeFavorite(manga)
                : addFavorite(manga)

                forceRender({});

            } }
        />
    );
}