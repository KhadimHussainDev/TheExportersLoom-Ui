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
import ChatScreen from "../../Screens/Common/ChatScreen";
import ChatContactsScreen from "../../Screens/Common/ChatContactsScreen";
import NeedHelpScreen from "../../Screens/Common/NeedHelpScreen";
import ProfileScreen from "../../Screens/Common/ProfileScreen";
import UserProfileScreen from "../../Screens/Common/UserProfileScreen";
import CostEstimationBreakdown from "../../Screens/exporter/CostEstimationBreakdown";
import ManufacturerSelection from "../../Screens/exporter/ManufacturerSelection";
import MockupDetailsGathering from "../../Screens/exporter/MockupDetailsGathering";
import ModuleCardsList from "../../Screens/exporter/ModuleCardsList";
import OverviewScreen from "../../Screens/exporter/OverviewScreen";
import SearchManufacturerList from "../../Screens/exporter/SearchManufacturerList";
import SelectedModule from "../../Screens/exporter/SelectedModule";
import MachineRegisteration from "../../Screens/manufacturer/MachineRegisteration";
import NotificationsScreen from "../../Screens/manufacturer/NotificationsScreen";
import ExporterDashboardStack from "./ExporterDashboardStack";
import ManufacturerDashboardSatck from "./ManufacturerDashboardSatck";

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
        name="ManufacturerDashboardSatck"
        component={ManufacturerDashboardSatck}
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
        options={{ headerShown: true, title: "Reset Password" }}
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
      <Stack.Screen
        name="MachineRegisteration"
        component={MachineRegisteration}
        options={{ headerShown: true, title: "Machine Registration" }}
      />
      <Stack.Screen
        name="SelectedModule"
        component={SelectedModule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: true, title: "Chat" }}
      />
      <Stack.Screen
        name="ChatContactsScreen"
        component={ChatContactsScreen}
        options={{ headerShown: true, title: "Messages" }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerShown: true, title: "User Profile" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="MainStackNavigator"
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#ffffff',
              width: 280,
            },
            drawerLabelStyle: {
              fontSize: 16,
            },
            drawerActiveTintColor: '#013240',
          }}
        >
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
            name="NotificationsDrawer"
            component={NotificationsScreen}
            options={{ headerShown: true, title: "Notifications" }}
          />
          <Drawer.Screen
            name="MessagesDrawer"
            component={ChatContactsScreen}
            options={{ headerShown: true, title: "Messages" }}
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
