import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
            onRightIconPress={() => navigation.navigate("ProfileScreen")}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default ExporterDashboardStack;
