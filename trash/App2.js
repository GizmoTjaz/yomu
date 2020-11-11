// Modules
import { StatusBar } from "expo-status-bar";
import React from "react";

// Components
import { Fragment } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Library from "./components/Library";

// Styles
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#16151D",
    flex: 1
  }
});

export default function App () {
  return (
    <Fragment>
      <SafeAreaView style = {{ ...styles.background, flex: 0 }} />
      <SafeAreaView style = { styles.background }>
        <Library />
      </SafeAreaView>
    </Fragment>
  );
}
