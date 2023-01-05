import {
    StyleSheet,
    Text,
    TextInput,Alert,
    View,
    ActivityIndicator,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import CustomScreen from "../components/CustomScreen";
  import Logo from "../assets/logo.svg";
  import { COLORS,hp, wp } from "../theme";
  import BigButton from "../components/BigButton";

  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { google,auth,db } from "../firebaseconfig";
  import { sendPasswordResetEmail } from "firebase/auth";
  const Forgetpassword = ({ navigation }) => {
    
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const forgotpassword = () =>{
      setLoading(true)
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          Alert.alert("successful","please check your email and follow the instructions")
          setLoading(false)
          navigation.goBack()
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          let value = errorCode.toString()
          Alert.alert("Error",value.split("auth/").pop())
          setLoading(false)

          // ..
        });
    }
    return (
      <CustomScreen>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Logo width={76} height={76} />
          </View>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Hellix-Bold",
            }}
          >
            Forget Password
          </Text>
          <Text
            style={{
              fontFamily: "Hellix-Regular",
              fontSize: 14,
              textAlign: "center",
              marginTop: hp("1%"),
              lineHeight: 22,
            }}
          >
            Welcome to <Text style={{ fontWeight: "bold" }}>FRNDR</Text>, enter
            your details below to reset your password
          </Text>
          <Text
            style={{
              fontFamily: "Hellix-Bold",
              fontSize: 16,
              marginTop: hp("4.3%"),
            }}
          >
            please enter your email here
          </Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}  onChangeText={(text) => setEmail(text)}
          />
           
          {loading ? (
              <ActivityIndicator size={24} color="white"  style={{
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor:"#4B164C",
                width: "92%",
                padding: 5,
                borderRadius: 15,
                height: 50,
              }} />
            ) :
          <BigButton
            text="submit"
            type="normal"
            onClick={forgotpassword}
          />}
          {/* OR */}
          

        </KeyboardAwareScrollView>
      </CustomScreen>
    );
  };
  
  export default Forgetpassword;
  
  const styles = StyleSheet.create({
    input: {
      height: hp("5.7%"),
      borderWidth: 1,
      borderColor: "#DBDBDB",
      paddingLeft: 15,
      marginTop: 5,
      borderRadius: 5,
      fontFamily: "Hellix-Regular",
    },
    text: {
      fontFamily: "Hellix-Regular",
      fontSize: 13,
    },
  });
  