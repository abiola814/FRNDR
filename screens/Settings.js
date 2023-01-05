import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons, Entypo, FontAwesome } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";

import React from "react";
import { COLORS, Styles } from "../theme";
import { RangeSlider, Slider } from "react-native-super-range-slider";
import { useState,useEffect } from "react";
import { db } from "../firebaseconfig";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";

import useStore from "./store/store";


const List = ({ text1, text2 }) => {

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      <Text style={[Styles.HeaderText, { fontSize: 15 }]}>{text1}</Text>
      <Text>{text2}</Text>
    </View>
  );
};

const Settings = ({ navigation }) => {
  const [value, setValue] = useState(70);
  const [value2, setValue2] = useState(70);
  const [userData, setUserData] = useState(null);
  const userdetails = useStore((state) => state.userdetails);

  const getUser = async() => {
    const docRef = doc(db, "users", userdetails.user.uid);
    const docSnap = await getDoc(docRef)
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
  
        setUserData(documentSnapshot.data());
      }
    })
  };
  
  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -10,
          }}
        >
          <Entypo name="chevron-left" size={25} color="black" />
          <Text style={[Styles.HeaderText, { marginBottom: 3 }]}>Settings</Text>
        </TouchableOpacity>
      </View>
      {/* end of header */}
      <View style={{ padding: 20 }}>
        <Text style={[Styles.normalText, { textTransform: "uppercase" }]}>
          Account Settings
        </Text>
        <List text1="Phone number" text2={userData ? userData.phone : ""} />
        <List text1="Email" text2={userData ? userData.email : ""} />
        <View
          style={{
            height: 1,
            backgroundColor: "lightgray",
            marginTop: 15,
            marginHorizontal: -17,
          }}
        />
        <Text
          style={[
            Styles.normalText,
            { textTransform: "uppercase", marginTop: 20 },
          ]}
        >
          Discovery
        </Text>
        <List text1="Location" text2="" />
        <View
          style={{
            backgroundColor: "#F4F4F4",
            height: 52,
            borderRadius: 26,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 15,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontFamily: "Hellix-Bold" }}>
            Current location
            <Text style={{ fontFamily: "Hellix-Regular" }}>
              {" "}
              ({userData ? userData.location : "not known"} )
            </Text>
          </Text>
          <FontAwesome name="map-marker" size={24} color="#C4C4C4" />
        </View>
        <List text1="Distance" text2="50km" />
        {/* meter */}
        {/* <View
          style={{
            position: "relative",
            height: 6,
            marginTop: 20,
            backgroundColor: "lightgray",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: 0,
              width: "60%",
              height: 6,
              backgroundColor: COLORS.primary,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 34,
                width: 34,
                borderRadius: 17,
                backgroundColor: COLORS.primary,
              }}
            />
          </View>
        </View> */}
        {/* <Slider
          thumbTintColor={COLORS.primary}
          style={{ width: "100%", height: 40 }}
          minimumValue={30}
          value={30}
          maximumValue={100}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor="#000000"
        /> */}
        <Slider min={0} max={100} value={value} onChange={(v) => setValue(v)} />
        {/* end meter */}
        <List text1="Age Range" text2="2-6" />

        <RangeSlider
          min={0}
          max={6}
          step={1}
          defaultValue={[2, 6]}
          // onChange={(v: number[]) => setValues(v)}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});
