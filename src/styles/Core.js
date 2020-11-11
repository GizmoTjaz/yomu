// Modules
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../utils/constants";

export default StyleSheet.create({
    titleText: {
        fontFamily: "SF-Pro-Display-Bold",
        color: COLORS.text,
        fontSize: 34,
        marginLeft: 14
    },
    headerText: {
        fontFamily: "SF-Pro-Text-Bold",
        color: COLORS.text,
        fontSize: 26
    },
    subHeaderText: {
        fontFamily: "SF-Compact-Text-Light",
        color: COLORS.text,
        fontSize: 23
    }
});