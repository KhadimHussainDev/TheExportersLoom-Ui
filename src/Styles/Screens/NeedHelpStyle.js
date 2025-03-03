import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../Themes/colors";

const NeedHelpScreenStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: width * 0.05,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: width * 0.07,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: height * 0.02,
      color: colors.primary,
    },
    contactText: {
      fontSize: width * 0.045,
      marginBottom: height * 0.01,
      color: colors.Text,
    },
    label: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      marginTop: height * 0.015,
      color: colors.primary,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      padding: width * 0.04,
      borderRadius: width * 0.02,
      marginTop: height * 0.005,
      backgroundColor: colors.whiteborder,
    },
    textArea: {
      borderWidth: 1,
      borderColor: colors.border,
      padding: width * 0.04,
      borderRadius: width * 0.02,
      marginTop: height * 0.005,
      backgroundColor: colors.whiteborder,
      minHeight: height * 0.15,
      textAlignVertical: "top",
    },
    button: {
      backgroundColor: colors.primary,
      padding: width * 0.04,
      borderRadius: width * 0.02,
      alignItems: "center",
      marginTop: height * 0.02,
    },
    buttonText: {
      color: colors.whiteborder,
      fontSize: width * 0.045,
      fontWeight: "bold",
    },
    faqTitle: {
      fontSize: width * 0.06,
      fontWeight: "bold",
      marginTop: height * 0.03,
      marginBottom: height * 0.01,
      color: colors.primary,
    },
    faqContainer: {
      backgroundColor: colors.whiteborder,
      padding: width * 0.04,
      borderRadius: width * 0.02,
      borderWidth: 1,
      borderColor: colors.border,
    },
    faqQuestion: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      marginTop: height * 0.01,
      color: colors.primary,
    },
    faqAnswer: {
      fontSize: width * 0.04,
      color: colors.Text,
      marginBottom: height * 0.01,
    },
  });

export default NeedHelpScreenStyles;
