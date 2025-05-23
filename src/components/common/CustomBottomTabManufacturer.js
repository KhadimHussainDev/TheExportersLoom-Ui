import React from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { FloatingAction } from "react-native-floating-action";
import BottomTabsStyles from "../../Styles/Components/CutsomBottomTabStyles";
import { colors } from "../../Styles/Themes/colors";
import getWindowDimensions from "../../utils/helpers/dimensions";
import SearchManufacturerList from "../../Screens/exporter/SearchManufacturerList";
import Analytics from "../../Screens/Common/Analytics";
import ManufacturerRegistration from "../../Screens/manufacturer/MachineRegisteration";
import ExporterRequestList from "../../Screens/manufacturer/ExporterRequestList";

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

const SerachScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Search Screen</Text>
  </View>
);

const AddButton = () => {
  const navigation = useNavigation(); // Access the navigation object

  return (
    <FloatingAction
      color="#013240"
      floatingIcon={<Icon name="plus" size={20} color="#fff" />}
      showBackground={false}
      onPressMain={() => navigation.navigate("ManufacturerRegistration")}
    />
  );
};

const CustomBottomTabManufacturer = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // Hide the header
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Chats") {
          iconName = "comments";
        } else if (route.name === "Requests") {
          iconName = "inbox";
        } else if (route.name === "Register") {
          iconName = "industry";
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
    <Tab.Screen name="Home" component={Analytics} />
    <Tab.Screen name="Chats" component={ChatsScreen} />
    <Tab.Screen name="Requests" component={ExporterRequestList} />
    <Tab.Screen name="Register" component={ManufacturerRegistration} />
  </Tab.Navigator>
);

export default CustomBottomTabManufacturer;
