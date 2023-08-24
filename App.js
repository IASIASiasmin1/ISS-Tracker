import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import Homescreen from "./screens/homescreen";
import Locationscreen from "./screens/locationscreen";
import Meteorscreen from "./screens/meteorscreen";
import Updatescreen from "./screens/updatescreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Homescreen}></Stack.Screen>
        <Stack.Screen name="Location" component={Locationscreen}></Stack.Screen>
        <Stack.Screen name="Meteors" component={Meteorscreen}></Stack.Screen>
        <Stack.Screen name="Updates" component={Updatescreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
