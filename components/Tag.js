import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { COLORS } from "../theme";

const Tag = ({ label, id, removeInterest }) => {
  return (
    <TouchableOpacity
      onPress={() => removeInterest(id)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        marginHorizontal: 5,
        elevation: 1,
        height: 30,
        marginTop: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: COLORS.primary, fontSize: 12, marginRight: 5 }}>
        {label}
      </Text>
      <AntDesign name="close" size={14} color="black" />
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({});