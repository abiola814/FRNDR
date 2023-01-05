import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  View,
} from "react-native";
import { Entypo, AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import Cancel from "../assets/cancel.svg";
import React from "react";
import { hp, Styles,wp} from "../theme";

import BigButton from "../components/BigButton";
import { IntSkills } from "./Profile";
import SelectDropdown from "react-native-select-dropdown";
import { useState,useEffect } from "react";
import { db,storage } from "../firebaseconfig";

import * as ImagePicker from 'expo-image-picker';
import registerData from "../recoil/registerData";
import { doc, getDoc,updateDoc ,collection, getDocs,query,onSnapshot,where} from "firebase/firestore";
import { getStorage, ref,uploadBytes ,getDownloadURL,uploadBytesResumable} from "firebase/storage";


import useStore from "./store/store";


export const DropDown = ({se,data}) => {
  const listData = data

  return (
    <SelectDropdown
      data={listData}
      buttonStyle={styles.input}
      renderDropdownIcon={() => (
        <Entypo name="chevron-down" size={24} color="#555" />
      )}
      dropdownIconPosition="right"
      buttonTextStyle={{ fontSize: 16, marginLeft: -150 }}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        se(index)
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      defaultButtonText={'Select Answer'}
    />
  );
};

export const SEDropDown = ({se,data,name}) => {
  const listData = data

  return (
    <SelectDropdown
      data={listData}
      buttonStyle={styles.inputs}
      
      renderDropdownIcon={() => (
        <Entypo name="chevron-down" size={24} color="#555" />
      )}
      dropdownIconPosition="right"
      buttonTextStyle={{ fontSize: 14, marginLeft: -210 }}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        se(selectedItem)
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      defaultButtonText={name}
    />
  );
};

const Number = ({ num }) => {
  return (
    <View
      style={{
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{num}</Text>
    </View>
  );
};

const ProfileSettings = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

const Questionsdata4=["A fairytale castle","My hometown","A nice suburb","A yurt in Nepal"]
const Questionsdata2=["That's what I live for",
"As long as we're both happy with it",
"As long as we can still have our own time",
"I guess kids can come skydiving if you strap them on safely?"]
const Questionsdata3=["A meal and the opera",
"A stroll and a movie",
"A movie and a meal",
"One which doesn't end for a week"]
const Questionsdata1=["I'm not, I expect them to change to fit to me",
"I want a relationship where neither of us has to change",
"I want us both to be constantly changing and evolving",
"That depends how much they want to do for me"]

const dataGender =["Male","Female"]
const dataStat = ["Yes","No"]
const dataLook = ["Male","Female","Others"]

  // state parameter
let num;
let val;

const [image1,setImage1] = useState(null)
const [image5,setImage5] = useState(null)
const [image4,setImage4] = useState(null)
const [image6,setImage6] = useState(null)
const [image3,setImage3] = useState(null)
const [image2,setImage2] = useState(null)
const [answer1,setAnswer1] = useState(null)
const [answer2,setAnswer2] = useState(null)
const [answer3,setAnswer3] = useState(null)
const [answer4,setAnswer4] = useState(null)
const [gender,setGender] = useState(null)
const [look,setlook] = useState(null)
const [status,setStat] = useState(null)
const [uploading, setUploading] = useState(false);
const [transferred, setTransferred] = useState(0);
const [userData, setUserData] = useState();
const [image, setImage] = useState(null);
const [interest,setInterest] =useState([])
const adduserinfo = useStore((state) => state.adduserinfo)
const userdetails = useStore((state) => state.userdetails);
const addmatch = useStore((state) => state.addmatch);
const matches = useStore((state) => state.matches);
const [total,setTotal] = useState(0)
const [totals,setComple] = useState(null)
/// end of params

// getting user information from fire store
const getUser = async() => {
  const docRef = doc(db, "users", userdetails.user.uid);
  const docSnap = await getDoc(docRef)
  .then((documentSnapshot) => {
    if( documentSnapshot.exists ) {
      console.log('User Data', documentSnapshot.data());
      adduserinfo(documentSnapshot.data())
      setUserData(documentSnapshot.data());
      setInterest([...interest,documentSnapshot.data().favourite1,documentSnapshot.data().favourite2,documentSnapshot.data().favourite3,documentSnapshot.data().favourite4,documentSnapshot.data().favourite5])

      
      console.log("user profile",interest)
    }
  })
};



const calculateprofile =() =>{
  
  if(image1 !== null || userData.image1 !== null){
    count = count + 1
  }
  if(image2 !== null || userData.image2!== null){
     count = count + 1

  }
  if(image3 !== null || userData.image3 !== null){
     count = count + 1

  }
  if(image4 !== null || userData.image4 !== null){
     count = count + 1

  }
  if(image5 !== null || userData.image5!== null){
     count = count + 1

  }
  if(image6 !== null || userData.image6 !== null){
     count = count + 1

  }
  if(answer1 !== null || userData.question1 !== null){
     count = count + 1

  }
  if(answer2 !== null || userData.question2 !== null){
     count = count + 1

  }
  if(answer3 !== null || userData.question3 !== null){
     count = count + 1

  }
  if(answer4 !== null || userData.question4!== null){
     count = count + 1

  }
  if(look !== null || userData.lookingfor !==""){
     count = count + 1

  }
  if(gender !== null || userData.gender !==""){
     count = count + 1

  }
  if(status !== null || userData.dating !==""){
     count = count + 1

  }
  if(userData.age !== ""){
     count = count + 1

  }
  if(userData.name !==""){
     count = count + 1

  }
  if(userData.username !== ""){
     count = count + 1

  }
  setComple((total/17)*100)

}

//update user information

const handleUpdate = async() => {
  setLoading(true)
    let count = 0
  if(image1 !== null || userData.image1 !== null){
    count = count + 1
  }
  if(image2 !== null || userData.image2!== null){
     count = count + 1

  }
  if(image3 !== null || userData.image3 !== null){
     count = count + 1

  }
  if(image4 !== null || userData.image4 !== null){
     count = count + 1

  }
  if(image5 !== null || userData.image5!== null){
     count = count + 1

  }
  if(image6 !== null || userData.image6 !== null){
     count = count + 1

  }
  if(answer1 !== null || userData.question1 !== null){
     count = count + 1

  }
  if(answer2 !== null || userData.question2 !== null){
     count = count + 1

  }
  if(answer3 !== null || userData.question3 !== null){
     count = count + 1

  }
  if(answer4 !== null || userData.question4!== null){
     count = count + 1

  }
  if(look !== null || userData.lookingfor !==""){
     count = count + 1

  }
  if(gender !== null || userData.gender !==""){
     count = count + 1

  }
  if(status !== null || userData.dating !==""){
     count = count + 1

  }
  if(userData.age !== ""){
     count = count + 1

  }
  if(userData.name !==""){
     count = count + 1

  }
  if(userData.username !== ""){
     count = count + 1

  }
  if(userData.bio !== ""){
    count = count + 1

 }
  let totally =Math.round((count/17)*100)
  const ref =  query(collection(db,"users"),where("id", "!=", userdetails.user.uid))
  onSnapshot(ref,(users)=> 
  addmatch(users.docs.map((user) =>({
    id:user.id,
    image: user.data().image1
  })))
  );
  console.log("djjsdhshdddddddddddhdshhdshdsjhs",count)
  const upRef = doc(db, "users", userdetails.user.uid)
  await updateDoc(upRef, {
    name: userData.name ,
    age: userData.age,
    gender: gender ? gender : userData.gender,
    lookingfor: look ? look : userData.lookingfor,
    dating: status ? status : userData.dating,
    bio: userData.bio,
    username:userData.username,
    question1: answer1 ? answer1 : userData.question1,
    question2: answer2 ? answer2 : userData.question2,
    question3: answer3 ? answer3 : userData.question3,
    question4:  answer4 ? answer4 : userData.question4,
    completed: totally
 
    
  
  })
  .then(() => {
    console.log('User Updated!');
    setLoading(false)
    Alert.alert(
      'Profile Updated!',
      'Your profile has been updated successfully.'
    );
    navigation.goBack()

  })
}
const uploadImage = async (val,uploadUri) => {
// let uploadUri
//   if (val === 1){
  

    
//   }
//   else if (val ===2){
//     uploadUri = image2.url;

//   }
//   else if (val ===3){
//     uploadUri = image3.url;

//   }
//   else if (val ===4){
//     uploadUri = image4.url;

//   }
//   else if (val ===5){
//     uploadUri = image5.url;

//   }
//   else if (val ===6){
//     const uploadUri = image6.url;

//   }


  const response = await fetch(uploadUri)
  const blob = await response.blob()
  const filenames = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const storages = getStorage(); 
  const storageRef = ref(storages,filenames);
  

  console.log(filenames)
  await uploadBytes(storageRef, blob)
  await getDownloadURL(storageRef)
     .then((url) => {
       // Insert url into an <img> tag to "download"
       setUploading(false);
       console.log('ooooooo',url)

        const upRef = doc(db, "users", userdetails.user.uid)
        if (val === 1){
          updateDoc(upRef, {
            image1:url
          })
      
          
        }
        else if (val ===2){
          updateDoc(upRef, {
            image2:url
          })
      
        }
        else if (val ===3){
          updateDoc(upRef, {
            image3:url
          })
      
        }
        else if (val ===4){
          updateDoc(upRef, {
            image4:url
          })
      
        }
        else if (val ===5){
          updateDoc(upRef, {
            image5:url
          })
      
        }
        else if (val ===6){
          updateDoc(upRef, {
            image6:url
          })
        }
     })
  
  .catch((e) => {
      console.log(e);
      return null;
    })

  }


  // try {
  

  //   url = await getDownloadURL(task.snapshot.ref)
  //   setUploading(false);
  //   setinfo(null);

  //   // Alert.alert(
  //   //   'Image uploaded!',
  //   //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
  //   // );
  //   return url;

  // } catch (e) {
  //   console.log(e);
  //   return null;
  // }
 


  const pickImage = async (val) =>{

    //no permission needed
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect: [4,3],
      quality:1.
    });
    const source ={url: result.uri}
    console.log(source);
    if (val === 1){
     await setImage1(source)
     uploadImage(val,source.url)
      console.log("image1")
    }
    else if (val ===2){
      await setImage2(source)
      uploadImage(val,source.url)
      console.log("image2")

    }
    else if (val ===3){
      await setImage3(source)
      uploadImage(val,source.url)
      console.log("image3")

    }
    else if (val ===4){
      await setImage4(source)
      uploadImage(val,source.url)
      console.log("image4")

    }
    else if (val ===5){
      await setImage5(source)
      uploadImage(val,source.url)
      console.log("image5")

    }
    else if (val ===6){
      setImage6(source)
      uploadImage(val,source.url)
      console.log("image6")

    }
   
  }

 

  useEffect(() => {
    getUser();
  }, []);



  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}
      >
        <Entypo name="chevron-left" size={25} color="black" />
        <Text style={Styles.HeaderText}>Profile Settings</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", paddingHorizontal: 13 }}>
        <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={() => { pickImage(1)}}>
        <Image
            style={{ width: 219, height: 219 }}
            source={{
              uri:  image1
              ? image1.url
              : userData
              ? userData.image1 ||
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png':
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png'
            }}
          />

          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", right: 5, top: 5 }}>
            <Cancel />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 5, bottom: 5 }}
          >
            <Number num={1} />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={() => {pickImage(2)}}>

          <Image
              style={{ width: 103, height: 103 }}
              source={{
                uri: image2
                ? image2.url
                : userData
                ? userData.image2 ||
                  'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png':
                  'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png'
           ,
              }}
            />
            </TouchableOpacity>
      
        
            <TouchableOpacity
              style={{ position: "absolute", right: 5, top: 5 }}
            >
              <Cancel />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", right: 5, bottom: 5 }}
            >
              <Number num={2} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 10 }} />
          <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={() => {pickImage(3)}}>

          <Image
              style={{ width: 103, height: 103 }}
              source={{
                uri:  image3
                ? image3.url
                : userData
                ? userData.image3 ||
                  'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png':
                  'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png'
           
              }}
            />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", right: 5, top: 5 }}
            >
              <Cancel />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", right: 5, bottom: 5 }}
            >
              <Number num={3} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 13,
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={() => {pickImage(4)}}>

        <Image
            style={{ width: 103, height: 103 }}
            source={{
              uri:  image4
              ? image4.url
              : userData
              ? userData.image4 ||
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png':
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png'
         
            }}
          />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", right: 5, top: 5 }}>
            <Cancel />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 5, bottom: 5 }}
          >
            <Number num={4} />
          </TouchableOpacity>
        </View>
        <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={() => {pickImage(5)}}>

        <Image
            style={{ width: 103, height: 103 }}
            source={{
              uri:  image5
              ? image5.url
              : userData
              ? userData.image5 ||
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png':
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png'
         
            }}
          />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", right: 5, top: 5 }}>
            <Cancel />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 5, bottom: 5 }}
          >
            <Number num={5} />
          </TouchableOpacity>
        </View>
        <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={() => {pickImage(6)}}>
        <Image
            style={{ width: 103, height: 103 }}
            source={{
              uri:  image6
              ? image6.url
              : userData
              ? userData.image6 ||
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png':
                'https://firebasestorage.googleapis.com/v0/b/frndr-10ee0.appspot.com/o/blankimage.png'
         
            }}
          />
          </TouchableOpacity>

          <TouchableOpacity style={{ position: "absolute", right: 5, top: 5 }}>
            <Cancel />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 5, bottom: 5 }}
          >
            <Number num={6} />
          </TouchableOpacity>
        </View>
      </View>
      {/* List */}
      <View
        style={{ paddingHorizontal: 13, paddingTop: 10, paddingBottom: 30 }}
      >
        <Text style={[Styles.normalText, { textTransform: "uppercase" }]}>
          general info
        </Text>
        <TextInput style={styles.input} value={userData ? userData.name : ''} placeholder="John Doe"  onChangeText={(txt) => setUserData({...userData, name: txt})}/>
        <TextInput style={styles.input} value={userData ? userData.username : ''} placeholder="username"  onChangeText={(txt) => setUserData({...userData, username: txt})}/>
        {/* <TextInput style={styles.input} value={userData ? userData.gender : ''} placeholder="gender"  onChangeText={(txt) => setUserData({...userData, gender: txt})} /> */}
        <SEDropDown se={setGender} data={dataGender} name={"    Select Gender"}/>
        <TextInput style={styles.input} value={userData ? userData.age : ''} placeholder="age"  onChangeText={(txt) => setUserData({...userData, age: txt})}/>
        <SEDropDown se={setStat} data={dataStat} name={"    Dating Status"}/>
        <SEDropDown se={setlook} data={dataLook} name={"Looking for"}/>
        <TextInput
          style={styles.input}
          placeholder="type your bio here"
          value={userData ? userData.bio : ''}  onChangeText={(txt) => setUserData({...userData, bio: txt})}
        />
        {/* interst */}
        <Text
          style={[
            Styles.normalText,
            { textTransform: "uppercase", marginTop: 10 },
          ]}
        >
          Interest
        </Text>
          <IntSkills inte={interest}/>
        {/* questions */}
        <Text
          style={[
            Styles.normalText,
            { textTransform: "uppercase", marginVertical: 10 },
          ]}
        >
   
        </Text>
        <Text style={[styles.text, { fontWeight: "400" }]}>1. How much are you prepared to try and change to please a new partner?</Text>
        <DropDown se={setAnswer1} data={Questionsdata1}/>
        <Text style={[styles.text, { fontWeight: "400", marginTop: hp("3%") }]}>
        2.  How do you feel about starting a family?
        </Text>
        <DropDown se={setAnswer2} data={Questionsdata2} />
        {/* <TextInput placeholder="your answer here..." style={styles.input} /> */}
        <Text style={[styles.text, { fontWeight: "400", marginTop: hp("3%") }]}>
        3.  What's your idea of a good couple's night out?
        </Text>
        <DropDown se={setAnswer3} data={Questionsdata3} />
        <Text style={[styles.text, { fontWeight: "400", marginTop: hp("3%") }]}>
      
        4.  When you imagine settling down with a partner, what sort of location are you in?
        </Text>
        <DropDown se={setAnswer4} data={Questionsdata4}/>
        {/* end questions */}
        <View style={{ marginTop: 20 }}>
        {loading ? (
            <ActivityIndicator size={24} color="white"  style={{
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor:"#4B164C",
              width: "90%",
              padding: 5,
              borderRadius: 15,
              height: 40,
            }} />
          ) :
          <BigButton type="normal" text="Save" onClick={handleUpdate}/>
}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F4F4F4",
    marginTop: 10,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "100%",
  },
  inputs: {
    backgroundColor: "#F4F4F4",
    marginTop: 10,
    height: 40,
    borderRadius: 10,
    width: "100%",
  },
});
