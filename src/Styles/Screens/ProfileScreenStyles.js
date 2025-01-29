import { StyleSheet } from "react-native";

export const createProfileScreenStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: width * 0.05,
      backgroundColor: "#f7f7f7",
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
      //marginTop: height * 0.02,
      paddingHorizontal: width * 0.05,
    },
    statsText: {
      fontSize: width * 0.04, // Adjust this value for desired size
      // fontWeight: "bold", // Optional for emphasis
      textAlign: "center",
    },
    verifications: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: height * 0.02,
      backgroundColor: "#013240",
    },
    ReviewText: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      marginBottom: height * 0.015,
    },
  });
