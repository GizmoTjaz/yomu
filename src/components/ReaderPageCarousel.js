// Modules
import React, { useRef, useEffect } from "react"
import { Dimensions } from "react-native";

// Components
import { ScrollView } from "react-native";
import ReaderPage from "./ReaderPage";

// Styles
import styles from "../styles/ReaderPageCarousel";

export default function ReaderPageCarousel ({ pages, onPageChange, readingDirection }) {

    const scrollViewRef = useRef();
    
    function invertScrollView () {
        if (scrollViewRef.current) {
            
            const x = readingDirection === "rtl"
                ? Math.floor(Dimensions.get("window").width * pages.length)
                : 0;

            scrollViewRef.current.scrollTo({ x });
        }
    }

    useEffect(() => {
        invertScrollView();
    }, [ readingDirection ]);

    return (
        <ScrollView
            ref = { scrollViewRef }
            horizontal = { true }
            pagingEnabled = { true }
            showsHorizontalScrollIndicator = { false }
            onScroll = { (e) => {

                const event = e.nativeEvent;
                onPageChange(Math.floor(event.contentOffset.x / event.layoutMeasurement.width))

            } }
            scrollEventThrottle = { 4 }
            contentContainerStyle =  {[ styles.pageContainer, { transform: [{ scaleX: readingDirection === "rtl" ? 1 : 1 }] } ]}
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