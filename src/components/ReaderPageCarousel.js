// Modules
import React from "react";

// Components
import { ScrollView } from "react-native";
import ReaderPage from "./ReaderPage";

// Styles
import styles from "../styles/ReaderPageCarousel";

export default function ReaderPageCarousel ({ pages, onPageChange }) {
    return (
        <ScrollView
            horizontal = { true }
            pagingEnabled = { true }
            contentContainerStyle =  { styles.pageContainer }
            maximumZoomScale = { 2 }
            showsHorizontalScrollIndicator = { false }
            onScroll = { (e) => onPageChange(Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width)) }
            scrollEventThrottle = { 4 }
        >
            {
                pages.map((page, index) => (
                    <ReaderPage
                        key = { index }
                        page = { page }
                    />
                ))
            }
        </ScrollView>
    );
}