import { StyleSheet } from "react-native";
import { colors } from "../../Themes/colors";

const MockupScreenStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: width * 0.05,
    },
    labelprojectdetail: {
      alignSelf: "flex-start",
      fontSize: height * 0.03,
      marginBottom: height * 0.03,
      color: colors.primary,
      fontWeight: "bold",
    },
    labeladdtionaldetail: {
      alignSelf: "flex-start",
      fontSize: height * 0.02,
      marginBottom: height * 0.02,
      color: colors.primary,
      fontWeight: "bold",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 6,
      paddingHorizontal: width * 0.03,
      marginBottom: height * 0.05,
    },
    icon: {
      marginRight: width * 0.02,
    },
    input: {
      flex: 1,
      height: height * 0.06,
      color: "#000",
    },
    inputMultiline: {
      width: "100%",
      height: height * 0.23,
      borderColor: "#000",
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.01,
      marginBottom: height * 0.08,
      textAlignVertical: "top",
      backgroundColor: colors.AdditonalDetailstextbox,
    },
    button: {
      width: width * 0.6,
      height: height * 0.07,
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: colors.border,
      backgroundColor: colors.secondary,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    buttonText: {
      color: colors.Text,
      fontSize: height * 0.015,
      fontWeight: "bold",
    },
  });

export default MockupScreenStyles;
