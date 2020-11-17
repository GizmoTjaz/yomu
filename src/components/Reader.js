// Modules
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

// Components
import { Modal, SafeAreaView, View, ActivityIndicator } from "react-native";
import ReaderPageCarousel from "./ReaderPageCarousel";
import ReaderOverlay from "./ReaderOverlay";
import ReaderSettings from "./ReaderSettings";

// Styles
import styles from "../styles/Reader";

// Utils
import { getChapter } from "../utils/api";

// Variables
import { COLORS } from "../utils/constants";

function Reader ({ data: { manga, chapterIndex }, onClose, changeReaderSetting, readerSettings }) {

    const
        [ chapter, setChapter ] = useState(null),
        [ pageIndex, setPageIndex ] = useState(0),
        [ settingsVisibility, setSettingsVisibility ] = useState(false);

    useEffect(() => {
        if (manga && manga.chapters) {

            setChapter(null);

            getChapter(manga.chapters[chapterIndex].id).then(chapter => {
                setChapter(chapter);
                setPageIndex(0);
            }).catch(() => {
                Alert.alert("Error", "Couldn't fetch chapter pages.", [
                    {
                        text: "OK",
                        onPress: onClose
                    }
                ]);
            });
        }
    }, [ manga, chapterIndex ]);

    return (
        <Modal
            animationType = "slide"
            visible = { !!manga }
            presentationStyle = { "fullScreen" }
        >
            <View style = {[ styles.container, chapter ? {} : styles.loadingContainer ]}>
                {
                    chapter ? (
                        <SafeAreaView style = { styles.safeAreaContainer }>
                            <ReaderOverlay
                                chapter = { chapter }
                                pageIndex = { pageIndex }
                                setSettingsVisibility = { setSettingsVisibility }
                                closeOverlay = { onClose }
                            />
                            <ReaderPageCarousel
                                pages = { chapter.pages }
                                onPageChange = { index => setPageIndex(index) }
                                readingDirection = { readerSettings.readingDirection }
                            />
                            <ReaderSettings
                                visible = { settingsVisibility }
                                readerSettings = { readerSettings }
                                readerSettingChange = { changeReaderSetting }
                                onClose = { () => setSettingsVisibility(false) }
                            />
                        </SafeAreaView>
                    ) : (
                        <ActivityIndicator
                            size = "large"
                            color = { COLORS.text }
                        />
                    )
                }
            </View>
        </Modal>
    );
};

function stateMap ({ readerSettings}) {
    return { readerSettings };
}

function dispatchMap (dispatch) {
    return {
        changeReaderSetting: (payloadType, payload) => dispatch({ type: payloadType, payload })
    };
}

export default connect(stateMap, dispatchMap)(Reader);