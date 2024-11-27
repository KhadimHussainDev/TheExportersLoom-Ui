import { StyleSheet } from "react-native";

const BottomTabsStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    },
    text: {
      fontSize: height * 0.025, // Adjusting based on height
      fontWeight: "bold",
    },
    addButtonContainer: {
      position: "absolute",
      bottom: height * 0.03,
      left: width * 0.27,
      zIndex: 1,
    },
    input: {
      height: height * 0.05, // Adjusting based on height
      borderColor: "#000",
      borderWidth: 1,
      paddingHorizontal: width * 0.03, // Adjusting based on width
      marginBottom: height * 0.02, // Adjusting based on height
      width: width * 0.8, // Adjusting based on width
    },
    tabBarStyle: {
      height: height * 0.1, // Adjusting based on height
    },
    tabBarLabelStyle: {
      fontSize: height * 0.015, // Adjusting based on height
      marginBottom: height * 0.01, // Adjusting based on height
    },
    tabBarIconStyle: {
      marginTop: height * 0.01, // Adjusting based on height
    },
    tabBarItemStyle: {
      marginVertical: height * 0.01, // Adjusting based on height
    },
  });

export default BottomTabsStyles;
