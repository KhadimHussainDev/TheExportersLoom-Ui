import { StyleSheet } from "react-native";

export const createProfileInfoStyles = (width, height) =>
  StyleSheet.create({
    infoSection: {
      flex: 1,
    },
    name: {
      fontSize: width * 0.055,
      fontWeight: "bold",
    },
    email: {
      fontSize: width * 0.03,
      color: "#555",
    },
    phone: {
      fontSize: width * 0.03,
      color: "#555",
    },
    address: {
      fontSize: width * 0.055,
      color: "#333",
      marginVertical: height * 0.005,
    },
  });
