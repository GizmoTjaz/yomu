// Modules
import { StyleSheet, Dimensions } from "react-native";

// Variables
import { COLORS } from "../utils/constants";

export default StyleSheet.create({
    blurContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: COLORS.overlayBackground,
        width: 300,
        borderRadius: 25,
        padding: 20
    },
    settingContainer: {
        flexDirection: "column",
        alignContent: "center"
    },
    settingTitleText: {
        textAlign: "center",
        paddingBottom: 8
    }
});