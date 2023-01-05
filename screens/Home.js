import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Frndr from "../assets/Frnd.svg";
import MyStory from "../assets/MyStory.svg";

import { Feather, EvilIcons } from "@expo/vector-icons";
import { COLORS, hp, wp } from "../theme";

import SwipeCards from "react-native-swipe-cards";
import Cardx from "../components/Cardx";
import { NoMoreCards } from "../components/SwipeCards";
import { db } from "../firebaseconfig";
import { doc,updateDoc ,onSnapshot, arrayUnion, getDoc,increment} from "firebase/firestore";
import useStore from "./store/store";


const Home = ({ navigation }) => {
  const userdetails = useStore((state) => state.userdetails);
  const addmatch = useStore((state) => state.addmatch);
  const matches = useStore((state) => state.matches);
  const [data, setData] = useState([]);
  const renderItem = (item) => {};
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState("--");
  const remove = useStore((state) => state.removeMatch);
  const [image,setImage] = useState([]);
  
  // async function obtaindata(){
  //   const ref =  collection(db,"users")
  //   onSnapshot(ref,(users)=> 
  //   addmatch(users.docs.map((user) =>({
  //     id:user.id,
  //     image: user.data().image1
  //   })))
  //   );

  // }
  const getUser = async() => {
    const docRef = onSnapshot(doc(db, "users", userdetails.user.uid),(documentSnapshot) => {
      console.log("Current data: ", documentSnapshot.data());

      return(documentSnapshot.data().status);
    

  })
}

 

  // const removeCard = (id) => {
  //   // alert(id);
  //   sampleCardArray.splice(
  //     sampleCardArray.findIndex((item) => item.id == id),
  //     1
  //   );
  //   setSampleCardArray(sampleCardArray);
  //   if (sampleCardArray.length == 0) {
  //     setNoMoreCard(true);
  //   }
  //   console.log("length: ", sampleCardArray.length);
  // };

  // const lastSwipedDirection = (swipeDirection) => {
  //   setSwipeDirection(swipeDirection);
  // };

  const cardlike = (data) =>{
  

  //update user information
  const docRef = doc(db, "users", data.id);
  getDoc(docRef)
  .then((doc)=>{
    const total = doc.data().totallike
    console.log('jjjjjjj',total)
    updatecard(data,total)
    remove(data.id)
  })



  }
  const updatecard = async (data,total) =>{
    const totals = total +1
  
    const upRef = doc(db, "users", data.id)
    await updateDoc(upRef, {
      totallike: totals,
      likes: arrayUnion(userdetails.user.uid),

    })
    .then(() => {
      console.log('User Updated like!');

    }).catch(()=>{
      alert('no internet access')
    })

        
      }
  const cardcancel = async(data) =>{
    remove(data.id)
    
  }
  const updatestatus = async (chatid,userid) =>{
    await updateDoc(doc(db,"userchat",userid),{
       
      [chatid + ".status"]:true
    });
    console.log("gggfgffdfdfdfdf",chatid)
  }
  const setstatus = async() =>{

    const unsub = onSnapshot(doc(db,"userchat",userdetails.user.uid),(docs) =>{
      console.log("gggfgffdfdfdfdf")
      Object.entries(docs.data()).map((chats) =>{
        const chatid = chats[0]
        const userid =chats[1].userinfo.uid
        updatestatus(chatid,userid)

      })


    });
  }
  useEffect(() => {

  setstatus()
    console.log("Updated");
    console.log(matches)
  }, [matches]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          marginTop: 10,
        }}
      >
        <Frndr />
        <TouchableOpacity style={{ padding: 5 }}>
          <Feather name="bell" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
      <View style={{ height: 100, paddingLeft: 15, marginTop: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={{ marginRight: wp("2.46%"), height: 70 }}>
          {/* <Image
            source={{uri:image}}
            style={{
              height: "80%",
              
              width: wp("13%"),
              borderRadius: 12.5,
            }}
          />    */}
          </TouchableOpacity>
          {/* <UserStory name={"Selena"} photo={require(`../assets/${1}.jpg`)} />
          <UserStory name={"Clara"} photo={require(`../assets/${2}.jpg`)} />
          <UserStory name={"Fabian"} photo={require(`../assets/${3}.jpg`)} />
          <UserStory name={"George"} photo={require(`../assets/${4}.jpg`)} />
          <UserStory name={"Selena"} photo={require(`../assets/${1}.jpg`)} /> */}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            height: hp("6%"),
            backgroundColor: "#F8E7F6",
            marginHorizontal: 15,
            borderRadius: hp("3%"),
            flexDirection: "row",
            marginTop: 5,
            // width: "100%",
            padding: hp("0.44"),
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "50%",
              borderRadius: hp("3%"),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: hp("5.22%"),
            }}
          >
            <Text
              style={{
                fontFamily: "Hellix-Regular",
                textAlign: "center",
                color: COLORS.primary,
                fontWeight: "bold",
              }}
            >
              Make Friends
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "50%",
              borderRadius: hp("3%"),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: hp("5.22%"),
            }}
          >
            <Text
              style={{
                fontFamily: "Hellix-Regular",
                textAlign: "center",
                color: COLORS.primary,
                fontWeight: "400",
                marginBottom: 2,
              }}
            >
              Search Partners
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            width: "100%",
            height: "90%",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* cards */}
          <SwipeCards
            cards={matches ? matches : []}
            renderCard={(cardData) => (
              <Cardx {...cardData} navigation={navigation} />
            )}
            renderNoMoreCards={() => <NoMoreCards />}
            handleYup={(data) => (cardlike(data))}
            //handleNope={(data) => (cardcancel(data))}
            // handleMaybe={this.handleMaybe}
            // hasMaybeAction
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
