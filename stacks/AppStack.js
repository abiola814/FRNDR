import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/ChatScreen";
import Home from "../screens/Home";
import Info from "../screens/Info";
import Interest from "../screens/Interest";
import Login from "../screens/Login";
import ProfileSettings from "../screens/ProfileSettings";
import Questions from "../screens/Questions";
import Register from "../screens/Register";
import Settings from "../screens/Settings";
import VerifyNumber from "../screens/VerifyNumber";
import Welcome from "../screens/Welcome";
import TabStack from "./TabStack";
import FavInfo from "../screens/Favouriteinfo";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="homestack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="homestack" component={TabStack} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="info" component={Info} />
      <Stack.Screen name="chatscreen" component={ChatScreen} />
      <Stack.Screen name="profile_settings" component={ProfileSettings} />
      <Stack.Screen name="favouriteinfo" component={FavInfo} />
    </Stack.Navigator>
  );
}

export default AppStack;
