import React from "react";
import ExporterDashboard from "../../Screens/exporter/ExporterDashboard";
import { View, Text, TextInput, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { FloatingAction } from "react-native-floating-action";
import BottomTabsStyles from "../../Styles/Components/CutsomBottomTabStyles";
import MockupScreen from "../../Screens/exporter/MockupScreen";
import { colors } from "../../Styles/Themes/colors";
import getWindowDimensions from "../../utils/helpers/dimensions";
const Tab = createBottomTabNavigator();
const { width, height } = getWindowDimensions();
const styles = BottomTabsStyles(width, height);

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Home Screen</Text>
    <TextInput style={styles.input} placeholder="Type here..." />
  </View>
);
const ChatsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Chats Screen</Text>
  </View>
);
const AnalyticsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Analytics Screen</Text>
  </View>
);
const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Settings Screen</Text>
  </View>
);
const AddButton = (props) => (
  <FloatingAction
    color="#013240"
    floatingIcon={<Icon name="plus" size={20} color="#fff" />}
    showBackground={false}
    onPressMain={() => alert("Add Button Pressed")}
  />
);

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // Hide the header
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Chats") {
          iconName = "comments";
        } else if (route.name === "Settings") {
          iconName = "cogs";
        } else if (route.name === "line-chart") {
          iconName = "line-chart";
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.placeholder,
      tabBarStyle: styles.tabBarStyle,
      tabBarLabelStyle: styles.tabBarLabelStyle,
      tabBarIconStyle: styles.tabBarIconStyle,
      tabBarItemStyle: styles.tabBarItemStyle,
    })}
  >
    <Tab.Screen name="Home" component={MockupScreen} />
    <Tab.Screen name="Chats" component={ChatsScreen} />
    <Tab.Screen
      name="Add"
      component={AddButton}
      options={{
        tabBarButton: () => (
          <View style={styles.addButtonContainer}>
            <AddButton />
          </View>
        ),
      }}
    />
    <Tab.Screen name="Settings" component={SettingsScreen} />
    <Tab.Screen name="line-chart" component={AnalyticsScreen} />
  </Tab.Navigator>
);

export default BottomTabs;
