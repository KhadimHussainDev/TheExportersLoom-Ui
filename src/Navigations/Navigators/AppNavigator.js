import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthProvider } from "../../context/providers/AuthContext";
import AuthLoadingScreen from "../../Screens/auth/AuthLoadingScreen";
import ForgetPassword from "../../Screens/auth/ForgetPassword";
import SignInScreen from "../../Screens/auth/SignInScreen";
import SignUpScreen from "../../Screens/auth/SignUpScreen";
import Analytics from "../../Screens/Common/Analytics";
import NeedHelpScreen from "../../Screens/Common/NeedHelpScreen";
import ProfileScreen from "../../Screens/Common/ProfileScreen";
import CostEstimationBreakdown from "../../Screens/exporter/CostEstimationBreakdown";
import ManufacturerSelection from "../../Screens/exporter/ManufacturerSelection";
import MockupDetailsGathering from "../../Screens/exporter/MockupDetailsGathering";
import ModuleCardsList from "../../Screens/exporter/ModuleCardsList";
import OverviewScreen from "../../Screens/exporter/OverviewScreen";
import SearchManufacturerList from "../../Screens/exporter/SearchManufacturerList";
import ExporterDashboardStack from "./ExporterDashboardStack";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AuthLoadingScreen">
      <Stack.Screen
        name="AuthLoadingScreen"
        component={AuthLoadingScreen}
        options={{ headerShown: false }}
      />
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: true, title: "Forgot Password" }}
      />
      <Stack.Screen
        name="SearchManufacturerList"
        component={SearchManufacturerList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleCardsList"
        component={ModuleCardsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MockupDetailsGathering"
        component={MockupDetailsGathering}
        options={{ headerShown: true, title: "Mockup Details" }}
      />
      <Stack.Screen
        name="CostEstimationBreakdown"
        component={CostEstimationBreakdown}
        options={{ headerShown: true, title: "Cost Estimation" }}
      />
      <Stack.Screen
        name="ManufacturerSelection"
        component={ManufacturerSelection}
        options={{ headerShown: true, title: "Manufacturer Selection" }}
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
          <Drawer.Screen
            name="OverviewScreen"
            component={OverviewScreen}
            options={{ headerShown: true, title: "Overview" }}
          />
          <Drawer.Screen
            name="NeedHelpScreen"
            component={NeedHelpScreen}
            options={{ headerShown: true, title: "Register Your Complain" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
