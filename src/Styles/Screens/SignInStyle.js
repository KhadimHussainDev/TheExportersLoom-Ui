import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const createSignInStyles = (width, height) =>
  StyleSheet.create({
    scrollContent: {
      alignItems: "center",
      justifyContent: "center",
      padding: width * 0.05,
    },
    logo: {
      width: width * 0.8,
      height: height * 0.3,
      marginBottom: height * 0.05,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: width * 0.005,
      borderColor: colors.border,
      borderRadius: width * 0.025,
      marginBottom: height * 0.03,
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
      marginBottom: height * 0.05,
    },
    buttonText: {
      color: colors.background,
      fontSize: width * 0.07,
    },
    forgotPassword: {
      marginTop: height * 0.025,
      color: colors.forgotPasswordText,
      textDecorationLine: "underline",
    },
    signInText: {
      marginTop: height * 0.01,
      color: colors.Text,
    },
    signInLink: {
      color: colors.LoginLink,
      textDecorationLine: "underline",
      fontWeight: "400",
      fontSize: width * 0.045,
    },
  });

export default createSignInStyles;
