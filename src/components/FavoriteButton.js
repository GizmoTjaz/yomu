// Modules
import React from "react";
import * as Haptics from "expo-haptics";
import { connect } from "react-redux";

// Components
import RoundIconButton from "./RoundIconButton";

function FavoriteButton ({ manga, favoriteManga, toggleFavorite }) {
    return (
        <RoundIconButton
            icon = { favoriteManga.hasOwnProperty(manga.id) ? "ios-heart" : "ios-heart-empty" }
            onPress = { () => {

                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                toggleFavorite(manga.getHusk());

            } }
        />
    );
}

function stateMap ({ favoriteManga }) {
    return { favoriteManga };
}

function dispatchMap (dispatch) {
    return {
        toggleFavorite: (manga) => dispatch({ type: "TOGGLE_FAVORITE_MANGA", payload: manga })
    };
}

export default connect(stateMap, dispatchMap)(FavoriteButton);