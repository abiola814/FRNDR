import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Info from "../screens/Info";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="info" component={Info} />
    </Stack.Navigator>
  );
}

export default HomeStack;
