import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import React from "react";

import { EvilIcons } from "@expo/vector-icons";
import { COLORS, Styles ,wp} from "../theme";
import { useEffect } from "react";
import useStore from "./store/store";
import { db } from "../firebaseconfig";
import { doc, getDoc,updateDoc ,collection, getDocs,query,onSnapshot,where} from "firebase/firestore";
import { useState } from "react";

const Online = ({ pic, navigation }) => {
  console.log("work update in system")
  return (
    <TouchableOpacity style={{ marginRight: 15, position: "relative" }}>
      <View
        style={{
          backgroundColor: "green",
          width: 10,
          height: 10,
          borderRadius: 5,
          position: "absolute",
          right: 0,
          zIndex: 40,
          marginTop: 2,
        }}
      />
      <Image source={{uri:pic}} style={{ height: "80%",
              
              width: wp("13%"),
              borderRadius: 11.5,}} />
    </TouchableOpacity>
  );
};

const ChatMessage = ({ pic, name, message, count,key, navigation, id }) => {
  const userdetails = useStore((state)=>state.userdetails);
  const handlesubmit =() =>{
    const chatid = userdetails.user.uid > id ? userdetails.user.uid + id : id + userdetails.user.uid;
    navigation.navigate("chatscreen", { uid: id, name, message ,pic,chatid})

  }

  return (
    <TouchableOpacity
      onPress={() =>
        handlesubmit()
      }
      style={{
        borderBottomColor: "#eee",
        borderBottomWidth: 0.5,
        height: 55,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      key={key}
    >
  <Image
            source={{uri:pic}}
            style={{
              height: "80%",
              
              width: wp("13%"),
              borderRadius: 12.5,
            }}
          />      
          <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={[Styles.HeaderText, { fontSize: 15 }]}>{name}</Text>
        <Text style={[Styles.normalText, { fontSize: 13 }]}>{message}</Text>
      </View>
      {count && (
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 20,
            width: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={[
              Styles.HeaderText,
              { fontSize: 13, color: "white", marginBottom: 3 },
            ]}
          >
            {count}
          </Text>
        </View>

      )}
    </TouchableOpacity>
  );
};

const Chat = ({ navigation }) => {
  const userdetails = useStore((state)=>state.userdetails);
  const [chatting,setChat] = useState([]);
  const [status,setstatus] = useState(null);
  const [showSearchInputField, hideInput] = useState(false);

  const searching = () => {
    // this is where searching take place
  };
  // const getstatus = (iden) =>{
  //   const docRef = doc(db, "users", iden);
  //   const docSnaps = getDoc(docRef)
  //   console.log(iden,docSnaps.data().status)
  //   return(docSnaps.data().status)
  // }
useEffect(() => {
  console.log("jjhghgfgf",userdetails.user.uid)
  const getchats = () =>{
    const unsub = onSnapshot(doc(db,"userchat",userdetails.user.uid),(docs) =>{
      setChat(docs.data())

    });
    return () => {
      unsub();
    }
};
userdetails.user.uid && getchats() 
},[])

  return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
      {showSearchInputField && (
          <TextInput
            placeholder="Search..."
            onChangeText={(text) => searching(text)}
            onBlur={() => hideInput(false)}
            style={{
              backgroundColor: "whitesmoke",
              flex: 1,
              paddingHorizontal: 10,
              height: 30,
            }}
          />
        )}
        {!showSearchInputField && (
          <Text style={Styles.HeaderText}>Messages</Text>
        )}
        <TouchableOpacity
          style={{ paddingLeft: 20 }}
          onPress={() => hideInput(true)}
        >
          <EvilIcons name="search" size={27} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 15 }}>
        <Text style={[Styles.HeaderText, { fontSize: 16, fontWeight: "400" }]}>
          Online
        </Text>
        <View
          style={{
            height: 60,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            paddingTop: 5,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { Object.entries(chatting).map((chats) =>{
       console.log(chats[1].status)
                  return ((chats[1].status)&&( 
                    <Online   pic={chats[1].userinfo.image}/>)
                  )
    
          
          })}
            {/* <Online pic={require(`../assets/users/1.png`)} />
            <Online pic={require(`../assets/users/5.png`)} />
            <Online pic={require(`../assets/users/2.png`)} />
            <Online pic={require(`../assets/users/3.png`)} />
            <Online pic={require(`../assets/users/4.png`)} />
            <Online pic={require(`../assets/users/1.png`)} />
            <Online pic={require(`../assets/users/5.png`)} />
            <Online pic={require(`../assets/users/2.png`)} />
            <Online pic={require(`../assets/users/3.png`)} />
            <Online pic={require(`../assets/users/4.png`)} /> */}
          </ScrollView>
        </View>
        <Text
          style={[
            Styles.HeaderText,
            {
              fontSize: 16,
              fontWeight: "400",
              marginTop: 10,
              marginBottom: -10,
            },
          ]}
        >
          My Chats
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            height: "100%",
            width: "100%",
            paddingHorizontal: 15,
          }}
        >
          
          { Object.entries(chatting)?.sort((a,b) => b[1].date - a[1].date).map((chats) =>{
            return(
          <ChatMessage
              key={chats[0]}
            navigation={navigation}
            message={chats[1].lastMessage?.Texts}
            name={chats[1].userinfo.username}
            count={chats[1].seen}
            id={chats[1].userinfo.uid}
            pic={chats[1].userinfo.image}
          />
            )
          })}
            {/* <ChatMessage
            navigation={navigation}
            message="Hello there"
            name="Jeff Charles"
            count={3}
            img={1}
            pic={require(`../assets/users/5.png`)}
          /> */}
        </ScrollView>
      </View>
      {/*  */}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});
