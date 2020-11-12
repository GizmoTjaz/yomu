// Modules
import { StyleSheet, Dimensions } from "react-native";

// Variables
const pageWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    pageContainer: {
        width: pageWidth,
        flex: 1
    },
    pageImage: {
        flex: 1,
        zIndex: 1
    },
    pageBuffer: {
        position: "absolute",
        zIndex: 0,
        width: "100%",
        height: "100%"
    }
});