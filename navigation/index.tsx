import * as React from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Recipe from "../screens/Recipe";
import Loading from "../screens/Loading";
import Forgetpsw from "../screens/Forgetpsw";
import ViewRecipe from "../screens/ViewRecipe";
import LinkingConfiguration from "./LinkingConfiguration";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        <Stack.Screen name="AddRecipe" component={Recipe} options={{ headerShown: false }} />
        <Stack.Screen name="ViewRecipe" component={ViewRecipe} options={{ headerShown: false }} />
        <Stack.Screen name="Forgetpsw" component={Forgetpsw} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
