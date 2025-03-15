import { StyleSheet } from "react-native";
import { colors } from "../Themes/colors";

export const createProfileInfoStyles = (width, height) =>
  StyleSheet.create({
    infoSection: {
      flex: 1,
      marginLeft: 15,
    },
    name: {
      fontSize: width * 0.055,
      fontWeight: "bold",
      color: colors.text || "#333",
      marginBottom: 5,
    },
    infoText: {
      fontSize: width * 0.035,
      color: colors.text || "#555",
      marginBottom: 3,
    },
    email: {
      fontSize: width * 0.035,
      color: colors.text || "#555",
      marginBottom: 3,
    },
    phone: {
      fontSize: width * 0.035,
      color: colors.text || "#555",
      marginBottom: 3,
    },
    address: {
      fontSize: width * 0.035,
      color: colors.text || "#333",
      marginVertical: height * 0.005,
    },
    emptyField: {
      fontSize: width * 0.035,
      color: colors.placeholderText || "#999",
      fontStyle: "italic",
      marginBottom: 3,
    },
    placeholderContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      backgroundColor: colors.lightBackground || "#f5f5f5",
      borderRadius: 5,
      padding: 5,
    },
    placeholderIcon: {
      marginRight: 5,
    },
    placeholderText: {
      fontSize: width * 0.035,
      color: colors.placeholderText || "#999",
      fontStyle: "italic",
    },
  });
