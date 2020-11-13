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
        [ pageIndex, setPageIndex ] = useState(0),
        [ settingsVisibility, setSettingsVisibility ] = useState(false);

    const
        overlayOpacityValue = useRef(new Animated.Value(1)).current,
        overlayOpacityState = useRef(true).current;

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

            overlayOpacityState = !overlayOpacityState;
            setStatusBarHidden(!overlayOpacityState, "fade");

            Animated.timing(overlayOpacityValue, {
                toValue: overlayOpacityState ? 1 : 0,
                duration: 230,
                useNativeDriver: true
            }).start();
        }
    }

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
                                        opacity: overlayOpacityValue
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
                                <View style = {[ styles.floatingContainer, styles.pageCarouselContainer ]}>
                                    <View style = {[ styles.pageCarouselContainer ]}>
                                        <ReaderPageCarousel
                                            pages = { chapter.pages }
                                            onPageChange = { index => setPageIndex(index) }
                                            readingDirection = { readerSettings.readingDirection }
                                        />
                                    </View>
                                </View>
                                <Animated.View
                                    style = {{
                                        ...styles.floatingContainer,
                                        ...styles.bottomContainer,
                                        opacity: overlayOpacityValue
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