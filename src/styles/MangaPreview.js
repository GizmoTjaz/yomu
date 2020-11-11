// Modules
import { StyleSheet, Dimensions } from "react-native";

// Variables
import { COLORS } from "../utils/constants";
const mangaDetailsContainerWidth = Dimensions.get("window").width - (19 * 2);
const mangaChapterListWidth = Dimensions.get("window").width - (8 * 2);

export default StyleSheet.create({
    previewContainer: {
        height: "88%",
        top: "12%",
        backgroundColor: COLORS.overlayBackground,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 25
    },
    detailsContainer: {
        width: mangaDetailsContainerWidth,
        maxWidth: mangaDetailsContainerWidth,
        height: 188,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    mangaArtwork: {
        width: 124,
        height: 188,
        backgroundColor: COLORS.overlayBoxBackground,
        borderRadius: 3
    },
    emptyMangaArtwork: {
        width: 124,
        height: 188,
        backgroundColor: COLORS.overlayBoxBackground,
        borderRadius: 3
    },
    infoContainer: {
        flex: 1,
        height: 188,
        marginLeft: 10
    },
    mangaTitle: {
        flex: 1.5,
        flexWrap: "wrap"
    },
    emptyMangaTitle: {
        backgroundColor: COLORS.overlayBoxBackground,
        borderRadius: 10,
        height: 50
    },
    detailedInfoContainer: {
        flex: 1.5,
        flexWrap: "wrap",
        flexDirection: "row",
    },
    detailedInfoLabel: {
        flexGrow: 2,
        marginBottom: 5
    },
    detailedInfoName: {
        fontSize: 15,
    },
    detailedInfoValue: {
        fontSize: 14,
        flexWrap: "wrap"
    },
    detailedInfoButtonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
    readButton: {
        width: 75,
        height: 33
    },
    shareButton: {
        position: "absolute",
        right: 0
    },
    chapterList: {
        width: mangaChapterListWidth,
        marginTop: 15,
    },
    chapterListItem: {
        backgroundColor: COLORS.overlayBoxBackground,
        height: 34,
        borderRadius: 12,
        marginBottom: 3,
        flexDirection: "row",
        alignItems: "center"
    },
    chapterListItemNumber: {
        color: COLORS.text,
        fontFamily: "SF-Pro-Text-Semibold",
        fontSize: 17,
        marginLeft: 10,
    },
    chapterListItemTextSeparator: {
        color: COLORS.text,
        fontFamily: "SF-Pro-Text-Semibold",
        marginLeft: 5,
        marginRight: 5
    },
    chapterListItemName: {
        color: COLORS.text,
        flex: 1,
        marginRight: 4
    },
    chapterListVolumeHeader: {
        fontFamily: "SF-Compact-Text-Bold",
        fontSize: 18,
        color: COLORS.text,
        marginTop: 4,
        marginBottom: 3,
        marginLeft: 2
    }
});