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
        flex: 1
    }
});