// Modules
import { setStatusBarHidden } from "expo-status-bar";
import React, { useRef } from "react";
import { Animated, Dimensions, Easing } from "react-native";

// Components
import { Image, ActivityIndicator,View } from "react-native";
import { State, PinchGestureHandler, TapGestureHandler, PanGestureHandler } from "react-native-gesture-handler";

// Styles
import styles from "../styles/ReaderPage";

// Variables
import { COLORS } from "../utils/constants";

export default function ReaderPage ({ page, setAllowScrolling }) {

    const
        isZoomed = useRef(false);

    // Pan to move
    const
        offset = useRef({ x: new Animated.Value(0), y: new Animated.Value(0) }).current,
        lastOffset = useRef({ x: 0, y: 0 }),
        transformedOffset = useRef({ x: new Animated.Value(0), y: new Animated.Value(0) }).current;

    // Pinch to zoom
    const
        baseScale = useRef(new Animated.Value(1)).current,
        pinchScale = useRef(new Animated.Value(1)).current,
        lastScale = useRef(1),    
        transformedScale = Animated.multiply(baseScale, pinchScale).interpolate({
            inputRange: [ .75, 3.8 ],
            outputRange: [ .75, 3.8 ],
            extrapolate: "clamp"
        });

    // Double tap to toggle zoom
    const doubleTapRef = useRef();

    const pinchGestureEvent = Animated.event([
        { nativeEvent: {
            scale: pinchScale
        } }
    ], {
        useNativeDriver: true
    });

    function pinchGestureStateChange ({ nativeEvent: event }) {
        if (event.oldState === State.ACTIVE) {       
            
            function setScaleTo (scale) {
                Animated.timing(baseScale, {
                    toValue: scale,
                    duration: 200,
                    easing: Easing.out(Easing.back(1)),
                    useNativeDriver: true
                }).start(() => {
                    lastScale.current = scale;
                    baseScale.setValue(scale);
                });
            }

            let absoluteScale = lastScale.current * event.scale

            // Save zoom scale
            lastScale.current = absoluteScale;
            baseScale.setValue(lastScale.current);
            pinchScale.setValue(1);

            // Bounce image back to scale 1 if too small
            if (absoluteScale < 1) {
                setScaleTo(1);
                movePageAndSaveState(0, 0, true);       
            } else if (absoluteScale > 3.5) {
                setScaleTo(3.5);
            }
            
            // Toggle page swiping
            if (absoluteScale > 1) {
                isZoomed.current = true;
                setAllowScrolling(false);
            } else {
                isZoomed.current = false;
                setAllowScrolling(true);
            }
        }

    }

    const panGestureEvent = Animated.event([
        { nativeEvent: {
            translationX: offset.x,
            translationY: offset.y
        } }
    ], {
        useNativeDriver: true, 
        listener: ({ nativeEvent: { translationX, translationY } }) => {
            if (isZoomed.current) {
                movePageTo(lastOffset.current.x + translationX, lastOffset.current.y + translationY);
            }
        }
    });

    function movePageTo (x, y, animate) {

        function animatePage (coordinateRef, coordinateValue, callback) {
            Animated.timing(coordinateRef, {
                toValue: coordinateValue,
                duration: 250,
                easing: Easing.out(Easing.back(1)),
                useNativeDriver: true
            }).start(callback);
        }

        if (animate) {
            animatePage(transformedOffset.x, x, () => lastOffset.current.x = x);
            animatePage(transformedOffset.y, y, () => lastOffset.current.y = y);
        } else {
            transformedOffset.x.setValue(x);
            transformedOffset.y.setValue(y);
        }

    }

    function movePageAndSaveState (x, y, animate) {

        // X
        lastOffset.current.x = x;
        offset.x.setOffset(lastOffset.current.x);
        offset.x.setValue(0);

        // Y
        lastOffset.current.y = y;
        offset.y.setOffset(lastOffset.current.y);
        offset.y.setValue(0);

        // Apply changes
        movePageTo(lastOffset.current.x, lastOffset.current.y, animate);

    }

    function panGestureStateChange ({ nativeEvent: { translationX, translationY, oldState } }) {
        if (oldState === State.ACTIVE && isZoomed.current) {
            movePageAndSaveState(lastOffset.current.x + translationX, lastOffset.current.y + translationY);
        }

    }

    function doubleTapGestureStateChange ({ nativeEvent: event }) {
        if (event.state === State.END) {
            
            isZoomed.current = !isZoomed.current;

            Animated.timing(pinchScale, {
                toValue: isZoomed.current ? 2 : 1,
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true
            }).start();
        }
    }

    return (
        <View style = { styles.pageContainer }>
            <TapGestureHandler
                waitFor = { doubleTapRef }
            >
                <TapGestureHandler
                    ref = { doubleTapRef }
                    numberOfTaps = { 2 }
                    maxDist = { 5 }
                    onHandlerStateChange = { doubleTapGestureStateChange }
                >
                    <Animated.View
                        style = {[ styles.pageContainer, { transform: [
                            { scale: transformedScale }
                        ] } ]}
                    >
                        <PinchGestureHandler
                            onGestureEvent = { pinchGestureEvent }
                            onHandlerStateChange = { pinchGestureStateChange }
                        >
                            <Animated.View style = { styles.pageContainer }>
                                <PanGestureHandler
                                    minPointers = { 1 }
                                    maxPointers = { 1 }
                                    onGestureEvent = { panGestureEvent }
                                    onHandlerStateChange = { panGestureStateChange }
                                >
                                    <Animated.Image
                                        style = {[ styles.pageImage, { transform: [
                                            { translateX: transformedOffset.x },
                                            { translateY: transformedOffset.y }
                                        ] } ]}
                                        source = {{ uri: page }}
                                        resizeMode = "contain"
                                    />
                                </PanGestureHandler>
                                <ActivityIndicator
                                    size = "large"
                                    color = { COLORS.text }
                                    style = { styles.pageBuffer }
                                />
                            </Animated.View> 
                        </PinchGestureHandler>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </View>
    );
}