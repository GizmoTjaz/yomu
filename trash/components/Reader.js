// Modules
import React, { Component } from "react";

// Components
import { Text, View, StyleSheet, Switch, Button } from "react-native";
import ReaderView from "./ReaderView"

// Utils
import { getManga, getChapter } from "../utils/api";

// Styles
const styles = StyleSheet.create({
    text: {
        color: "#FFFFFF"
    },
    title: {
        width: "100%",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    settings: {
        position: "absolute",
        width: "80%",
        left: "10%",
        height: "40%",
        backgroundColor: "#ff0000",
        borderRadius: 15,
        top: "30%",
        display: "flex",
        zIndex: 50
    }
});

export default class Reader extends Component {

    state = {
        settingsVisibility: false,
        leftToRightMode: true,
        chapter: null,
        page: 0
    }

    componentDidMount () {
        getManga(22151).then(mangaResult => {
            getChapter(mangaResult.chapters.get(68).id).then(chapterResult => {
                this.setState({
                    ...this.state,
                    chapter: chapterResult
                });
            }).catch(err => {
                console.error(err);
            })
        }).catch(err => {
            console.error(err);
        });
    }

    render() {

        const { leftToRightMode, settingsVisibility, chapter, page } = this.state;

        return (
            <View style = {{ flex: 1 }}>
                <View style = {{ ...styles.settings, display: settingsVisibility ? "flex" : "none" }}>
                        <Switch
                            trackColor = {{ false: "#767577", true: "#7922CA" }}
                            ios_backgroundColor = "#7922CA"
                            onValueChange = { () => this.setState({ ...this.state, leftToRightMode: !leftToRightMode }) }
                            value = { leftToRightMode }
                        />
                    </View>
                <Text style = {{ ...styles.title,... styles.text }}>
                    {
                        chapter
                        ? `Chapter ${chapter.chapter} - ${chapter.title}`
                        : "Loading..."
                    }
                </Text>
                <Button
                    title = "O"
                    onPress = { () => this.setState({ ...this.state, settingsVisibility: !settingsVisibility }) }
                />
                {
                    chapter && (
                        <ReaderView
                            leftToRightMode = { leftToRightMode }
                            onPageChange = { (pageNumber) => this.setState({ ...this.state, page: pageNumber }) }
                            chapter = { chapter }
                        />
                    )
                }
                <Text style = {{ ...styles.title,... styles.text }}>
                    {
                        chapter
                        ? `Page ${ page + 1 } / ${ chapter.pages.length }`
                        : "Page 0 / 0"
                    }
                </Text>
            </View>
        );
    }
}