import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
