// Modules
import React, { useEffect, useState } from "react";
import { setStatusBarHidden } from "expo-status-bar";

// Components
import { Modal, SafeAreaView, View, Text, ActivityIndicator, Animated, TouchableWithoutFeedback } from "react-native";
import RoundIconButton from "./RoundIconButton";
import ReaderPageCarousel from "./ReaderPageCarousel";

// Styles
import styles from "../styles/Reader";

// Utils
import { getChapter } from "../utils/api";

// Variables
import { COLORS } from "../utils/constants";

export default function Reader ({ data: { manga, chapterIndex }, onClose }) {

    const
        [ chapter, setChapter ] = useState(null),
        [ overlayVisibility, setOverlayVisibility ] = useState(1),
        [ pageIndex, setPageIndex ] = useState(0);

    const opacityValue = new Animated.Value(1);

    useEffect(() => {
        if (manga && manga.chapters) {
            getChapter(manga.chapters[chapterIndex].id).then(chapter => {
                setChapter(chapter);
                setPageIndex(0);
            }).catch(err => {
                console.error(err);
            });
        }
    }, [ manga, chapterIndex ]);

    useEffect(() => {

        setStatusBarHidden(!overlayVisibility, "fade");

        Animated.timing(opacityValue, {
            toValue: overlayVisibility ? 1 : 0,
            duration: 230,
            useNativeDriver: true
        }).start();

    }, [ overlayVisibility ]);

    return (
        <Modal
            animationType = "slide"
            visible = { !!manga }
            presentationStyle = { "fullScreen" }
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

/*

*/

/*


<Animated.View style = {{ ...styles.topContainer, opacity: fadeAnim }}>
                                    <RoundIconButton
                                        icon = "ios-cog"
                                        buttonStyle = { styles.hoverButton }
                                    />
                                    <View style = {{ ...styles.hoverBox, ...styles.volumeChapterContainer }}>
                                        <Text style = { styles.volumeChapterLabel }>
                                            { `Volume ${ chapter.volume }, Chapter ${ chapter.chapter }` }
                                        </Text>
                                        <Text style = { styles.chapterTitle }>{ chapter.title }</Text>
                                    </View>
                                    <RoundIconButton
                                        icon = "ios-close"
                                        size = { 30 }
                                        buttonStyle = { styles.hoverButton }
                                        onPress = { () => onClose() }
                                    />
                                </Animated.View>
                                <View style = { styles.pageCarousel }>
                                    <Image
                                        style = { styles.pageImage }
                                        source = { { uri: chapter.pages[pageIndex] } }
                                        resizeMode = "contain"
                                    />
                                </View>
                                <Animated.View style = {{ ...styles.bottomContainer, opacity: fadeAnim }}>
                                    <View style = {{ ...styles.hoverBox, ...styles.pageCounterContainer }}>
                                        <Text style = { styles.pageCounter }>
                                            { `${ pageIndex + 1 } / ${ chapter.pages.length }` }
                                        </Text>
                                    </View>
                                </Animated.View>

*/