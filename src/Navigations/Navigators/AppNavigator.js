import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthProvider } from "../../context/providers/AuthContext";
import SignInScreen from "../../Screens/auth/SignInScreen";
import SignUpScreen from "../../Screens/auth/SignUpScreen";
import ForgetPassword from "../../Screens/auth/ForgetPassword";
import ExporterDashboardStack from "./ExporterDashboardStack";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="ExporterDashboardStack">
          <Drawer.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
          <Drawer.Screen
            name="ExporterDashboardStack"
            component={ExporterDashboardStack}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
