import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const createSignUpStyles = (width, height) =>
  StyleSheet.create({
    scrollContent: {
      alignItems: "center",
      justifyContent: "center",
      padding: width * 0.3,
    },
    logo: {
      width: width * 0.7,
      height: height * 0.2,
      marginBottom: height * 0.01,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: width * 0.005,
      borderColor: colors.border,
      borderRadius: width * 0.025,
      marginBottom: height * 0.02,
      width: width * 0.8,
      paddingHorizontal: width * 0.025,
    },
    input: {
      height: height * 0.06,
      flex: 1,
      fontSize: width * 0.035,
      marginLeft: width * 0.025,
    },
    button: {
      backgroundColor: colors.primary,
      padding: height * 0.01,
      borderRadius: width * 0.05,
      alignItems: "center",
      width: width * 0.8,
    },
    buttonText: {
      color: colors.background,
      fontSize: width * 0.07,
    },
    ortext: {
      marginTop: height * 0.01,
      color: colors.forgotPasswordText,
      marginBottom: height * 0.01,
      fontWeight: "500",
      color: colors.Text,
    },

    signUpText: {
      position: "absolute",
      top: height * 0.11,
      left: width * 0.3,
      color: colors.Text,
      marginBottom: height * 0.02,
    },
    signUpLink: {
      color: colors.LoginLink,
      textDecorationLine: "underline",
      fontWeight: "500",
      fontSize: width * 0.035,
    },
    GoogleButton: {
      flexDirection: "row",
      padding: height * 0.01,
      borderRadius: width * 0.05,
      alignItems: "center",
      width: width * 0.8,
      borderWidth: width * 0.005,
      borderColor: colors.GoogleButtonBorder,
      paddingHorizontal: width * 0.04,
    },
    GoogleButtonText: {
      color: colors.primary,
      fontSize: width * 0.06,
      marginLeft: width * 0.035,
    },
    Googlelogo: {
      width: width * 0.07,
      height: height * 0.035,
    },
  });

export default createSignUpStyles;
