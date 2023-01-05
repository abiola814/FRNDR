import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";

const PasswordField = (props) => {
  const [view, setView] = useState(true);
  const ref = useRef();
  return (
    <View style={{ position: "relative", height: 50 }}>
      <TextInput ref={ref} {...props} secureTextEntry={view} />
      <Pressable
        style={styles.btn}
        onPress={() => {
          ref.current.focus();
          setView(!view);
        }}
      >
        {view === true ? (
          <Feather name="eye-off" size={20} color="#333" />
        ) : (
          <Feather name="eye" size={20} color="#333" />
        )}
      </Pressable>
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    width: 25,
    height: 25,
    right: 14,
    top: 20,
    zIndex: 10,
  },
});
