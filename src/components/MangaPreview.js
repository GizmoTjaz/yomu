// Modules
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

// Components
import { Fragment } from "react";
import { Modal, View, Image, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions, RefreshControl } from "react-native";
import { Directions, FlingGestureHandler, State } from "react-native-gesture-handler";
import RoundTextButton from "./RoundTextButton";
import ShareButton from "./ShareButton";
import FavoriteButton from "./FavoriteButton";

// Styles
import coreStyles from "../styles/Core";
import styles from "../styles/MangaPreview";

// Utils
import { getManga } from "../utils/api";

// Factories
import constructManga from "../factories/Manga";

// Variables
import { COLORS } from "../utils/constants";
const huskChaptersToRender = Math.floor((Dimensions.get("screen").height - 200) / (34 + 3))
const mangaHusk = constructManga();
const detailedInfoLabels = [
    [ "Author", "author" ],
    [ "Status", "status" ],
    [ "Volumes", "volumeCount" ],
    [ "Chapters", "chapterCount" ]
];

export default function MangaPreview ({ visible, onDismiss, mangaId, setReaderData }) {

    const
        [ manga, setManga ] = useState(mangaHusk),
        [ isLoading, setLoading ] = useState(true);

    function fetchManga () {

        setLoading(true);

        getManga(mangaId).then(manga => {
            setManga(manga);
            setLoading(false);
        }).catch(err => {
            
            Alert.alert("Error", "Couldn't fetch manga.", [
                {
                    text: "OK",
                    onPress: onClose
                }
            ]);

            setLoading(false);
        });
    }

    function openReader (chapterIndex) {
        setReaderData(manga, chapterIndex);
    }

    useEffect(() => {
        if (mangaId) {
            setManga(mangaHusk);
            fetchManga();
        }
    }, [ mangaId ]);

    return (
        <Modal
            animationType = "slide"
            visible = { visible }
            onDismiss = { onDismiss }
            transparent = { true }
        >
            <FlingGestureHandler
                direction = { Directions.DOWN }
                onHandlerStateChange = { ({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        onDismiss();
                    }
                }}
            >
                <SafeAreaView style = { styles.previewContainer }>
                    <View style = { styles.detailsContainer }>
                        {
                            manga.hasOwnProperty("chapters")
                            ? (
                                <Fragment>
                                    <Image
                                        source = { manga.artwork ? { uri: manga.artwork } : null }
                                        style = { styles.mangaArtwork }
                                        resizeMode = "cover"
                                    />
                                    <View style = { styles.infoContainer }>
                                        <Text style = {{ ...coreStyles.headerText, ...styles.mangaTitle }}>{ manga.title }</Text>
                                        <View style = { styles.detailedInfoContainer }>
                                            {
                                                detailedInfoLabels.map(([ infoName, infoProperty ], index) => {
                                                    if (manga.hasOwnProperty(infoProperty)) {
                                                        return (
                                                            <View key = { index } style = { styles.detailedInfoLabel }>
                                                                <Text style = {{ ...coreStyles.headerText, ...styles.detailedInfoName }}>{ infoName }</Text>
                                                                <Text style = {{ ...coreStyles.subHeaderText, ...styles.detailedInfoValue }}>{ manga[infoProperty] }</Text>
                                                            </View>
                                                        );
                                                    }
                                                })
                                            }
                                        </View>
                                        <View style = { styles.detailedInfoButtonContainer }>
                                            <RoundTextButton
                                                text = "Read"
                                                buttonStyle = { styles.readButton }
                                                onPress = { () => openReader(0) }
                                            />
                                            <FavoriteButton
                                                manga = { manga }
                                            />
                                            <ShareButton
                                                buttonStyle = { styles.shareButton }
                                                content = { manga.url }
                                            />
                                        </View>
                                    </View>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <View style = { styles.emptyMangaArtwork } />
                                    <View style = { styles.infoContainer }>
                                        <View style = { styles.emptyMangaTitle } />
                                    </View>
                                </Fragment>
                            )
                        }
                    </View>
                    {
                        manga.hasOwnProperty("chapters")
                        ? (
                            <FlatList
                                style = { styles.chapterList }
                                data = { manga.chapters }
                                initialNumToRender = { 15 }
                                keyExtractor = { ({ index }) => index.toString() }
                                refreshControl = { (
                                    <RefreshControl
                                        refreshing =  { isLoading }
                                        onRefresh = { fetchManga }
                                        tintColor = { COLORS.text }
                                        colors = { [ COLORS.text ] }
                                    />
                                ) }
                                renderItem = { ({ item: chapter, index }) => (
                                    <Fragment>
                                        {
                                            (index === 0 || chapter.volume !== (manga.chapters[index - 1].volume)) && (
                                                <Text style = { styles.chapterListVolumeHeader }>{ chapter.volume ? `Volume ${chapter.volume}` : "No Volume" }</Text>
                                            )
                                        }
                                        <TouchableOpacity
                                            onPress = { openReader.bind(this, index) }
                                        >
                                            <View style = { styles.chapterListItem }>
                                                <Text style = { styles.chapterListItemNumber }>{ chapter.chapter }</Text>
                                                <Text style = { styles.chapterListItemTextSeparator }>·</Text>
                                                <Text
                                                    style = { styles.chapterListItemName }
                                                    numberOfLines = { 1 }
                                                    ellipsizeMode = "tail"
                                                >{ chapter.title }</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Fragment>
                                ) }
                            />
                        )
                        : (
                            <View style = { styles.chapterList }>
                                {
                                    Array.from(Array(huskChaptersToRender)).map((_, index) => (
                                        <View
                                            key = { index }
                                            style = { styles.chapterListItem }
                                        />
                                    ))
                                }
                            </View>
                        )
                    }
                </SafeAreaView>
            </FlingGestureHandler>
        </Modal>
    )
};