// Modules
import React from "react";

// Components
import { View, Modal, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import SegmentedControl from "@react-native-community/segmented-control";

// Styles
import coreStyles from "../styles/Core";
import styles from "../styles/ReaderSettings";

// Variables
const readingDirectionEnum = {
    "Left-to-right": "ltr",
    "Right-to-left": "rtl"
};

const readingDirectionLabelEnum = Object.values(readingDirectionEnum);

export default function ReaderSettings ({ visible, onClose, readerSettingChange, readerSettings: { readingDirection } }) {

    function changeReaderSetting (settingName, settingValue) {
        switch (settingName) {
            case "readingDirection":
                readerSettingChange("CHANGE_READING_DIRECTION", settingValue);
                break;
            default:
        }
    }

    return (
        <Modal
            visible = { visible }
            transparent = { true }
            animationType = "fade"
            onDismiss = { onClose }
        >
            <TouchableWithoutFeedback
                onPress = { onClose }
            >
                <BlurView
                    intensity = { 100 }
                    tint = "dark"
                    style = { styles.blurContainer }
                >
                    <TouchableOpacity
                        activeOpacity = { 1 }
                    >
                        <View style = { styles.container }>
                                <View style = { styles.settingContainer }>
                                    <Text style = {[ coreStyles.settingTitleText, styles.settingTitleText ]}>Reading Direction</Text>
                                    <SegmentedControl
                                        values = {[ "Left-to-right", "Right-to-left" ]}
                                        selectedIndex = { readingDirectionLabelEnum.indexOf(readingDirection) }
                                        onValueChange = { value => changeReaderSetting("readingDirection", readingDirectionEnum[value]) }
                                        appearance = "dark"
                                    />
                                </View>
                        </View>
                    </TouchableOpacity>
                </BlurView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}