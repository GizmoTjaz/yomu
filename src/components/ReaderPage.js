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

export default function ReaderPage ({ page, setAllowScrolling, readingDirection }) {

    const
        isZoomed = useRef(false);

    // Pan to move
    const
        position = useRef({ x: new Animated.Value(0), y: new Animated.Value(0) }).current,
        lastPosition = useRef({ x: 0, y: 0 }),
        transformedPosition = useRef({ x: new Animated.Value(0), y: new Animated.Value(0) }).current;

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

    function pinchGestureStateChange ({ nativeEvent: event }) {
        if (event.oldState === State.ACTIVE) {       
            
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
            translationX: position.x,
            translationY: position.y
        } }
    ], {
        useNativeDriver: true, 
        listener: ({ nativeEvent: { translationX, translationY } }) => {
            if (isZoomed.current) {
                movePageTo(lastPosition.current.x + translationX, lastPosition.current.y + translationY);
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
            animatePage(transformedPosition.x, x, () => lastPosition.current.x = x);
            animatePage(transformedPosition.y, y, () => lastPosition.current.y = y);
        } else {
            transformedPosition.x.setValue(x);
            transformedPosition.y.setValue(y);
        }

    }

    function movePageAndSaveState (x, y, animate) {

        // X
        lastPosition.current.x = x;
        position.x.setOffset(lastPosition.current.x);
        position.x.setValue(0);

        // Y
        lastPosition.current.y = y;
        position.y.setOffset(lastPosition.current.y);
        position.y.setValue(0);

        // Apply changes
        movePageTo(lastPosition.current.x, lastPosition.current.y, animate);

    }

    function panGestureStateChange ({ nativeEvent: { translationX, translationY, oldState } }) {
        if (oldState === State.ACTIVE && isZoomed.current) {
            movePageAndSaveState(lastPosition.current.x + translationX, lastPosition.current.y + translationY);
        }

    }

    function doubleTapGestureStateChange ({ nativeEvent: event }) {
        if (event.state === State.END) {
            
            isZoomed.current = !isZoomed.current;

            if (isZoomed.current) {
                setScaleTo(2);
                setAllowScrolling(false);
            } else {
                setScaleTo(1);
                movePageAndSaveState(0, 0, true);
                setAllowScrolling(true);
            }

            
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
                    maxDist = { 25 }
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
                                    minPointers = { 2 }
                                    onGestureEvent = { panGestureEvent }
                                    onHandlerStateChange = { panGestureStateChange }
                                >
                                    <Animated.View
                                        style = {[
                                            { transform: [
                                                { translateX: transformedPosition.x },
                                                { translateY: transformedPosition.y }
                                            ] },
                                            styles.pageImage
                                        ]}
                                    >
                                        <Image
                                            style = {[ styles.pageImage, { transform: [{ scaleX: readingDirection === "rtl" ? -1 : 1 }] } ]}
                                            source = {{ uri: page }}
                                            resizeMode = "contain"
                                        />
                                        <ActivityIndicator
                                            size = "large"
                                            color = { COLORS.text }
                                            style = { styles.pageBuffer }
                                        />
                                    </Animated.View>
                                </PanGestureHandler>
                            </Animated.View> 
                        </PinchGestureHandler>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </View>
    );
}