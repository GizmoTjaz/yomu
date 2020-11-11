// Modules
import React, { useState } from "react";

// Components
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MangaPreview from "./MangaPreview";

// Styles
const styles = StyleSheet.create({
    item: {
        width: 150,
        height: 230,
        margin: "auto"
    },
    thumbnail: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    title: {
        color: "#FFFFFF",
        fontWeight: "bold",
        marginTop: 5
    }
});

export default function LibraryManga (props) {

    const [ preview, setPreview ] = useState(false);

    const { thumbnail, title } = props.data;

    return (
        <View style = { styles.item }>
            <MangaPreview
                visible = { preview }
                onDismiss = { () => setPreview(false) }
                data = { props.data }
            />
            <TouchableOpacity
                onPress = { () => setPreview(true) }
            >
                <Image
                    source = {{ uri: thumbnail }}
                    resizeMode = "cover"
                    style = { styles.thumbnail }
                />
            </TouchableOpacity>
            <Text style = { styles.title }>{ title }</Text>
        </View>
    );
};