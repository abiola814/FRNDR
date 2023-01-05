import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BigButton from "../components/BigButton";
import React, { useCallback, useMemo, useRef } from "react";
import { COLORS, Styles, wp } from "../theme";
import { EvilIcons } from "@expo/vector-icons";
import { Feather, AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import One from "../assets/One.svg";
import Two from "../assets/Two.svg";
import Three from "../assets/Three.svg";
import Four from "../assets/Four.svg";
import Five from "../assets/Five.svg";
import userData from "../recoil/userData";
import { useRecoilState } from "recoil";
import BottomSheet from "@gorhom/bottom-sheet";
import Out from "../assets/Out.svg";
import { useState,useEffect } from "react";
import { db, Logout } from "../firebaseconfig";
import { doc, getDoc,updateDoc ,onSnapshot} from "firebase/firestore";



import useStore from "./store/store";

export const IntSkills = ({inte}) => {

  return (
    <View
      style={{
        display: "flex",
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        flexShrink: 1,
        // justifyContent: "space-between",
      }}
    >
      { inte.map((n) =>
      ( (n==="Nature") &&
        <TouchableOpacity>
        <One style={{ marginLeft: 10 }} width={wp("24%")}   key={1}/>
      </TouchableOpacity>
      )
      )}
     { inte.map((n) =>
      ((n==="Writing") &&
      <TouchableOpacity>
      <Three style={{ marginLeft: 10 }} width={wp("24%")}   key={2}/>
    </TouchableOpacity>)
     )}

{ inte.map((n) =>
    (  (n==="Photography") &&  <TouchableOpacity>
      <Two style={{ marginLeft: 10 }} width={wp("34%")}   key={3} />
    </TouchableOpacity>)
     )}
    { inte.map((n) =>(
      (n==="Language") &&
      <TouchableOpacity>
        <Four style={{ marginLeft: 10 }} width={wp("29%")}   key={4} />
      </TouchableOpacity>
    ))}
    { inte.map((n) =>
    (
      (n==="Football") &&
      <TouchableOpacity>
        <Five style={{ marginLeft: 10 }}   key={5} width={wp("25%")} />
      </TouchableOpacity>
    ) )}

     
    </View>
  );
};

const MenuItem = ({ icon, color, text, navigation, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        height: 50,
        borderColor: "lightgray",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 15,
      }}
    >
      <View
        style={{
          width: 27,
          height: 27,
          backgroundColor: color,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          marginLeft: 20,
          fontFamily: "Hellix-Regular",
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Profile = ({ navigation }) => {
  const [interest,setInterest] =useState([])
  const [userdata, setUserData] = useState(null);
  const userdetails = useStore((state) => state.userdetails);
  const removeuser = useStore((state) => state.removeuser);``
  const adduserinfo = useStore((state) => state.adduserinfo)
  const setUsers = useStore(state => state.setUser);

  const getUser = async() => {
    const docRef = onSnapshot(doc(db, "users", userdetails.user.uid),(documentSnapshot) => {
      console.log("Current data: ", documentSnapshot.data());
      adduserinfo(documentSnapshot.data())
      setUserData(documentSnapshot.data());
      setInterest([...interest,documentSnapshot.data().favourite1,documentSnapshot.data().favourite2,documentSnapshot.data().favourite3,documentSnapshot.data().favourite4,documentSnapshot.data().favourite5])


  })
}
    
  //   const docSnap = await getDoc(docRef)
  //   .then((documentSnapshot) => {
  //     if( documentSnapshot.exists ) {
  //       console.log('User Data', documentSnapshot.data());
  
  //       setUserData(documentSnapshot.data());
  //       setInterest([...interest,documentSnapshot.data().favourite1,documentSnapshot.data().favourite2,documentSnapshot.data().favourite3,documentSnapshot.data().favourite4,documentSnapshot.data().favourite5])

  //     }
  //   })
  // };
  const updatestatus = async (chatid,userid) =>{
    await updateDoc(doc(db,"userchat",userid),{
       
      [chatid + ".status"]:false
    });
    console.log("gggfgffdfdfdfdf",chatid)
  }

  const logout = async() =>{

    const unsub = onSnapshot(doc(db,"userchat",userdetails.user.uid),(docs) =>{
      console.log("gggfgffdfdfdfdf")
      Object.entries(docs.data()).map((chats) =>{
        const chatid = chats[0]
        const userid =chats[1].userinfo.uid
        updatestatus(chatid,userid)

      })


    });
    setUsers(null)
    removeuser()
  }
  useEffect(() => {
    getUser();
  }, []);

  const bottomSheetRef = useRef();
  const handleClosePress = () => bottomSheetRef.current.close();
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const [user_data, setUser] = useRecoilState(userData);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Text style={Styles.HeaderText}>Profile</Text>
      </View>
      {/* end header */}
      {/* <John /> */}
      <View style={styles.dp}>
        <View
          style={{
            height: 70,
            width: 70,
            borderColor: COLORS.primary,
            borderWidth: 3,
            borderRadius: 35,
            padding: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{uri: userdata ? userdata.image1 || 'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png' : 'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png'}}
            style={{
              height: "80%",
              width: "80%",
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            height: 25,
            width: wp("33%"),
            borderRadius: 12.5,
            marginTop: -5,
          }}
        >
          <Text
            style={{ color: "white", fontFamily: "Hellix-Bold", fontSize: 12 }}
          >
               {userdata ? userdata.completed + "%" : "0%"} Completed
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text
              style={[
                Styles.HeaderText,
                { textAlign: "center", fontSize: 15, marginTop: 3 },
              ]}
            >
              {userdata ? userdata.name : ""} 
            </Text>
            <Text
              style={[Styles.normalText, { textAlign: "center", fontSize: 11 }]}
            >
              {userdata ? "@" + userdata.username : ""} 
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("profile_settings")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#CCCCCC99",
              width: 30,
              height: 30,
              borderRadius: 15,
              marginLeft: 10,
              marginTop: 3,
            }}
          >
            <Ionicons name="pencil" size={12} color="black" />
          </TouchableOpacity> 
        </View> 
      </View>
      {/*  */}
      <View style={{ padding: 15 }}>
        <Text style={[Styles.HeaderText, { fontSize: 15 }]}>Bio</Text>
        <Text
          style={[
            Styles.HeaderText,
            { fontSize: 15, lineHeight: 22, fontFamily: "Hellix-Regular" },
          ]}
        >
         {userdata ? userdata.bio : ""} 
        </Text>
        <Text style={[Styles.HeaderText, { fontSize: 15, marginTop: 10 }]}>
          Gender:{" "}
          <Text style={{ fontWeight: "normal", color: "gray" }}>{userdata ? userdata.gender : ""} </Text>
        </Text>
        <Text style={[Styles.HeaderText, { fontSize: 15, marginTop: 10 }]}>
          Looking For:{" "}
          <Text style={{ fontWeight: "normal", color: "gray" }}>{userdata ? userdata.lookingfor : ""} </Text>
        </Text>
        <Text style={[Styles.HeaderText, { fontSize: 15, marginTop: 10 }]}>
          Age:{" "}
          <Text style={{ fontWeight: "normal", color: "gray" }}>
            {userdata ? userdata.age : ""} 
          </Text>
        </Text>
        <Text style={[Styles.HeaderText, { fontSize: 15, marginTop: 20 }]}>
          Interest
        </Text>
        {/* interest */}
        <IntSkills inte={interest} /> 
        {/* end interest */}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: "10%",
          marginBottom: 15,
        }}
      >
        <View>
          <Text style={[Styles.HeaderText, { textAlign: "center" }]}>0</Text>
          <Text style={{ textAlign: "center", fontSize: 11 }}>Visitors</Text>
        </View>
        <View>
          <Text style={[Styles.HeaderText, { textAlign: "center" }]}>{userdata ? userdata.totallike : "n/a"} </Text>
          <Text style={{ textAlign: "center", fontSize: 11 }}>Likes</Text>
        </View>
        <View>
          <Text style={[Styles.HeaderText, { textAlign: "center" }]}>0</Text>
          <Text style={{ textAlign: "center", fontSize: 11 }}>Matches</Text>
        </View>
      </View>

      <MenuItem
        text={"FRNDR Premium"}
        color={COLORS.primary}
        icon={<FontAwesome5 name="crown" size={12} color="white" />}
        navigation={navigation}
      />
      <MenuItem
        text={"Settings"}
        color={"#54B7A6"}
        navigation={navigation}
        onClick={() => navigation.navigate("settings")}
        icon={<AntDesign name="setting" size={15} color="white" />}
      />
      <MenuItem
        text={"Sign Out"}
        color={"#ED4C5C"}
        navigation={navigation}
        icon={<Feather name="log-out" size={12} color="white" />}
        onClick={handleExpandPress}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
 
        // onChange={handleSheetChanges}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 20,
              paddingVertical:-40
            }}
          >
            <TouchableOpacity
              onPress={() => handleClosePress()}
              style={{
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 35,
         

            }}
          >
            <Out />
            <Text style={[Styles.HeaderText, { fontSize: 17, marginTop: 10 }]}>
              Are you sure?
            </Text>
            <Text
              style={[
                Styles.normalText,
                {
                  fontSize: 17,
                  marginTop: 10,
                  textAlign: "center",
                  width: "80%",
                  lineHeight: 20,
              
                },
              ]}
            >
              Do you want to sign out from the account?
            </Text>
            <BigButton
              text="Yes, sure"
              type="normal"
              onClick={() => logout()}
              style={{
              
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  dp: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});


