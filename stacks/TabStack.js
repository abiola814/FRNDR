import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import { COLORS } from "../theme";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import Star from "../screens/Star";
import Chat from "../screens/Chat";
import Favourites from "../screens/Favourites";
import Profile from "../screens/Profile";
import ProfileStack from "./ProfileStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.green2,
        tabBarInactiveTintColor: "#aaa",

        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          paddingTop: 5,
          height: 50,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "Discover",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="cards"
                size={24}
                color={COLORS.primary}
              />
            ) : (
              <MaterialCommunityIcons name="cards" size={24} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="favourites"
        component={Favourites}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="heart" size={24} color={COLORS.primary} />
            ) : (
              <FontAwesome name="heart" size={24} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="star"
        component={Star}
        options={{
          tabBarLabel: "Learn",
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="star" size={24} color={COLORS.primary} />
            ) : (
              <FontAwesome name="star" size={24} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarLabel: "Learn",
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="chat" size={24} color={COLORS.primary} />
            ) : (
              <Entypo name="chat" size={24} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Learn",
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={24} color={COLORS.primary} />
            ) : (
              <FontAwesome name="user" size={24} color="gray" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  activeImg: {
    width: 31,
    marginBottom: 2,
    marginTop: 5,
    // height: 27,
  },
  deActiveImg: {
    width: 31,
    marginBottom: 2,
    marginTop: 5,
    // height: 27,
  },
});
