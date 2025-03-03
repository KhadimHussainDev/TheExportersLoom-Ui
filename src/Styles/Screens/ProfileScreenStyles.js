import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

export const createProfileScreenStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: width * 0.05,
      backgroundColor: colors.background,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: height * 0.025,
    },
    editIcon: {
      position: "absolute",
      top: height * 0.01,
      right: width * 0.025,
    },
    statsSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: width * 0.05,
    },
    statsText: {
      fontSize: width * 0.04,
      textAlign: "center",
    },
    verifications: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: height * 0.02,
      backgroundColor: colors.primary,
    },
    reviewText: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      marginBottom: height * 0.015,
    },
  });
