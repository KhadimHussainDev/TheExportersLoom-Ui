import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors"; // Adjust the path as necessary

const BottomTabsStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background, // Updated background color
    },
    text: {
      fontSize: height * 0.025, // Adjusting based on height
      fontWeight: "bold",
      color: colors.Text, // Updated text color
    },
    addButtonContainer: {
      position: "absolute",
      bottom: height * 0.03, // Adjusting based on height
      left: width * 0.27, // Adjusting based on width
      zIndex: 1,
    },
    input: {
      height: height * 0.05, // Adjusting based on height
      borderColor: colors.Text, // Updated border color
      borderWidth: 1,
      paddingHorizontal: width * 0.03, // Adjusting based on width
      marginBottom: height * 0.02, // Adjusting based on height
      width: width * 0.8, // Adjusting based on width
    },
    tabBarStyle: {
      height: height * 0.1, // Adjusting based on height
      backgroundColor: colors.background, // Updated background color
    },
    tabBarLabelStyle: {
      fontSize: height * 0.015, // Adjusting based on height
      marginBottom: height * 0.01, // Adjusting based on height
      color: colors.Text, // Updated text color
    },
    tabBarIconStyle: {
      marginTop: height * 0.01, // Adjusting based on height
    },
    tabBarItemStyle: {
      marginVertical: height * 0.01, // Adjusting based on height
    },
  });

export default BottomTabsStyles;
