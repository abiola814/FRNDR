import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { COLORS, Styles } from "./theme";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./stacks/AppStack";
import { RecoilRoot } from "recoil";
import MainStack from "./stacks/MainStack";
import "react-native-gesture-handler";
import Home from "./screens/Home";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Hellix-Regular": require("./assets/fonts/Hellix-Regular.ttf"),
    "Hellix-Bold": require("./assets/fonts/Hellix-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" backgroundColor={COLORS.primary} />
          {/* <Home /> */}
          <MainStack />
          {/* <AppStack /> */}
        </SafeAreaView>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: StatusBar.currentHeight,
  },
});
