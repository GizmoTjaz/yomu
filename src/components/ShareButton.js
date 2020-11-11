// Modules
import React from "react";
import { Share } from "react-native";

// Components
import RoundIconButton from "./RoundIconButton";

// Variables
import { COLORS } from "../utils/constants";

export default function ShareButton ({ content, buttonStyle }) {
    return (
        <RoundIconButton
            icon = { "ios-share" }
            buttonStyle = {{ ...(buttonStyle || {}), backgroundColor: "transparent" }}
            onPress = { () => {
                Share.share({
                    message: content
                }, {
                    tintColor: COLORS.primary,
                    dialogTitle: "Share Manga"
                });
            }}
        />
    );
}