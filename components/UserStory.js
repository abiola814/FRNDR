import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../theme";

const UserStory = ({ name, photo }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        marginRight: 15,
        // backgroundColor: "red",
      }}
    >
      <TouchableOpacity style={styles.container}>
        <Image
          source={photo}
          style={{ width: 54, height: 54, borderRadius: 27 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 4,
          fontFamily: "Hellix-Regular",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default UserStory;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    borderRadius: 32,
    // marginRight: 15,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
