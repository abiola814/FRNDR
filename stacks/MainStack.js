import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import TabStack from "./TabStack";
import useStore from "../screens/store/store";

const MainStack = () => {
  const [user_data, setUser] = useRecoilState(userData);
  const login = useStore((state) => state.login);

  return (
    <View style={{ flex: 1 }}>
      {login === null ? <AuthStack /> : <AppStack />}
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
