// Modules
import React, { useEffect, useState } from "react";
import { registerRootComponent, AppLoading } from "expo";
import { useFonts } from "expo-font";

// Components
import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Library from "./Library";
import MangaPreview from "./MangaPreview";
import Reader from "./Reader";

// Styles
import styles from "../styles/App";
import { getManga } from "../utils/api";

registerRootComponent(function App () {

    const
        [ previewWindowMangaID, setPreviewWindowMangaID ] = useState(0),
        [ readerData, setReaderData ] = useState({});

    const [ areFontsLoaded ] = useFonts({
        "SF-Pro-Display-Bold": require("../../assets/fonts/SF-Pro-Display-Bold.otf"),
        "SF-Pro-Text-Bold": require("../../assets/fonts/SF-Pro-Text-Bold.otf"),
        "SF-Pro-Text-Semibold": require("../../assets/fonts/SF-Pro-Text-Semibold.otf"),
        "SF-Compact-Text-Light": require("../../assets/fonts/SF-Compact-Text-Light.otf"),
        "SF-Compact-Text-Bold": require("../../assets/fonts/SF-Compact-Text-Bold.otf")
    });

    if (areFontsLoaded) {
        return (
            <Fragment>
                <StatusBar style = "light" />
                <SafeAreaView style = {{ flex: 0, ...styles.background }} />
                <SafeAreaView style = {{ flex: 1, ...styles.background }}>
                    <Library onMangaPress = { setPreviewWindowMangaID }/>
                    <MangaPreview
                        visible = { !!previewWindowMangaID }
                        mangaId = { previewWindowMangaID }
                        setReaderData = { (manga, chapterIndex) => {
                            setPreviewWindowMangaID(0);
                            setReaderData({ manga, chapterIndex });
                        } }
                        onDismiss = { () => setPreviewWindowMangaID(0) }
                    />
                    <Reader
                        data = { readerData }
                        onClose = { () => setReaderData({}) }
                    />
                </SafeAreaView>
            </Fragment>
        );
    } else {
        return (
            <AppLoading />
        )
    }
});