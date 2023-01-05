// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import Icon from "./Icon";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Card = ({ item, removeCard, swipedDirection, navigation, image }) => {
  // let xPosition = new Animated.Value(0);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  let swipeDirection = "";
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = "Right";
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = "Left";
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 150 &&
        gestureState.dx > -SCREEN_WIDTH + 150
      ) {
        swipedDirection("--");
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
    },
  });
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          //   backgroundColor: item.backgroundColor,
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
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

        <Image
          resizeMode="cover"
          source={item.image}
          style={{ height: "100%", width: "100%", borderRadius: 20 }}
        />
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
          />
          <Icon
            size={71}
            color="#FFFFFF"
            icon={<AntDesign name="heart" size={31} color="#DD88CF" />}
            // onClick={() => navigation.navigate("info")}
            // onPress={() => console.log("pressed")}
          />
          <Icon
            size={51}
            color="#FFFFFF5E"
            icon={<AntDesign name="star" size={20} color="white" />}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  cardStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 20,
    zIndex: 2000,
  },
  cardTitleStyle: {
    color: "#fff",
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: "center",
  },
});
