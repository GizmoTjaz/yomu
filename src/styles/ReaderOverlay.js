// Modules
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../utils/constants";

export default StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 40,
        zIndex: 3
    },
    subContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between"
    },
    floatingContainer: {
        
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    hoverButton: {
        backgroundColor: COLORS.overlayBackground,
        width: 40,
        height: 40,
        marginLeft: 6,
        marginRight: 6
    },
    hoverBox: {
        backgroundColor: COLORS.overlayBackground,
        borderRadius: 25
    },
    titleContainer: {
        flexDirection: "column",
        flex: 1 
    },
    volumeChapterLabel: {
        color: COLORS.text,
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 16,
        textAlign: "center",
        marginTop: 6
    },
    titleLabel: {
        color: COLORS.text,
        fontFamily: "SF-Compact-Text-Light",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 5
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    pageCounterContainer: {
        paddingTop: 6,
        paddingRight: 12,
        paddingBottom: 6,
        paddingLeft: 12
    },
    pageCounterLabel: {
        color: COLORS.text,
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 16,
    }
});

/*
hoverButton: {
        backgroundColor: COLORS.overlayBackground,
        width: 40,
        height: 40,
        marginLeft: 6,
        marginRight: 6
    },
    floatingContainer: {
    
    },
    hoverBox: {
        backgroundColor: COLORS.overlayBackground,
        borderRadius: 25
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        zIndex: 2
    },
    titleContainer: {
        flexDirection: "column",
        flex: 1 
    },
    volumeChapterLabel: {
        color: COLORS.text,
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 16,
        textAlign: "center",
        marginTop: 6
    },
    titleLabel: {
        color: COLORS.text,
        fontFamily: "SF-Compact-Text-Light",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 5
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2
    },
    pageCounterContainer: {
        paddingTop: 6,
        paddingRight: 12,
        paddingBottom: 6,
        paddingLeft: 12
    },
    pageCounterLabel: {
        color: COLORS.text,
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 16,
    }
*/