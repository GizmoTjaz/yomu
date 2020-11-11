// Modules
import React, { useEffect, useState } from "react";

// Components
import { StyleSheet, View } from "react-native";
import LibraryManga from "./LibraryManga";

// Utils
import { getManga } from "../utils/api";

// Styles
const styles = StyleSheet.create({
    library: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }
});

export default function Library () {

    const [ mangaList, setMangaList ] = React.useState([]);

    useEffect(() => {
        getManga(22151).then(mangaResult => {
            setMangaList([ mangaResult ]);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    return (
        <View style = { styles.library }>
            {
                mangaList.map((manga, index) => (
                    <LibraryManga data = { manga } key = { index } />
                ))
            }
        </View>
    );
}