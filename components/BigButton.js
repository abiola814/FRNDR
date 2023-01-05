import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, hp } from "../theme";

const BigButton = ({ type, text, onClick }) => {
  const borderred = { backgroundColor: "white", borderColor: COLORS.primary };
  const normal = {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  };
  let btnStyle = type === "normal" ? normal : borderred;

  const normalText = { color: "white" };
  const borderredText = { color: COLORS.primary };

  let textStyle = type === "normal" ? normalText : borderredText;
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: hp("6.2%"),
        borderRadius: 5,
        borderWidth: 2,
        ...btnStyle,
      }}
    >
      <Text
        style={{
          ...textStyle,
          fontFamily: "Hellix-Regular",
          fontWeight: "700",
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BigButton;

const styles = StyleSheet.create({});
