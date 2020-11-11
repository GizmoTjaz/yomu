// Modules
import React from "react";

// Components
import { StyleSheet } from "react-native";
import ViewPager from "@react-native-community/viewpager";

// Styles
const styles = StyleSheet.create({
    reader: {
        flex: 1
    },
    page: {
        flex: 1
    }
});

export default ReaderView = () => {

    const { chapter, onPageChange } = this.props;

    return (
        <ViewPager
            style = { styles.reader }
            initialPage = { 0 }
            onPageSelected = { (e) => onPageChange(e.nativeEvent.position) }
        >
            {
                chapter && chapter.pages.map((pageSource, index) => (
                    <Image
                        key = { this.props.leftToRightMode ? index : (chapter.pages.length - index) }
                        source = {{ uri: pageSource }}
                        resizeMode = "contain"
                        style = { styles.page }
                    />
                ))
            }
        </ViewPager>
    );
};