import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { EvilIcons } from "@expo/vector-icons";
import { COLORS, hp, Styles, wp } from "../theme";
import { useState, useEffect } from "react";
import useStore from "./store/store";
import { db } from "../firebaseconfig";
import { doc, getDoc,updateDoc ,collection, getDocs,query,onSnapshot,where, arrayUnion} from "firebase/firestore";


const Prfl = ({ name, pic, address ,navigation,key,id}) => {
  const choice = false
  const handlesubmit = () =>{
    navigation.navigate("favouriteinfo", { uid: id,choice})
  };
  return (
    <TouchableOpacity
      style={{ height: hp("31.5%"), width: wp("40.2"), marginTop: 20 }}
      onPress={handlesubmit}  
      key={key}
    >
      <ImageBackground
        resizeMode="cover"
        source={{ uri: pic }}
        style={{
          height: hp("31.5%"),
          width: wp("40.2"),
          // marginTop: 20,
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: "70%",
            height: 20,
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            marginLeft: "15%",
            zIndex: 30,
          }}
        >
          <Text style={[Styles.HeaderText, { fontSize: 12, color: "white" }]}>
            75% Match
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            width: "100%",
            backgroundColor: "black",
            height: "100%",
            top: 0,
            left: 0,
            borderRadius: 13,
            opacity: 0.35,
          }}
        />
        {/* Texts */}
        <View
          style={{
            height: 40,
            width: "100%",
            position: "absolute",
            bottom: 0,
            zIndex: 20,
            paddingHorizontal: 10,
          }}
        >
          <Text style={[Styles.HeaderText, { fontSize: 13, color: "white" }]}>
            {name}
          </Text>
          <Text style={[Styles.normalText, { fontSize: 11, color: "white" }]}>
            {address}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Star = ({navigation}) => {
  const [userdata, setUserData] = useState([]);
  const userdetails = useStore((state) => state.userdetails);


useEffect(() => {

  const getUser = () => {

    const unsubs = onSnapshot(doc(db, "users", userdetails.user.uid),(documentSnapshot) => {
      // console.log("Current data: ", documentSnapshot.data());
      var fav = documentSnapshot.data().favourites
      fav.map((dat)=>{

          const docRe = onSnapshot(doc(db, "users", dat),(docum) => {
            
            setUserData(current => [...current,{id: docum.id,photo: docum.data().image1,name: docum.data().name,address: docum.data().location}])
          })
        
      })
    

  });
  return () => {
    unsubs();
  }

};
getUser()
}, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Text style={Styles.HeaderText}>Favourites</Text>
        <TouchableOpacity>
          <EvilIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
              paddingHorizontal: 10,
            }}
          >
            {userdata.map((card) => (
              <Prfl
                id = {card.id}
                key={card.id}
                navigation={navigation}
                pic={card.photo}
                name={card.name}
                address={card.address}
              
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Star;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: wp("7.7%"),
    justifyContent: "space-between",
  },
});