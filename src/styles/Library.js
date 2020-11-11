// Modules
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../utils/constants";

export default StyleSheet.create({
    mangaListContainer: {
        marginLeft: 24,
        marginRight: 24,
        marginTop: 12
    },
    mangaContainer: {
        width: 97,
        height: 147,
        marginLeft: 9,
        marginTop: 9
    },
    mangaArtwork: {
        width: "100%",
        height: "100%",
        borderRadius: 2,
        backgroundColor: COLORS.overlayBackground
    }
});