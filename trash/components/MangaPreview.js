// Modules
import React from "react";

// Components
import { Modal, StyleSheet, View, TouchableOpacity, Text, Image, Button } from "react-native";
import { Directions, FlingGestureHandler, State } from "react-native-gesture-handler"

// Styles
const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: "85%",
        top: "15%",
        backgroundColor: "#222222",
        borderRadius: 25,
        paddingTop: 20
    },
    title: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "left",
        flexWrap: "wrap",
        flex: 1,
        marginLeft: 20
    },
    thumbnail: {
        width: "100%",
        height: "33%",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        opacity: .7,
        position: "absolute"
    },
    poster: {
        width: 110,
        height: 180,
        borderRadius: 6,
        marginLeft: 20
    },
    infoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default function MangaPreview (props) {

    const { title, thumbnail } = props.data;

    return (
        <Modal
            animationType = "slide"
            visible = { props.visible }
            onDismiss = { props.onDismiss.bind() }
            onRequestClose = { props.onDismiss.bind() }
            transparent = { true }
        >
            <FlingGestureHandler
                direction = { Directions.DOWN }
                onHandlerStateChange = { ({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        props.onDismiss();
                    }
                }}
            >
                <View style = { styles.card }>
                    <Image
                        source = {{ uri: thumbnail }}
                        resizeMode = "cover"
                        style = { styles.thumbnail }
                        blurRadius = { 30 }
                    />
                    <View style = { styles.infoContainer }>
                        <Image
                            source = {{ uri: thumbnail }}
                            resizeMode = "cover"
                            style = { styles.poster }
                        />
                        <Text style = { styles.title }>{ title }</Text>
                    </View>
                </View>
            </FlingGestureHandler>
        </Modal>
    );
}

/*
<TouchableOpacity
                onPress = { props.onDismiss.bind() }
                style = {{ width: "100%", height: "20%", top: 0, position: "absolute" }}
            />*/