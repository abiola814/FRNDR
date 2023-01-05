import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomScreen from "../components/CustomScreen";
import Logo from "../assets/logo.svg";
import One from "../assets/One.svg";
import Two from "../assets/Two.svg";
import Three from "../assets/Three.svg";
import Four from "../assets/Four.svg";
import Five from "../assets/Five.svg";
import { hp, Styles, wp } from "../theme";
import BigButton from "../components/BigButton";
import { useState } from "react";
import { updateDoc,doc, } from "firebase/firestore";
import registerData from "../recoil/registerData";
import { useRecoilState } from "recoil";
import { createUser,db } from "../firebaseconfig";
import { getcurentuser } from "../firebaseconfig";
import useStore from "./store/store";

const Interests = ({ navigation }) => {
  
  const userdetails = useStore((state) => state.userdetails);
//id for interest
  let nextid = 0;
  const [interests,setInterest] = useState([])
 

  function pickInterest(value){
    console.log(userdetails.user.uid)
    
    if(interests.length === 5){

      console.log(value)
      var found = interests.indexOf(value) 
      console.log(found)
      if(found > -1){

        setInterest(interests.filter(item => item !== value))
        console.log(interests)
      }
      else{
        alert("maximum selection meet")
      }
    }
    else{
      setInterest([ ...interests,value])
      console.log(interests)
    }
    

  }

  async function submitInterest() {
    console.log("saving data")
    if( interests.length >= 6){
      alert("maximum of 5 selection can be made")
    }
    else{
    await updateDoc(doc(db,"users",userdetails.user.uid),{
      favourite1:interests[0] ? interests[0] :  '',
      favourite2:interests[1] ? interests[1] :  '',
      favourite3:interests[2] ? interests[2] :  '',
      favourite4:interests[3] ? interests[3] :  '',
      favourite5:interests[4] ? interests[4] :  ''
    }) .then(() => {
      console.log('worked')
      navigation.navigate("questions")
    }).catch((error) => {
console.log(error)
    })
  
  }}
  return (
    <CustomScreen>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Logo width={76} height={76} />
      </View>
      <Text style={[Styles.HeaderText, { marginBottom: hp("1.10%") }]}>
        Pick your interests...
      </Text>
      <TextInput placeholder="Search" style={styles.input} />
      <Text style={[styles.text, { color: "#3B3237", marginVertical: 5 }]}>
        You should select at least 5 interests
      </Text>
      <View
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
          flexShrink: 1,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => pickInterest("nature")}>
          <One width={wp("24%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("writing")}>
          <Three width={wp("23%")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => pickInterest("photography")}>
          <Two width={wp("34%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("language")}>
          <Four width={wp("29%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("football")}>
          <Five width={wp("25%")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickInterest("nature")}>
          <One width={wp("24%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("writing")}>
          <Three width={wp("23%")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => pickInterest("photography")}>
          <Two width={wp("34%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("language")}>
          <Four width={wp("29%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("football")}>
          <Five width={wp("25%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("photography")}>
          <Two width={wp("34%")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickInterest("language")}>
          <Four width={wp("29%")} />
        </TouchableOpacity>
      </View>
      <BigButton
        text={"Next"}
        type="normal"
        onClick={submitInterest}
      />
    </CustomScreen>
  );
};

export default Interests;

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
