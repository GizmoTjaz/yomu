// Modules
import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { setStatusBarHidden } from "expo-status-bar";
import { connect } from "react-redux";

// Components
import { Modal, SafeAreaView, View, Text, ActivityIndicator, Animated } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import RoundIconButton from "./RoundIconButton";
import ReaderPageCarousel from "./ReaderPageCarousel";
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
        [ overlayVisibility, setOverlayVisibility ] = useState(1),
        [ pageIndex, setPageIndex ] = useState(0),
        [ settingsVisibility, setSettingsVisibility ] = useState(false);

    const
        opacityValue = useRef(new Animated.Value(1)).current,
        opacityState = useRef(true);

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

    function tapGestureEvent (event) {
        if (event.nativeEvent.state === State.END && event.nativeEvent.y > 90) {

            opacityState.current = !opacityState.current;
            setStatusBarHidden(!opacityState.current, "fade");

            Animated.timing(opacityValue, {
                toValue: opacityState.current ? 1 : 0,
                duration: 230,
                useNativeDriver: true
            }).start();

        }
    }

    // console.log(readerSettings.readingDirection);

    return (
        <Modal
            animationType = "slide"
            visible = { !!manga }
            presentationStyle = { "fullScreen" }
        >
            <TapGestureHandler
                numberOfTaps = { 1 }
                onHandlerStateChange = { tapGestureEvent }
            >
                <View style = {{ ...styles.container, ...(chapter ? {} : styles.loadingContainer) }}>
                    {
                        chapter ? (
                            <SafeAreaView style = { styles.safeAreaContainer }>
                                <Animated.View
                                    style = {{
                                        ...styles.floatingContainer,
                                        ...styles.topContainer,
                                        opacity: opacityValue
                                    }}
                                >
                                    <RoundIconButton
                                        icon = "ios-cog"
                                        buttonStyle = { styles.hoverButton }
                                        onPress = { () => setSettingsVisibility(true) }
                                    />
                                    <View style = {{ ...styles.hoverBox, ...styles.titleContainer }}>
                                        <Text style = { styles.volumeChapterLabel }>
                                            { `${
                                                chapter.volume
                                                ? `Volume ${ chapter.volume }, `
                                                : ""
                                            }Chapter ${ chapter.chapter }` }
                                        </Text>
                                        <Text style = { styles.titleLabel }>{ chapter.title }</Text>
                                    </View>
                                    <RoundIconButton
                                        icon = "ios-close"
                                        size = { 30 }
                                        buttonStyle = { styles.hoverButton }
                                        onPress = { () => onClose() }
                                    />
                                </Animated.View>
                                <View style = {{ ...styles.floatingContainer, ...styles.pageContainer }}>
                                    <ReaderPageCarousel
                                        style = { styles.pageImage }
                                        pages = { chapter.pages }
                                        onPageChange = { index => setPageIndex(index) }
                                        readingDirection = { readerSettings.readingDirection }
                                    />
                                </View>
                                <Animated.View
                                    style = {{
                                        ...styles.floatingContainer,
                                        ...styles.bottomContainer,
                                        opacity: opacityValue
                                    }}
                                >
                                    <View style = {{ ...styles.hoverBox, ...styles.pageCounterContainer }}>
                                        <Text style = { styles.pageCounterLabel }>
                                            { `${Math.max(1, pageIndex + 1)} / ${ chapter.pages.length }` }
                                        </Text>
                                    </View>
                                </Animated.View>
                                <ReaderSettings
                                    visible = { settingsVisibility }
                                    readerSettingChange = { changeReaderSetting }
                                    readerSettings = { readerSettings }
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
            </TapGestureHandler>
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