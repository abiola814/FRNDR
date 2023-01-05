import {
  StyleSheet,
  Text,
  TextInput,
  Platform,
  View,Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState ,useEffect} from "react";
import CustomScreen from "../components/CustomScreen";
import Logo from "../assets/logo.svg";
import { COLORS, hp, wp } from "../theme";
import BigButton from "../components/BigButton";
import { createUser,db, loginUser } from "../firebaseconfig";
import { setDoc, doc } from "firebase/firestore"; 

import useStore from "./store/store";
import * as Location from 'expo-location';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { auth } from "../firebaseconfig";






import CountryPicker, {
  getAllCountries,
  getCallingCode,
  FlagButton,
} from "react-native-country-picker-modal";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { config } from "../firebaseconfig";


const Register = ({ navigation }) => {
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const attemptInvisibleVerification = true;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [withFlag, setWithFlag] = useState(true);
  const [country, setCountry] = useState({ callingCode: ["1264"] });
  
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');
    const adduser = useStore(state => state.adduser);
    const addverify = useStore(state => state.addverify);
    const [loading, setLoading] = useState(false);

    
    // create a database for the user that contain also table needed
    async function saveUser(user){
      try {
        const docRef = await setDoc(doc(db, "users",user.user.uid), {
          id:user.user.uid,
          email: user.user.email,
          phone: number,
          favourite1:'',
          favourite2:'',
          favourite3:'',
          favourite4:'',
          favourite5:'',
          question1:null,
          question2:null,
          question3:null,
          question4:null,
          question5:null,
          name:"",
          age:"",
          dating:"no",
          gender:"",
          username:"",
          bio:"",
          lookingfor:"",
          image1: null,
          image2:null,
          image3: null,
          image4:null,
          image5:null,
          image6:null,
          location:location,
          likes:[],
          favourites:[],
          totallike:0,
          status:true,
          completed:0,

        });
        const docRef2 = await setDoc(doc(db, "userchat",user.user.uid), {});
        adduser(user)

        
      } catch (e) {
        alert("Error creating user information: ");
        setLoading(false)
      }
      
    }

    const otp = async () => {

      try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          number,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        addverify(verificationId);
        console.log('Verification code has been sent to your phone.')
      } catch (error) {
        const errorCode = error.code;
        let value = errorCode.toString()
        alert(value.split("auth/").pop())
        setLoading(false)
        return null
      }
    }

    async function handleSubmit(){
      setLoading(true)
        console.log(email,number,password)
        
    
    otp()
    await createUser(email,password)
    .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    // console.log(user)
        // ...
      setEmail('') 
      saveUser(userCredential)
    
      loginUser(email,password)
    
      setLoading(false)
      navigation.navigate("verify",{verificationId})

       
  })
    .catch((error) => {
    const errorCode = error.code;
    let value = errorCode.toString()
    alert(value.split("auth/").pop())
    setLoading(false)
    }
    )
  
    }
    
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          console.log(errorMsg)
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords)
        // setLocation(location);
        console.log(address)
        {address.map( (address,index)=>
          (
            setLocation(address.city)
          )
        )}
      })();
    }, []);
  

  return (
    <CustomScreen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Logo width={76} height={76} />
        </View>
        <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={config}
       attemptInvisibleVerification={attemptInvisibleVerification}
        //appVerificationDisabledForTesting={true}
      />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: "Hellix-Bold",
          }}
        >
          Register to your account
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
          Fill the following essential details to getting registered.
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
        <TextInput placeholder="Enter your email" style={styles.input} value={email} onChangeText={text => setEmail(text)}/>

        <Text
          style={{
            fontFamily: "Hellix-Bold",
            fontSize: 16,
            marginTop: hp("2%"),
          }}
        >
          Mobile number
        </Text>
        <View
          style={[
            styles.input,
            { alignItems: "center", flexDirection: "row", paddingLeft: 2 },
          ]}
        >
          {/*  */}
          {/* <TouchableOpacity
          style={{
            height: "100%",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <CountryPicker
            withCallingCode
            withFlag
            withFlagButton={true}
            countryCodes
            renderFlagButton={() => <FlagButton />}
            onSelect={(e) => setCountry(e)}
          />
          <FlagButton
            withEmoji={true}
            withCallingCodeButton={true}
            withFlagButton={true}
            withCurrencyButton={true}
          />
          <Text>+{country?.callingCode[0]}</Text>
        </TouchableOpacity> */}
          {/* <View
          style={{
            width: 1,
            height: "60%",
            backgroundColor: "#263238",
            marginHorizontal: 3,
          }}
        /> */}
          <TextInput
            placeholder="Enter your mobile number"
            style={{ height: "100%", width: "100%", paddingLeft: 13 }} value={number}
            keyboardType="phone-pad"   onChangeText={text => setNumber(text)}
          />
        </View>

        <Text
          style={{
            fontFamily: "Hellix-Bold",
            fontSize: 16,
            marginTop: hp("2%"),
          }}
        >
          Password
        </Text>
        <TextInput placeholder="Enter password" style={styles.input}  onChangeText={text => setPassword(text)}/>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: hp("2.6%"),
            marginBottom: hp("9.5%"),
          }}
        >
          <BouncyCheckbox
            size={20}
            fillColor={COLORS.primary}
            unfillColor="#eee"
            iconStyle={{ borderRadius: 1 }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 1 }}
            isChecked={true}
          />
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: "Hellix-Regular",
              width: "90%",
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            I agree to that FRNDR terms and conditons.{" "}
            <Text style={{ fontWeight: "bold" }}>Learn more.</Text>
          </Text>
        </View>
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
          text="Register"
          type="normal"
          onClick={handleSubmit}
        />
          }

        {/* Login */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp("5.4%"),
          }}
        >
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={[styles.text, { fontWeight: "bold", marginLeft: 5 }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </CustomScreen>
  );
};

export default Register;

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
