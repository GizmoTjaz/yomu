// Modules
import React from "react";

// Components
import { View, Image } from "react-native";

// Styles
import styles from "../styles/ReaderPage";

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
        </View>
    );
}