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
import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook.svg";
import AppleIcon from "../assets/apple.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { google,auth,db } from "../firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import { loginUser } from "../firebaseconfig";
import userData from "../recoil/userData";
import { useRecoilState } from "recoil";
import useStore from "./store/store";
import PasswordField from "../components/PasswordField";

import { doc,updateDoc,onSnapshot } from "firebase/firestore";
const Login = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const adduser = useStore(state => state.adduser);
  const setUser = useStore(state => state.setUser);
  const [loading, setLoading] = useState(false);

  async function socialLogin(provide){
    await signInWithPopup(auth,provide)
    .then((result) =>{
      const user = result;
      alert(user.user.email)
  
    });
  }

    async function passwordLogin(){
      setLoading(true)
    console.log(email)
    console.log(password)
      await loginUser(email,password)
      .then((userCredential) => {
        // Signed in 
        adduser(userCredential)
        const user = userCredential;
        console.log(user)
  
        
       setUser(true) 
      
        setLoading(false)
        alert("user login successfully");
        

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let value = errorCode.toString()
         Alert.alert("Error",value.split("auth/").pop())
         setLoading(false)

      });
   
      // try {
      //   await logIn(email, password);
      //   history("/login");
      // } catch (err) {
      //   if (err instanceof Error) {
      //     // ✅ TypeScript knows err is Error
      //     console.log(err.message);
      //   } else {
      //     console.log('Unexpected error', err);
      //   }
      //   // setError(err.message);
      // }
    
    };
  
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
          Login to your account
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
          your details below to continue
        </Text>
        <Text
          style={{
            fontFamily: "Hellix-Bold",
            fontSize: 16,
            marginTop: hp("4.3%"),
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder="Enter your username or email"
          style={styles.input}  onChangeText={(text) => setEmail(text)}
        />
         
        <Text
          style={{
            fontFamily: "Hellix-Bold",
            fontSize: 16,
            marginTop: hp("2%"),
          }}
        >
          Password
        </Text>
        
        <PasswordField placeholder="Enter password" style={styles.input}   onChangeText={(text) => setPassword(text)} />
        {/* <TextInput placeholder="Enter password" style={styles.input} /> */}
        <TouchableOpacity onPress={()=>{navigation.navigate("forgot")}}>
          <Text
            style={{
              fontFamily: "Hellix-Bold",
              fontSize: 16,
              marginTop: hp("1.8%"),
              textAlign: "center",
              marginBottom: hp("6.4%"),
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
        
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
          text="Login"
          type="normal"
          onClick={passwordLogin}
        />}
        {/* OR */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: hp("4.55%"),
          }}
        >
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: "#BFBFBF",
            }}
          />
          <Text style={{ fontSize: 14, color: "#BFBFBF", marginHorizontal: 5 }}>
            OR
          </Text>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: "#BFBFBF",
            }}
          />
        </View>
        {/* social btns */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp("4.45%"),
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => socialLogin(google)}>
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <FacebookIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <AppleIcon />
          </TouchableOpacity>
        </View>

        {/* Register */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp("3.3%"),
          }}
        >
          <Text style={styles.text}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={[styles.text, { fontWeight: "bold", marginLeft: 5 }]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </CustomScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    height: 50,
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
