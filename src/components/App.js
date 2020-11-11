// Modules
import React, { useState } from "react";
import { registerRootComponent, AppLoading } from "expo";
import { useFonts } from "@use-expo/font";

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
        [ previewWindowManga, setPreviewWindowManga ] = useState(0),
        [ readerData, setReaderData ] = useState({ manga: null, chapterIndex: 0 });

    const [ areFontsLoaded ] = useFonts({
        "SF-Pro-Display-Bold": require("../../assets/fonts/SF-Pro-Display-Bold.otf"),
        "SF-Pro-Text-Bold": require("../../assets/fonts/SF-Pro-Text-Bold.otf"),
        "SF-Pro-Text-Semibold": require("../../assets/fonts/SF-Pro-Text-Semibold.otf"),
        "SF-Compact-Text-Light": require("../../assets/fonts/SF-Compact-Text-Light.otf"),
        "SF-Compact-Text-Bold": require("../../assets/fonts/SF-Compact-Text-Bold.otf")
    });

    /*React.useEffect(() => {

        getManga(22151).then(manga => {
            setReaderData({ manga, chapterIndex: 45 });
        });

    }, []);*/

    if (areFontsLoaded) {
        return (
            <Fragment>
                <StatusBar style = "light" />
                <SafeAreaView style = {{ flex: 0, ...styles.background }} />
                <SafeAreaView style = {{ flex: 1, ...styles.background }}>
                    <Library setPreviewWindowManga = { setPreviewWindowManga } />
                    <MangaPreview
                        visible = { !!previewWindowManga }
                        mangaId = { previewWindowManga }
                        setReaderData = { (manga, chapterIndex) => {
                            setPreviewWindowManga(0);
                            setReaderData({ manga, chapterIndex });
                        } }
                        onDismiss = { () => setPreviewWindowManga(0) }
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
        );
    }
});