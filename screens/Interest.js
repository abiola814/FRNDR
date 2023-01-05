

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import CustomScreen from "../components/CustomScreen";
  import Logo from "../assets/logo.svg";
  import { hp, Styles, wp } from "../theme";
  import BigButton from "../components/BigButton";
  import { useState } from "react";
  import One from "../assets/One.svg";
  import Two from "../assets/Two.svg";
  import Three from "../assets/Three.svg";
  import Four from "../assets/Four.svg";
  import Five from "../assets/Five.svg";
  import Tag from "../components/Tag";
  import { updateDoc,doc, } from "firebase/firestore";
import registerData from "../recoil/registerData";
import { useRecoilState } from "recoil";
import { createUser,db } from "../firebaseconfig";
import { getcurentuser } from "../firebaseconfig";
import useStore from "./store/store";

  
  const Interest = ({ navigation }) => {
    const userdetails = useStore((state) => state.userdetails);
    const dummyInterestData = [
      {
        id: 1,
        label: "Nature",
        render: (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={1}
            onPress={() => pickInterest(1, "Nature")}
          >
            <One width={wp("24%")} />
          </TouchableOpacity>
        ),
      },
      {
        id: 2,
        label: "Writing",
        render: (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={2}
            onPress={() => pickInterest(2, "Writing")}
          >
            <Three width={wp("23%")} />
          </TouchableOpacity>
        ),
      },
      {
        id: 3,
        label: "Photography",
        render: (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={3}
            onPress={() => pickInterest(3, "Photography")}
          >
            <Two width={wp("34%")} />
          </TouchableOpacity>
        ),
      },
      {
        id: 4,
        label: "Language",
        render: (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={4}
            onPress={() => pickInterest(4, "Language")}
          >
            <Four width={wp("29%")} />
          </TouchableOpacity>
        ),
      },
      {
        id: 5,
        label: "Football",
        render: (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={5}
            onPress={() => pickInterest(5, "Football")}
          >
            <Five width={wp("25%")} />
          </TouchableOpacity>
        ),
      },
      {
        id: 6,
        label: "Nature",
        render: (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={6}
            onPress={() => pickInterest(6, "Nature")}
          >
            <One width={wp("24%")} />
          </TouchableOpacity>
        ),
      },
      {
        id: 7,
        label: "Writing",
        render: (
          <TouchableOpacity
            style={{ marginTop: 5 }}
            key={7}
            onPress={() => pickInterest(7, "Writing")}
          >
            <Three width={wp("23%")} />
          </TouchableOpacity>
        ),
      },
    ];
  
    const [interestArray, setInterestArray] = useState([]); // this is the variable containing the choosen interest
  
    const pickInterest = (id, label) => {
      let temp = interestArray;
      var data = interestArray.find(function (ele) {
        return ele.id === id;
      });
      if (data) {
        temp.filter((i) => i.id !== id);
        setInterestArray(temp);
      } else {
        setInterestArray((oldArray) => [...oldArray, { id, label }]);
      }
    };
  
    // remove interest
    const removeInterest = (id) => {
      console.log(id);
      let temp = interestArray.filter((i) => i.id !== id);
      setInterestArray(temp);
    };
    async function submitInterest() {
        console.log("saving data")
        if( interestArray.length >= 6){
          alert("maximum of 5 selection can be made")
        }
        else{
        await updateDoc(doc(db,"users",userdetails.user.uid),{
          favourite1:interestArray[0] ? interestArray[0].label :  '',
          favourite2:interestArray[1] ? interestArray[1].label :  '',
          favourite3:interestArray[2] ? interestArray[2].label :  '',
          favourite4:interestArray[3] ? interestArray[3].label :  '',
          favourite5:interestArray[4] ? interestArray[4].label :  ''
        }) .then(() => {
          console.log('worked')
          navigation.navigate("questions")
        }).catch((error) => {
    console.log(error)
        })
        }
      }
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
        <View style={{ height: 40,width: 600 }}>
          <ScrollView horizontal>
            {interestArray.map((intrst, index) => (
              <Tag
                key={index}
                label={intrst.label}
                id={intrst.id}
                removeInterest={() => removeInterest(intrst.id)}
              />
            ))}
          </ScrollView>
        </View>
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
          {dummyInterestData.map((singleInterest) => singleInterest.render)}
        </View>
        <BigButton
          text={"Next"}
          type="normal"
          onClick={submitInterest}
        />
      </CustomScreen>
    );
  };
  
  export default Interest;
  
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