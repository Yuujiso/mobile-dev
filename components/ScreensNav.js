import React from "react";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
