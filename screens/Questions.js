import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import CustomScreen from "../components/CustomScreen";
import Logo from "../assets/logo.svg";
import { hp, Styles, wp } from "../theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BigButton from "../components/BigButton";
import { useRecoilState } from "recoil";
import userData from "../recoil/userData";
import { DropDown } from "./ProfileSettings";
import { useState } from "react";
import { updateDoc,doc, } from "firebase/firestore";
import registerData from "../recoil/registerData";
import { createUser,db,getcurentuser } from "../firebaseconfig";
import useStore from "./store/store";

const Questions = ({ navigation }) => {

  const Questionsdata4=["A fairytale castle","My hometown","A nice suburb","A yurt in Nepal"]
const Questionsdata2=["That's what I live for",
"As long as we're both happy with it",
"As long as we can still have our own time",
"kids can come skydiving if you strap them on safely"]
const Questionsdata3=["A meal and the opera",
"A stroll and a movie",
"A movie and a meal",
"One which doesn't end for a week"]
const Questionsdata1=["Not acceptable, it spoils the magic",
"Not at all, it shows passion",
"Not much, we all have our ups and downs",
"Not at all, you have to expect them"]
  // const [user_data, setUser] = useRecoilState(userData);
  const setUser = useStore(state => state.setUser);
  const userdetails = useStore((state) => state.userdetails);
  const [answer1,setAnswer1] = useState('')
  const [answer2,setAnswer2] = useState('')
  const [answer3,setAnswer3] = useState('')
  const [answer4,setAnswer4] = useState('')

  async function submitQuestion() {
    console.log("saving data");
    //const currentuser = getcurentuser()
    await updateDoc(doc(db,"users",userdetails.user.uid),{
      question1:answer1,
      question2:answer2,
      question3:answer3,
      question3:answer4
    }) .then(() => {
      console.log('worked')
      setUser(true)
    
    }).catch((error) => {
console.log(error)
    })
  }
  return (
    <CustomScreen>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Logo width={76} height={76} />
          </View>
          <Text style={[Styles.HeaderText, { marginBottom: 10 }]}>
            Answer to the following question...
          </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>1. How much does it bother you if you have arguments with your partner??</Text>
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
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 15,
          left: 0,
          right: 0,
          width: wp("100%"),
          alignItems: "center",
          paddingHorizontal: 20,
          justifyContent: "center",
          height: 60,
        }}
      >
        <BigButton text="Finish" type="normal" onClick={submitQuestion} />
      </View>
    </CustomScreen>
  );
};

export default Questions;

const styles = StyleSheet.create({
  input: {
    height: hp("6.3%"),
    borderWidth: 1,
    borderColor: "#DBDBDB",
    paddingLeft: 15,
    marginTop: 5,
    borderRadius: 5,
    fontFamily: "Hellix-Regular",
  },
  text: {
    fontFamily: "Hellix-Regular",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#F4F4F4",
    marginTop: 10,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "100%",
  },
});
