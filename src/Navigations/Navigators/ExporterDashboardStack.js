import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExporterDashboard from "../../Screens/exporter/ExporterDashboard";
import CustomHeader from "../../components/common/CustomHeader";
import BottomTabs from "../../components/common/CustomBottomTab";

const Stack = createStackNavigator();

const ExporterDashboardStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ExporterDashboard"
      component={BottomTabs}
      options={{
        header: () => (
          <CustomHeader
            navigation={navigation}
            title="Dashboard"
            leftIconName="bars"
            rightIconName="user-circle"
            onLefttIconPress={() => navigation.toggleDrawer()}
            onRightIconPress={() => alert("Profile Icon Clicked")}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default ExporterDashboardStack;
