// Modules
import React from "react";

// Components
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Styles
import styles from "../styles/RoundButton";

export default function RoundIconButton ({ icon, size, buttonStyle, onPress }) {
    return (
        <TouchableOpacity
            style = {{ ...styles.button, ...styles.iconButton, ...(buttonStyle || {}) }}
            onPress = { typeof onPress === "function" && onPress.bind(this) }
        >
            <Icon
                name = { icon }
                color = { "#FFFFFF" }
                size = { size || 25 }
                style = { styles.buttonIcon }
            />
        </TouchableOpacity>
    );
}