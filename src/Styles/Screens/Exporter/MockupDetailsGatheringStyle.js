import { StyleSheet } from "react-native";
import { colors } from "../../../Styles/Themes/colors";

const MockupDetailsGatheringStyles = (width, height) =>
  StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    formContainer: {
      width: "100%",
      padding: width * 0.05,
      backgroundColor: colors.background,
      borderRadius: width * 0.02,
      elevation: 3,
    },
    label: {
      marginBottom: height * 0.02,
      fontWeight: "bold",
      fontSize: height * 0.02,
    },
    dropdown: {
      height: height * 0.06,
      marginBottom: height * 0.02,
    },
    input: {
      height: height * 0.06,
      borderColor: colors.border,
      borderWidth: 1,
      marginBottom: height * 0.02,
      paddingHorizontal: width * 0.02,
      borderRadius: width * 0.02,
    },
    sizeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: height * 0.01,
    },
    pickerContainer: {
      width: "100%",
      backgroundColor: colors.background,
      borderRadius: width * 0.02,
      borderColor: colors.border,
      borderWidth: 1,
      marginBottom: height * 0.01,
    },
    picker: {
      height: height * 0.07,
    },
    dropdownRow: {
      marginVertical: height * 0.01,
    },
    label01: {
      fontSize: height * 0.015,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: colors.primary,
      padding: height * 0.015,
      borderRadius: width * 0.02,
      alignItems: "center",
      marginBottom: height * 0.02,
    },
    buttonCalculateCost: {
      backgroundColor: colors.secondary,
      padding: height * 0.015,
      borderRadius: width * 0.04,
      borderColor: colors.border,
      borderWidth: 0.7,
      alignItems: "center",
      marginBottom: height * 0.02,
    },
    buttonTextculateCost: {
      color: colors.Text,
      fontWeight: "bold",
      fontSize: height * 0.02,
    },
    buttonText: {
      color: colors.whiteborder,
      fontWeight: "bold",
      fontSize: height * 0.02,
    },
    switchOnThumbColor: colors.primary,
    switchOFThumbColor: colors.whiteborder,
  });

export default MockupDetailsGatheringStyles;
