// Modules
import React from "react";

// Components
import { Text, TouchableOpacity } from "react-native";

// Styles
import styles from "../styles/RoundButton";

export default function RoundTextButton ({ text, buttonStyle, textStyle, onPress }) {
    return (
        <TouchableOpacity
            style = {{ ...styles.button, ...styles.textButton, ...(buttonStyle || {}) }}
            onPress = { typeof onPress === "function" && onPress.bind(this) }
        >
            {
                <Text style = {{ ...styles.buttonText, ...(textStyle || {}) }}>{ text }</Text>
            }
        </TouchableOpacity>
    );
}