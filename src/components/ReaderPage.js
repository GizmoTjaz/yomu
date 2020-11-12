// Modules
import React from "react";

// Components
import { View, Image, ActivityIndicator } from "react-native";

// Styles
import styles from "../styles/ReaderPage";

// Variables
import { COLORS } from "../utils/constants";

export default function ReaderPage ({ page }) {
    return (
        <View
            style = { styles.pageContainer }
        >
            <Image
                style = { styles.pageImage }
                source = {{ uri: page }}
                resizeMode = "contain"
            />
            <ActivityIndicator
                size = "large"
                color = { COLORS.text }
                style = { styles.pageBuffer }
            />
        </View>
    );
}