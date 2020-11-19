// Modules
import React, { useRef, useEffect, useState } from "react"
import { Dimensions } from "react-native";

// Components
import { ScrollView } from "react-native";
import ReaderPage from "./ReaderPage";

// Styles
import styles from "../styles/ReaderPageCarousel";

export default function ReaderPageCarousel ({ pages, pageIndex, readingDirection, setPageIndex }) {

    const scrollViewRef = useRef();

    const [ allowScrolling, setAllowScrolling ] = useState(true);

    function scrollToPageIndex (index) {
        if (scrollViewRef.current) {

            const windowWidth = Dimensions.get("window").width;

            scrollViewRef.current.scrollTo({
                x: readingDirection === "rtl"
                    ? (pages.length - 1 - index) * windowWidth
                    : index * windowWidth
            });
        }
    }

    function calculatePageIndex ({ nativeEvent: { contentOffset, layoutMeasurement, contentSize } }) {

        let calculatedPageIndex = 0;

        if (readingDirection === "rtl") {
            calculatedPageIndex = (contentSize.width - layoutMeasurement.width) - contentOffset.x;
        } else {
            calculatedPageIndex = contentOffset.x;
        }

        setPageIndex(Math.max(0, Math.floor(calculatedPageIndex / layoutMeasurement.width)));
    }

    useEffect(() => {
        scrollToPageIndex(pageIndex)
    }, [ readingDirection ]);

    return (
        <ScrollView
            ref = { scrollViewRef }
            horizontal = { true }
            pagingEnabled = { true }
            showsHorizontalScrollIndicator = { false }
            scrollEnabled = { allowScrolling }
            onScroll = { calculatePageIndex }
            scrollEventThrottle = { 4 }
            contentContainerStyle =  {[ styles.pageContainer, { transform: [{ scaleX: readingDirection === "rtl" ? -1 : 1 }] } ]}
        >
            {
                pages.map((page, index) => (
                    <ReaderPage
                        key = { index }
                        page = { page }
                        setAllowScrolling = { setAllowScrolling }
                        readingDirection =  { readingDirection }
                    />
                ))
            }
        </ScrollView>
    );
}