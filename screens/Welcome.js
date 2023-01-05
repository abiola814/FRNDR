import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomScreen from "../components/CustomScreen";
import Logo from "../assets/logo.svg";
import Ellipse from "../assets/Ellipse.svg";
import { hp, Styles, wp } from "../theme";
import BigButton from "../components/BigButton";

const Welcome = ({ navigation }) => {
  return (
    <CustomScreen>
      <View
        style={{
          flex: 1,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ height: hp("14%") }} />
        <Logo height={150} width={150} />
        <Text style={[Styles.HeaderText, { marginTop: hp("9.2%") }]}>
          Welcome to FRNDR
        </Text>
        <Text
          style={[
            Styles.normalText,
            { textAlign: "center", width: "80%", marginBottom: hp("22.4%") },
          ]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi,etium
          maecenas sed urna
        </Text>
        {/* buttons */}
        <BigButton
          type="borderred"
          text="Login"
          onClick={() => navigation.navigate("login")}
        />
        <View style={{ height: 10 }} />
        <BigButton
          type="normal"
          text="Register"
          onClick={() => navigation.navigate("register")}
        />
      </View>
      <View style={{ position: "absolute", left: -50, top: 40 }}>
        <Ellipse width={118} height={118} />
      </View>
      <View style={{ position: "absolute", right: 10, top: 14 }}>
        <Ellipse width={45} height={45} />
      </View>
      <View style={{ position: "absolute", right: -35, top: hp("30%") }}>
        <Ellipse width={70} height={70} />
      </View>
      <View style={{ position: "absolute", right: 10, top: hp("70%") }}>
        <Ellipse width={70} height={70} />
      </View>
      <View style={{ position: "absolute", left: wp("10%"), top: hp("35%") }}>
        <Ellipse width={30} height={30} />
      </View>
      <View style={{ position: "absolute", left: wp("3%"), top: hp("70%") }}>
        <Ellipse width={30} height={30} />
      </View>
    </CustomScreen>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
