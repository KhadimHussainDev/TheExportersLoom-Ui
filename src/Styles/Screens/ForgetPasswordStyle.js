import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const getForgetPasswordStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: width * 0.05,
    },
    title: {
      fontSize: width * 0.08,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: height * 0.03,
    },
    label: {
      fontSize: width * 0.045,
      color: colors.Text,
      marginBottom: height * 0.02,
      textAlign: "center",
    },
    optionButton: {
      width: width * 0.8,
      paddingVertical: height * 0.015,
      backgroundColor: colors.primary,
      borderRadius: width * 0.02,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: height * 0.01,
    },
    optionText: {
      color: colors.background,
      fontSize: width * 0.045,
      fontWeight: "bold",
    },
    input: {
      width: width * 0.85,
      height: height * 0.06,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: width * 0.02,
      paddingHorizontal: width * 0.04,
      fontSize: width * 0.045,
      backgroundColor: colors.whiteborder,
      marginBottom: height * 0.02,
    },
    button: {
      width: width * 0.85,
      paddingVertical: height * 0.018,
      backgroundColor: colors.secondary,
      borderRadius: width * 0.02,
      alignItems: "center",
      justifyContent: "center",
      marginTop: height * 0.02,
    },
    buttonText: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      color: colors.primary,
    },
    errorText: {
      color: 'red',
      fontSize: width * 0.04,
      marginBottom: height * 0.02,
      textAlign: 'center',
    },
    linkButton: {
      marginTop: height * 0.03,
      padding: width * 0.02,
    },
    linkText: {
      color: colors.primary,
      fontSize: width * 0.04,
      textDecorationLine: 'underline',
    },
  });

export default getForgetPasswordStyles;
