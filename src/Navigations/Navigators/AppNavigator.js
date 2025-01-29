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
import CostEstimationBreakdown from "../../Screens/exporter/CostEstimationBreakdown";
import ManufacturerSelection from "../../Screens/exporter/ManufacturerSelection";
import ProfileScreen from "../../Screens/Common/ProfileScreen";
import SearchManufacturerList from "../../Screens/exporter/SearchManufacturerList";
import Analytics from "../../Screens/Common/Analytics";
import ModuleCardsList from "../../Screens/exporter/ModuleCardsList";

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
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: true, title: "Profile Screen" }}
          />
          <Drawer.Screen
            name="SearchManufacturerList"
            component={SearchManufacturerList}
            options={{ headerShown: true, title: "Search Manufacturer" }}
          />
          <Drawer.Screen
            name="Analytics"
            component={Analytics}
            options={{ headerShown: true, title: "Analytics" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
