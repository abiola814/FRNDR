import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export { wp, hp };

export const COLORS = {
  primary: "#4B164C",
  lightPurple: "#DD88CF",
  gray: "#F1F1F1",
  gray2: "#F4F4F4",
};

export const Styles = StyleSheet.create({
  HeaderText: {
    fontFamily: "Hellix-Bold",
    fontSize: 21,
    color: "#000000",
  },
  normalText: {
    fontFamily: "Hellix-Regular",
    fontSize: 16,
    color: "#4A4947",
  },
});
