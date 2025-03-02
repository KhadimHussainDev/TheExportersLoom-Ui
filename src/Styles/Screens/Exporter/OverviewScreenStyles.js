import { StyleSheet } from "react-native";
import { colors } from "../../Themes/colors.js";

const OverviewScreenStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: width * 0.05,
    },
    heading: {
      fontSize: width * 0.06,
      fontWeight: "bold",
      color: colors.Text,
      textAlign: "center",
      marginBottom: height * 0.01,
    },
    subHeading: {
      fontSize: width * 0.04,
      color: colors.primary,
      textAlign: "center",
      marginBottom: height * 0.01,
    },
    section: {
      backgroundColor: colors.whiteborder,
      padding: width * 0.04,
      marginVertical: height * 0.01,
      borderRadius: width * 0.03,
      shadowColor: colors.Text,
      shadowOpacity: 0.1,
      shadowRadius: width * 0.02,
      shadowOffset: { width: 0, height: height * 0.005 },
      elevation: 3,
    },
    title: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: height * 0.005,
    },
    bullet: {
      color: colors.warning,
      fontSize: width * 0.05,
    },
    description: {
      fontSize: width * 0.035,
      color: colors.Text,
    },
    listItem: {
      fontSize: width * 0.035,
      color: colors.Text,
      marginLeft: width * 0.03,
      marginVertical: height * 0.005,
    },
    footer: {
      fontSize: width * 0.04,
      fontWeight: "bold",
      color: colors.primary,
      textAlign: "center",
      marginTop: height * 0.03,
      marginBottom: height * 0.05,
    },
  });

export default OverviewScreenStyles;
