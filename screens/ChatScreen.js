import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Ionicons, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { COLORS, Styles ,wp} from "../theme";
import Lock from "../assets/lock.svg";
import Send from "../assets/plus.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect } from "react";
import { Snapshot } from "recoil";
import { arrayUnion, onSnapshot, serverTimestamp, Timestamp, updateDoc,increment } from "firebase/firestore";
import useStore from "./store/store";
import "react-native-get-random-values";
import {v4 as uuid} from "uuid";
import { db } from "../firebaseconfig";
import { doc, getDoc,collection, getDocs,query,where} from "firebase/firestore";

const Message = ({ type, text,date,id }) => {
  const userdetails = useStore((state) => state.userdetails); 
  return (
    <View
      style={{
        marginBottom: 10,
        padding: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: type === userdetails.user.uid ? "flex-end" : "flex-start",
      }}
      key={id}
    >
      {/* message component */}
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 7,
          backgroundColor: type === userdetails.user.uid  ? COLORS.primary : "#E9E9E9",
          width: "60%",
          height: 40,
          borderRadius: 10,
          borderBottomEndRadius: type === userdetails.user.uid  ? 0 : 10,
          borderBottomStartRadius: type === userdetails.user.uid  ? 10 : 0,
        }}
  
      >
        <Text
          style={{
            fontFamily: "Hellix-Regular",
            fontSize: 14,
            color: type === userdetails.user.uid  ? "white" : "black",
          }}
        >
          {text}
        </Text>
        <Text
          style={{
            fontFamily: "Hellix-Regular",
            fontSize: 10,
            textAlign: "right",
            color: type === userdetails.user.uid  ? "lightgray" : "gray",
          }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

const ChatScreen = ({ navigation, route }) => {
  const [messages,setMessage] = useState([])
  const userdetails = useStore((state) => state.userdetails);  
  const [Texts,setText] = useState("");
  const [status,setStat] = useState(false);
  const [img,setImg] = useState(null);
  const bottomSheetRef = useRef();
  const handleClosePress = () => bottomSheetRef.current.close();
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const { pic, name, message ,uid,chatid} = route.params;
  console.log(route);

  const handlesend = async () => {
    if (img){

    }
    else{
      await updateDoc(doc(db,"chats",chatid),{
        messages: arrayUnion({
          id: uuid(),
          Texts,
          senderId: userdetails.user.uid,
          date: Timestamp.now()
        })

        });
      }
      await updateDoc(doc(db,"userchat",userdetails.user.uid),{
        [chatid + ".lastMessage"]:{
          Texts
        },
        [chatid + ".date"]: serverTimestamp()
      });
      await updateDoc(doc(db,"userchat",uid),{
        [chatid + ".lastMessage"]:{
          Texts
        },
        [chatid + ".seen"]: increment(1),
        [chatid + ".date"]: serverTimestamp()
      });
        setText("")
      
  }
  const getstats = () =>{
    const unsub = onSnapshot(doc(db,"userchat",userdetails.user.uid),(docs) =>{
      console.log("gggfgffdfdfdfdf")
      Object.entries(docs.data()).map((chats) =>{
        const chatids = chats[0]
        if (chatid===chatids){
          setStat(chats[1].status)
        }

      })


    });
  }

  useEffect(async ()=>{
    await updateDoc(doc(db,"userchat",userdetails.user.uid),{
      [chatid + ".seen"]: null
    });
    getstats()
    
    const unsub = onSnapshot(doc(db,"chats",chatid),(doc)=>{
      
      doc.exists() && setMessage(doc.data().messages)
    })
    return ()=>{
      unsub()
    }
  },[chatid,pic,name,uid])

  return (
    <View style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo name="chevron-left" size={30} color="black" />
          <View style={{ position: "relative" }}>
            <View
              style={{
                backgroundColor: status ? "green": "red",
                width: 10,
                height: 10,
                borderRadius: 5,
                position: "absolute",
                right: -6,
                marginTop: 26
              }}
            />
            <Image
              source={{uri:pic}}
              style={{ marginLeft: 5,
                height: 35,
                
                width: 40,
                borderRadius: 10,
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ paddingLeft: 10 }}>
          <Text style={[Styles.HeaderText, { fontSize: 15 }]}>{name}</Text>
          <Text style={[Styles.normalText, { fontSize: 13 }]}>{status ? "Online" : "offline"}</Text>
        </View>
      </View>
      {/* alert message */}
      <View
        style={{
          backgroundColor: "#EBEBEB63",
          borderRadius: 5,
          marginHorizontal: "5%",
          flexDirection: "row",
          justifyContent: "center",
          padding: 5,
        }}
      >
        <View style={{ marginRight: -5, marginTop: 5 }}>
          <Lock />
        </View>
        <Text
          style={{
            fontFamily: "Hellix-Regular",
            fontSize: 13,
            textAlign: "center",
            marginHorizontal: 15,
            color: "#0000008C",
          }}
        >
          Messages are end-to-end encrypted. No one outside of this chat, not
          even TLC, can read or listen to them.
        </Text>
      </View>
      {/* end alert message */}
      {/* <KeyboardAwareScrollView enableOnAndroid={true}> */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        {messages.map((m)=>{
          return(
        <Message type={m.senderId} id={m.id} text={m.Texts} date={new Date(m.date.toDate()).toUTCString()}  />
          )
      })}
      </ScrollView>

      {/* form */}
      <View style={styles.form}>
        <TouchableOpacity
          onPress={() => {
            // setIndex(1);
            handleExpandPress();
          }}
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderWidth: 2,
              borderRadius: 5,
              borderBottomLeftRadius: 0,
              borderColor: COLORS.primary,
            }}
          >
            <Entypo name="plus" size={15} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
        <TextInput placeholder="Messsage" style={styles.input} value={Texts} onChangeText={(txt) => setText(txt)}/>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 5,
          }}
        onPress={() => handlesend()}
        >
          <Send />
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 20,
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
          {/* body */}
          <TouchableOpacity style={styles.btn}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 27,
                height: 27,
                borderRadius: 7,
                backgroundColor: COLORS.primary,
              }}
            >
              <Ionicons name="image" size={15} color="white" />
            </View>
            <Text style={[Styles.HeaderText, { marginLeft: 15, fontSize: 15 }]}>
              Send Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 27,
                height: 27,
                borderRadius: 7,
                backgroundColor: "#5FD772",
              }}
            >
              <Ionicons name="play" size={15} color="white" />
            </View>
            <Text style={[Styles.HeaderText, { marginLeft: 15, fontSize: 15 }]}>
              Send Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 27,
                height: 27,
                borderRadius: 7,
                backgroundColor: "#DD88CF",
              }}
            >
              <Ionicons name="md-musical-notes" size={15} color="white" />
            </View>
            <Text style={[Styles.HeaderText, { marginLeft: 15, fontSize: 15 }]}>
              Send Audio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 27,
                height: 27,
                borderRadius: 7,
                backgroundColor: "#4595FF",
              }}
            >
              <FontAwesome name="file" size={13} color="white" />
            </View>
            <Text style={[Styles.HeaderText, { marginLeft: 15, fontSize: 15 }]}>
              Send Document
            </Text>
          </TouchableOpacity>
          {/* end body */}
        </View>
      </BottomSheet>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 25,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.7,
    marginBottom: 10,
  },
  form: {
    backgroundColor: "#F7F7F7",
    height: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "white",
    height: 37,
    flex: 1,
    borderRadius: 18.5,
    paddingHorizontal: 15,
  },
});
