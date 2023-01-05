import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState ,useEffect} from "react";
import { COLORS, hp, Styles, wp } from "../theme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";

import useStore from "./store/store";
import { db } from "../firebaseconfig";
import { doc,arrayUnion, getDoc,updateDoc ,onSnapshot, getDocs, setDoc, serverTimestamp, increment} from "firebase/firestore";
import Spinners from "../components/spinner";


const Dot = ({ active }) => {
  return (
    <View
      style={{
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: "white",
        opacity: active ? 1 : 0.5,
      }}
    ></View>
  );
};

const Icon = ({ size, color, icon ,onClick}) => {
  return (
    <TouchableOpacity
    onPress={onClick}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

const Info = ({ navigation }) => {
  const [userdata, setUserData] = useState(null);
  const personinfo = useStore((state) => state.personinfo);
  const [images,setImage] = useState([]);
  const addfav = useStore((state) => state.addfav);
  const favourite = useStore((state) => state.favourite);
  const userinfo = useStore((state) => state.userinfo);
  const addlike = useStore((state) => state.addlike);
  const likes = useStore((state) => state.likes);
  const remove = useStore((state) => state.removeMatch);
  const userdetails = useStore((state) => state.userdetails);
  const [loading, setLoading] = useState(false);


  const getUser = async() => {
    const docRef = onSnapshot(doc(db, "users", personinfo),(documentSnapshot) => {
      console.log("Current data: ", documentSnapshot.data());

      setUserData(documentSnapshot.data());
      setImage([...images,documentSnapshot.data().image2,documentSnapshot.data().image3,documentSnapshot.data().image4,documentSnapshot.data().image5,documentSnapshot.data().image6])


  })
}
const favourites = async() =>{
  
    setLoading(true)

  //update user information


const upRef = doc(db, "users", userdetails.user.uid)
await updateDoc(upRef, {

  favourites: arrayUnion(personinfo)

})
.then(() => {
  console.log('User Updated!');
  remove(personinfo);
  setLoading(false)
  navigation.goBack()
}).catch(()=>{
  alert('no internet access')
})
}

const like = async() =>{

  setLoading(true)
  //update user information


const upRefs = doc(db, "users", personinfo )
await updateDoc(upRefs, {

  likes: arrayUnion(userdetails.user.uid)
  

})
.then(() => {

  console.log('User Updated like!');
  remove(personinfo);
  setLoading(false)
  navigation.goBack()

}).catch(()=>{
  alert('no internet access')
})
  
}
const cancel = async() => {
  console.log("remived")
  remove(personinfo)
  navigation.goBack()
  
}

const addchat = async () => {
  setLoading(true)
  //xheck wheher the group 
  console.log("pressed")
  const combinedId = userdetails.user.uid > personinfo 
  ? userdetails.user.uid + personinfo 
  : personinfo + userdetails.user.uid;
  console.log(combinedId);
  
  try {
    const res = await getDoc(doc(db,"chats",combinedId));
    console.log(res.exists())
    if(!res.exists()){
      //create a chat in chats collection
      await setDoc(doc(db,"chats",combinedId),{messages:[]} )
      await updateDoc(doc(db,"userchat",userdetails.user.uid),{
        [combinedId+".userinfo"]: {
          uid:userdata.id,
          username: userdata.username,
          image: userdata.image1 

        },
        [combinedId + ".seen"]: null,
        [combinedId+".date"]: serverTimestamp()
      });
      await updateDoc(doc(db,"userchat",userdata.id),{
        [combinedId + ".userinfo"]: {
          uid:userdetails.user.uid,
          username: userinfo ? userinfo.username :'',
          image: userinfo? userinfo.image1: ""

        },
        [combinedId + ".seen"]: null,
        [combinedId + ".date"]: serverTimestamp()
      });
      const name = userdata.username
      const pic = userdata.image1
      const chatid = combinedId
      setLoading(false)
      navigation.navigate("chatscreen", { uid: userdata.id, name ,pic,chatid})
      

    }
    const name = userdata.username
    const pic = userdata.image1
    const chatid = combinedId
    setLoading(false)
    navigation.navigate("chatscreen", { uid: userdata.id, name,pic,chatid})
    
  }
  catch(err){
     console.log(err)
  }
};
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <ImageBackground
          // source={require("../assets/lady2.png")}
          style={{ height: hp("65%"), position: "relative" }}
        >
          <SliderBox
            images={images}
            dotColor={COLORS.primary}
            sliderBoxHeight={hp("65%")}
            dotStyle={{
              width: 7,
              height: 7,
              borderRadius: 3.5,
              backgroundColor: "white",
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#FFFFFF91",
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              marginTop: hp("5%"),
              marginLeft: 20,
            }}
          >
            <AntDesign name="close" size={17} color="black" />
          </TouchableOpacity>
          {loading && 
      <Spinners/>
      }
          <View
            style={{
              height: 50,
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <View style={{ width: 58 }} />
            {/* <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "17%",
              }}
            >
              <Dot active={true} />
              <Dot active={false} />
              <Dot active={false} />
              <Dot active={false} />
              <Dot active={false} />
            </View> */}
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFFCC",
                width: 58,
                height: 58,
                marginBottom: 40,
                borderRadius: 29,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => addchat()}
            >
              <Entypo name="chat" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: COLORS.primary,
              width: wp("28.2%"),
              height: 24,
              alignItems: "center",
              justifyContent: "center",
              borderBottomEndRadius: 7,
              borderBottomLeftRadius: 7,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "Hellix-Regular",
                fontSize: 11,
              }}
            >
              78% Match
            </Text>
          </View>
        </View>
        {/* end of match stat */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "7%",
            paddingVertical: 10,
            borderBottomColor: "#0000000A",
            borderBottomWidth: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={[Styles.HeaderText, { fontSize: 28 }]}>
              {userdata ? userdata.name : "N/a"} ({userdata ? userdata.age : 'N/a'})
            </Text>
            <Text style={[Styles.normalText]}>{userdata ? userdata.location : 'N/a'} ( 54 km )</Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              borderRadius: 20,
              height: 40,
              backgroundColor: "#E5E5E58F",
            }}
          >
            <Entypo name="dots-three-vertical" size={20} color="#00000033" />
          </TouchableOpacity>
        </View>
        {/* about */}
        <View style={{ paddingHorizontal: "7%", paddingTop: 7 }}>
          <Text style={Styles.HeaderText}>About</Text>
          <Text style={[Styles.normalText, { fontSize: 14, lineHeight: 17 }]}>
          {userdata ? userdata.bio : 'N/a'}
          </Text>
          {/* <TouchableOpacity>
            <Text
              style={[
                Styles.normalText,
                { color: COLORS.primary, fontFamily: "Hellix-Bold" },
              ]}
            >
              Show More
            </Text>
          </TouchableOpacity> */}
          {/* infomation */}
          <Text style={[Styles.HeaderText, { marginTop: 6, marginBottom: 10 }]}>
            Basic Information
          </Text>
          <Text style={[Styles.HeaderText, { fontSize: 15, marginTop: 10 }]}>
            Gender:{" "}
            <Text style={{ fontWeight: "normal", color: "gray" }}>{userdata ? userdata.gender : 'N/a'}</Text>
          </Text>
          <Text style={[Styles.HeaderText, { fontSize: 15, marginTop: 10 }]}>
            Looking For:{" "}
            <Text style={{ fontWeight: "normal", color: "gray" }}>{userdata ? userdata.lookingfor : 'N/a'}</Text>
          </Text>
          <Text style={[Styles.HeaderText, { fontSize: 15, marginTop: 10 }]}>
            Age:{" "}
            <Text style={{ fontWeight: "normal", color: "gray" }}>
            {userdata ? userdata.age : 'N/a'} Years old
            </Text>
          </Text>
          {/* btns */}
        </View>

        {/* end about */}
        <View
          style={{
            marginTop: 30,
            height: 108,
            backgroundColor: COLORS.primary,
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
            onClick={() => navigation.goBack()}
          />
          <Icon
            size={71}
            color="#FFFFFF"
            icon={<AntDesign name="heart" size={31} color="#DD88CF" />}
            onClick={() => {
              // put your function here
              like();
            }}
          />
            <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            size={51}
            color="#FFFFFF5E"
            icon={<AntDesign name="star" size={20} color="white" />}
            onClick={() => {
              // put your function here
              favourites();
            }}
          />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Info;

const styles = StyleSheet.create({});
