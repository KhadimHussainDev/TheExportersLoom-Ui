import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "../../context/providers/AuthContext";
import SignInScreen from "../../Screens/auth/SignInScreen";
import SignUpScreen from "../../Screens/auth/SignUpScreen";
import ForgetPassword from "../../Screens/auth/ForgetPassword";
import ExporterDashboardStack from "./ExporterDashboardStack";
import MockupDetailsGathering from "../../Screens/exporter/MockupDetailsGathering";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExporterDashboardStack"
        component={ExporterDashboardStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: true, title: "Forgot Password" }}
      />
      <Stack.Screen
        name="MockupDetailsGathering"
        component={MockupDetailsGathering}
        options={{ headerShown: true, title: "Mockup Details" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="MainStackNavigator">
          <Drawer.Screen
            name="MainStackNavigator"
            component={MainStackNavigator}
            options={{ headerShown: false, title: "Dashboard" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
