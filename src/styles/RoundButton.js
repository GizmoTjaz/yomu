// Modules
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../utils/constants";

export default StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        height: 33,
        marginRight: 5
    },
    textButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        minWidth: 25,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3
    },
    buttonText: {
        color: COLORS.text,
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 19,
        textAlign: "center",
        flex: 1
    },
    iconButton: {
        width: 33,
        padding: 3,
        justifyContent: "center"
    },
    buttonIcon: {
        textAlign: "center"
    }
});