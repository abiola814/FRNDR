import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Interest from "../screens/Interest";
import Login from "../screens/Login";
import Questions from "../screens/Questions";
import Register from "../screens/Register";
import VerifyNumber from "../screens/VerifyNumber";
import Welcome from "../screens/Welcome";
import Forgetpassword from "../screens/Forgotpassword";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="verify" component={VerifyNumber} />
      <Stack.Screen name="interest" component={Interest} />
      <Stack.Screen name="questions" component={Questions} />
      <Stack.Screen name="forgot" component={Forgetpassword} />

    </Stack.Navigator>
  );
}

export default AuthStack;
