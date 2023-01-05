import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { wp } from "../theme";
import Icon from "./Icon";
import { Feather, AntDesign } from "@expo/vector-icons";
import useStore from "../screens/store/store";
import { db,storage } from "../firebaseconfig";
import { useState } from "react";
import { doc,arrayUnion, getDoc,updateDoc ,onSnapshot, increment} from "firebase/firestore";

// https://fireship.io/lessons/firestore-array-queries-guide/

const Cardx = (props) => {
  const addinfo = useStore((state) => state.addinfo);

  const remove = useStore((state) => state.removeMatch);
  const userdetails = useStore((state) => state.userdetails);
  const [favinfo,setFavinfo] = useState([])
  
const updatelikes = async(data)=>{
  const upRef = doc(db, "users", data.id)
  const n= 1
    await updateDoc(upRef, {
   
      likes: arrayUnion(userdetails.user.uid),
    
      
    
    })
    .then(() => {
      console.log('User Updated!');
     
    }).catch(()=>{
      alert('no internet access')
    });
}
  const info = (data) =>{
    addinfo(data.id)
    data.navigation.navigate("info")
  }

const like = (data) =>{
    
    updatelikes(data)
 
    remove(data.id)
    };
   
  const favourites = async(data) =>{
  
    

    //update user information

  
  const upRef = doc(db, "users", userdetails.user.uid)
  await updateDoc(upRef, {
 
    favourites: arrayUnion(data.id)
  
  })
  .then(() => {
    console.log('User Updated!');
  remove(data.id)
   
  }).catch(()=>{
    alert('no internet access')
  });
  remove(data.id)
  };
 
  
  const cancel = async(data) =>{
    remove(data.id)
    
  }
  return (
    <Pressable
      onPress={() => info(props)}
      style={styles.card}
      key={props.id}
    >
      <Image
        resizeMode="cover"
        source={{uri:props.image }}
        style={{ height: "100%", width: "100%", borderRadius: 20 }}
      />
      <View
        style={{
          bottom: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          zIndex: 2,
          opacity: 0.35,
          borderRadius: 20,
        }}
      ></View>
      <View
        style={{
          bottom: 0,
          position: "absolute",
          zIndex: 100,
          height: 108,
          // backgroundColor: COLORS.primary,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingHorizontal: "7%",
        }}
      >
        <Icon
          size={51}
          color="#FFFFFF5E"
          icon={<AntDesign name="close" size={20} color="white" />}
          onPress={() => cancel(props)}

        />
        <Icon
          size={71}
          color="#FFFFFF"
          icon={<AntDesign name="heart" size={31} color="#DD88CF" />}
          onPress={() => like(props)}
          // onPress={() => console.log("pressed")}
        />
        <Icon
          size={51}
          color="#FFFFFF5E"
          icon={<AntDesign name="star" size={20} color="white" />}
          onPress={() => favourites(props)}

        />
      </View>
    </Pressable>
  );
};

export default Cardx;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("90%"),
    height: "100%",
    position: "relative",
  },
  noMoreCardsText: {
    fontSize: 22,
  },
});
