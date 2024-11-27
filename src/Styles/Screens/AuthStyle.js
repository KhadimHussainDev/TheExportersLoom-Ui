import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const createAuthStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    Imagebackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomView: {
      width: "100%",
      backgroundColor: colors.background,
      position: "absolute",
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: width * 0.05, // 5% of screen width
      borderTopRightRadius: width * 0.05, // 5% of screen width
    },
    closeButton: {
      position: "absolute",
      top: height * 0.03, // 3% of screen height
      right: width * 0.05, // 5% of screen width
      backgroundColor: colors.primary,
      borderRadius: width * 0.075, // 7.5% of screen width
      width: width * 0.075, // 7.5% of screen width
      height: width * 0.075, // 7.5% of screen width
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1, // Ensure close button is on top
    },
    bottomText: {
      position: "absolute",
      top: height * 0.025,
      color: colors.primary,
      fontSize: width * 0.1, // 10% of screen width
      marginBottom: height * 0.03, // 3% of screen height
      fontWeight: "700",
      textAlign: "left",
      paddingRight: width * 0.45, // 50% of screen width
      zIndex: 0, // Ensure text is below the close button
    },
    icon: {
      // New icon style
      color: colors.secondary, // Use secondary color
      fontSize: width * 0.05, // Size 5% of screen width
    },
  });

export default createAuthStyles;
