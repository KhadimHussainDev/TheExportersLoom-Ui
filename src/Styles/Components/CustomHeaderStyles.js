import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const CustomHeaderStyles = (width, height) =>
  StyleSheet.create({
    headerContainer: {
      paddingTop: height * 0.02,
      backgroundColor: colors.primary,
      height: height * 0.22, // Adjust height relative to screen height to accommodate the additional rows
      paddingHorizontal: width * 0.04,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: height * 0.01, // Margin between rows
    },
    headerIcon: {
      padding: width * 0.025,
    },
    leftrigthicon: {
      color: colors.background,
    },
    headerTitleContainer: {
      flex: 1,
      alignItems: "center",
    },
    headerTitle: {
      color: colors.background,
      fontSize: height * 0.029,
      fontWeight: "bold",
    },
    headerTextInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: colors.background,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      flex: 1,
      height: height * 0.05,
    },
    headerTextInput: {
      flex: 1,
      color: colors.background,
      fontSize: height * 0.016,
    },
    searchIcon: {
      marginLeft: 10,
      color: colors.background,
    },
    tapMessage: {
      color: colors.background, // Change color if needed
      fontSize: height * 0.017,
      fontWeight: "bold",
    },
    headerLabelText: {
      color: colors.background,
      fontSize: height * 0.015,
    },
  });

export default CustomHeaderStyles;
