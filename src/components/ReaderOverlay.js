// Modules
import React, { useRef } from "react";
import { setStatusBarHidden } from "expo-status-bar";
import { Animated } from "react-native";

// Components
import { Text, View } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import RoundIconButton from "./RoundIconButton";

// Styles
import styles from "../styles/ReaderOverlay";

export default function ReaderOverlay ({ chapter, pageIndex, readingDirection, setSettingsVisibility, closeOverlay }) {

    const
        overlayOpacityValue = useRef(new Animated.Value(1)).current,
        overlayOpacityState = useRef(true);

    function tapGestureEvent (event) {
        if (event.nativeEvent.state === State.END && event.nativeEvent.y > 90) {

            overlayOpacityState.current = !overlayOpacityState.current;
            setStatusBarHidden(!overlayOpacityState.current, "fade");

            Animated.timing(overlayOpacityValue, {
                toValue: overlayOpacityState.current ? 1 : 0,
                duration: 230,
                useNativeDriver: true
            }).start();

        }
    }

    function calculatePagePosition () {
        return Math.max(1, pageIndex + 1);
    }

    return (
        <View
            style = { styles.container }
            pointerEvents = "box-none"
        >
            <TapGestureHandler
                numberOfTaps = { 1 }
                onHandlerStateChange = { tapGestureEvent }
            >
                <Animated.View
                    style = {[ styles.subContainer, { opacity: overlayOpacityValue }]}
                    pointerEvents = "box-none"
                >
                    <View style = {[ styles.floatingContainer, styles.topContainer ]}>
                        <RoundIconButton
                            icon = "ios-cog"
                            buttonStyle = { styles.hoverButton }
                            onPress = { () => setSettingsVisibility(true) }
                        />
                        <View style = {[ styles.hoverBox, styles.titleContainer ]}>
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
                            onPress = { () => closeOverlay() }
                        />
                    </View>
                    <View style = {[ styles.floatingContainer, styles.bottomContainer ]}>
                        <View style = {[ styles.hoverBox, styles.pageCounterContainer ]}>
                            <Text style = { styles.pageCounterLabel }>
                                { `${calculatePagePosition()} / ${ chapter.pages.length }` }
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </TapGestureHandler>
        </View>
    );
}

/*
<Animated.View
    style = {[
        styles.floatingContainer,
        styles.topContainer,
        { opacity: overlayOpacityValue }
    ]}
>
    <RoundIconButton
        icon = "ios-cog"
        buttonStyle = { styles.hoverButton }
        onPress = { () => setSettingsVisibility(true) }
    />
    <View style = {[ styles.hoverBox, styles.titleContainer ]}>
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
        onPress = { () => closeOverlay() }
    />
</Animated.View>
<Animated.View
    style = {[
        styles.floatingContainer,
        styles.bottomContainer,
        { opacity: overlayOpacityValue }
    ]}
>
    <View style = {[ styles.hoverBox, styles.pageCounterContainer ]}>
        <Text style = { styles.pageCounterLabel }>
            { `${Math.max(1, pageIndex + 1)} / ${ chapter.pages.length }` }
        </Text>
    </View>
</Animated.View>
*/

/*
<Fragment>
                    <Animated.View
                        style = {[
                            styles.floatingContainer,
                            styles.topContainer,
                            { opacity: overlayOpacityValue }
                        ]}
                    >
                        <RoundIconButton
                            icon = "ios-cog"
                            buttonStyle = { styles.hoverButton }
                            onPress = { () => setSettingsVisibility(true) }
                        />
                        <View style = {[ styles.hoverBox, styles.titleContainer ]}>
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
                            onPress = { () => closeOverlay() }
                        />
                    </Animated.View>
                    <Animated.View
                        style = {[
                            styles.floatingContainer,
                            styles.bottomContainer,
                            { opacity: overlayOpacityValue }
                        ]}
                    >
                        <View style = {[ styles.hoverBox, styles.pageCounterContainer ]}>
                            <Text style = { styles.pageCounterLabel }>
                                { `${Math.max(1, pageIndex + 1)} / ${ chapter.pages.length }` }
                            </Text>
                        </View>
                    </Animated.View>
                </Fragment>
*/