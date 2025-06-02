import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import BottomTabs from "../../components/common/CustomBottomTab";
import CustomHeader from "../../components/common/CustomHeader";
import CustomBottomTabManufacturer from "../../components/common/CustomBottomTabManufacturer";
import CustomHeaderManufacturer from "../../components/common/CustomHeaderManufacturer";
import ManufacturerRegistration from "../../Screens/manufacturer/MachineRegisteration";
import ManufacturerMachines from "../../Screens/manufacturer/ManufacturerMachines";
import EditMachine from "../../Screens/manufacturer/EditMachine";
import NotificationsScreen from "../../Screens/manufacturer/NotificationsScreen";
import ProfileScreen from "../../Screens/Common/ProfileScreen";

const Stack = createStackNavigator();

const ManufacturerDashboardSatck = ({ navigation }) => {
  // Track if back button was pressed once
  const backPressedOnce = useRef(false);

  useEffect(() => {
    // Handle back button press on the dashboard
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // If we're on the main dashboard screen
        if (navigation.isFocused()) {
          if (backPressedOnce.current) {
            // If back was already pressed once, exit the app
            BackHandler.exitApp();
            return true;
          } else {
            // First back press - show toast and set flag
            backPressedOnce.current = true;
            ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);

            // Reset the flag after 2 seconds
            setTimeout(() => {
              backPressedOnce.current = false;
            }, 2000);

            return true; // Prevent default behavior
          }
        }
        return false; // Let default behavior happen for other screens
      }
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Analytics"
        component={CustomBottomTabManufacturer}
        options={{
          header: () => (
            <CustomHeaderManufacturer
              navigation={navigation}
              title="Dashboard"
              leftIconName="bars"
              rightIconName="user"
              onLefttIconPress={() => navigation.toggleDrawer()}
              onRightIconPress={() => navigation.navigate("ProfileScreen")}
            />
          ),
        }}
      />
      
      {/* Profile Screen */}
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          header: () => (
            <CustomHeaderManufacturer
              navigation={navigation}
              title="My Profile"
              leftIconName="arrow-left"
              onLefttIconPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      
      {/* Notifications Screen */}
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          header: () => (
            <CustomHeaderManufacturer
              navigation={navigation}
              title="Notifications"
              leftIconName="arrow-left"
              onLefttIconPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      
      {/* Machine Registration and Management Screens */}
      <Stack.Screen
        name="ManufacturerRegistration"
        component={ManufacturerRegistration}
        options={{
          header: () => (
            <CustomHeaderManufacturer
              navigation={navigation}
              title="Register Machine"
              leftIconName="arrow-left"
              rightIconName="question-circle"
              onLefttIconPress={() => navigation.goBack()}
              onRightIconPress={() => {
                // Show help information about machine registration
                alert("Register your machines to offer services to exporters.");
              }}
            />
          ),
        }}
      />
      
      <Stack.Screen
        name="ManufacturerMachines"
        component={ManufacturerMachines}
        options={{
          header: () => (
            <CustomHeaderManufacturer
              navigation={navigation}
              title="My Machines"
              leftIconName="arrow-left"
              rightIconName="plus"
              onLefttIconPress={() => navigation.goBack()}
              onRightIconPress={() => navigation.navigate("ManufacturerRegistration")}
            />
          ),
        }}
      />
      
      <Stack.Screen
        name="EditMachine"
        component={EditMachine}
        options={{
          header: () => (
            <CustomHeaderManufacturer
              navigation={navigation}
              title="Edit Machine"
              leftIconName="arrow-left"
              onLefttIconPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ManufacturerDashboardSatck;
