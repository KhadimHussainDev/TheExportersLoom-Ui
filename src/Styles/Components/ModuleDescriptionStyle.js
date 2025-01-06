// styles/components/ModuleDescriptionStyle.js
import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

const ModuleDescriptionStyle = (width, height) =>
  StyleSheet.create({
    moduleContainer: {
      padding: height * 0.03,
      backgroundColor: colors.AdditonalDetailstextbox,
      borderRadius: height * 0.012,
    },
    moduleTitle: {
      fontSize: height * 0.02,
      fontWeight: "bold",
      marginBottom: height * 0.025,
      color: colors.primary,
    },
    moduleContent: {
      borderWidth: 1,
      borderColor: colors.border,
      padding: height * 0.02,
      borderRadius: height * 0.012,
      backgroundColor: colors.background,
    },
    moduleHeading: {
      fontSize: height * 0.02,
      fontWeight: "bold",
      marginBottom: height * 0.012,
      color: colors.Text,
    },
    moduleSubHeading: {
      fontSize: height * 0.015,
      fontWeight: "bold",
      marginLeft: width * 0.08,
      color: colors.Text,
    },
    moduleDetails: {
      marginTop: height * 0.025,
      fontSize: height * 0.015,
      color: colors.Text,
    },
  });

export default ModuleDescriptionStyle;
