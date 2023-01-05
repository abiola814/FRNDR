import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomScreen from "../components/CustomScreen";
import Envelop from "../assets/envelop.svg";
import { hp, Styles } from "../theme";
import { Entypo } from "@expo/vector-icons";
import AnimatedExample from "../components/VerificationInput";

const VerifyNumber = ({ navigation ,route}) => {
  const { verif} = route.params;
  console.log(verif)
  return (
    <CustomScreen>
      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            marginBottom: -40,
          }}
        >
          <Entypo name="chevron-small-left" size={27} color="black" />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp("2.5"),
          }}
        >
          <Envelop />
        </View>
        <Text
          style={[
            Styles.HeaderText,
            {
              textAlign: "center",
              marginTop: hp("6.5"),
              marginBottom: hp("1.72%"),
            },
          ]}
        >
          Verifiy Mobile Number
        </Text>

        <Text
          style={[
            Styles.normalText,
            {
              textAlign: "center",
              lineHeight: 22,
              fontSize: 14,
              marginBottom: hp("7.5%"),
            },
          ]}
        >
          Enter verification code that sent to {"\n"} +1 123 456 7890 by SMS
        </Text>
        <AnimatedExample navigation={navigation} verif={verif} />
      </View>
    </CustomScreen>
  );
};

export default VerifyNumber;

const styles = StyleSheet.create({});
