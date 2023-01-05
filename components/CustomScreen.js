import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";

const CustomScreen = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      {children}
    </SafeAreaView>
  );
};

export default CustomScreen;

const styles = StyleSheet.create({});
