/*
Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments
*/
import { Animated, Image, SafeAreaView, Text, View } from "react-native";
import React, { useState,useEffect } from "react";
import * as firebase from 'firebase/app'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from "./styles";
import BigButton from "../BigButton";
import { hp } from "../../theme";

import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { auth } from "../../firebaseconfig";
import useStore from "../../screens/store/store";


const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;
const source = {
  uri: "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const AnimatedExample = ({ navigation,verif }) => {
  const [value, setValue] = useState("");
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [timetaken, setTimetaken] = useState(10);
  const verify = useStore((state) => state.verify);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };
   const verifynumber = async (verifycode) => {
      try {
        const credential = PhoneAuthProvider.credential(verify, verifycode);
        await signInWithCredential(auth, credential);
        console.log("worked")
        navigation.navigate("interest")
      } catch (err) {
    
console.log(err)
navigation.navigate("interest")
          
      }
    }

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
      console.log("-------------------------------",value)
      if (value.length == 6){
           verifynumber(value)
           console.log(verify)
          
      }
    }, timetaken)

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      /> 
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          color: "#000000",
          fontFamily: "Hellix-Regular",
          fontWeight: "400",
        }}
      >
        Enter 6 digit code
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: hp("7.14%"),
          color: "#730075",
          fontFamily: "Hellix-Regular",
          fontWeight: "500",
        }}
      >
        Resend Code (0:30s)
      </Text>
      <View style={{ marginTop: hp("10%") }}>
        {/* <BigButton
          text="Verify"
          type="normal"
          onClick={() => navigation.navigate("interest")}
        /> */}
      </View>
    </View>
  );
};

export default AnimatedExample;
